import { Tables } from "@/types/supabase";

interface IProps {
  type: "date" | "price" | "payment";
  setShop: React.Dispatch<React.SetStateAction<(Tables<"shop"> & { pos: Tables<"pos">[] }) | null>>;
}

interface Ascending {
  ascending: boolean;
}

export default function OfflineSortButtons({ type, setShop }: IProps) {
  const dateSort = ({ ascending }: Ascending) => {
    setShop((prev) => {
      if (prev) {
        return {
          ...prev,
          pos: prev.pos.sort((a, b) =>
            ascending
              ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              : new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
          ),
        };
      }
      return prev;
    });
  };

  const priceSort = ({ ascending }: Ascending) => {
    setShop((prev) => {
      if (prev) {
        return {
          ...prev,
          pos: ascending
            ? prev.pos.sort((a, b) => b.discountedTotalPrice - a.discountedTotalPrice)
            : prev.pos.sort((a, b) => a.discountedTotalPrice - b.discountedTotalPrice),
        };
      }
      return prev;
    });
  };

  const paymentSort = ({ ascending }: Ascending) => {
    setShop((prev) => {
      if (prev) {
        return {
          ...prev,
          pos: prev.pos.filter((payment) => (ascending ? payment.isCancel : !payment.isCancel)),
        };
      }
      return prev;
    });
  };

  switch (type) {
    case "date":
      return (
        <>
          <button
            className="p-1 ml-2 rounded-lg success-button"
            type="button"
            onClick={() => {
              dateSort({ ascending: true });
            }}
          >
            최신
          </button>
          <button
            className="p-1 ml-2 rounded-lg success-button"
            type="button"
            onClick={() => {
              dateSort({ ascending: false });
            }}
          >
            오래된
          </button>
        </>
      );
    case "price":
      return (
        <>
          <button
            className="p-1 ml-2 rounded-lg success-button"
            type="button"
            onClick={() => {
              priceSort({ ascending: true });
            }}
          >
            큰 순
          </button>
          <button
            className="p-1 ml-2 rounded-lg success-button"
            type="button"
            onClick={() => {
              priceSort({ ascending: false });
            }}
          >
            작은 순
          </button>
        </>
      );
    case "payment":
      return (
        <>
          <button
            className="p-1 ml-2 rounded-lg delete-button"
            type="button"
            onClick={() => {
              paymentSort({ ascending: true });
            }}
          >
            취소건
          </button>
          <button
            className="p-1 ml-2 rounded-lg success-button"
            type="button"
            onClick={() => {
              paymentSort({ ascending: false });
            }}
          >
            취소건 제외
          </button>
        </>
      );

    default:
      return <></>;
  }
}
