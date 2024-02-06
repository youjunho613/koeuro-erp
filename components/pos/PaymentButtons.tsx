import { insertPos } from "@/app/api/pos";
import { TablesInsert } from "@/types/supabase";
import { toastMessage } from "@/utils/toast/toastMessage";

interface IProps {
  data: TablesInsert<"pos">;
  resetCartList: () => void;
}

export default function PaymentButtons({ data, resetCartList }: IProps) {
  const payment = (paymentType: "card" | "cash" | "account") => {
    if (data.product.length === 0) {
      toastMessage("결제할 제품이 없습니다.", "error");
      return;
    }

    insertPos({ ...data, paymentType });
    resetCartList();
  };

  return (
    <div className="gap-5 flex-center">
      <p className="text-lg font-semibold min-w-fit">결제</p>
      <button
        className="success-button small-button min-w-fit"
        type="button"
        onClick={() => {
          payment("card");
        }}
      >
        카드 결제
      </button>
      <button
        className="success-button small-button min-w-fit"
        type="button"
        onClick={() => {
          payment("cash");
        }}
      >
        현금 결제
      </button>
      <button
        className="success-button small-button min-w-fit"
        type="button"
        onClick={() => {
          payment("account");
        }}
      >
        이체 결제
      </button>
    </div>
  );
}
