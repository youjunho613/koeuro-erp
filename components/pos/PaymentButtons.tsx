import { insertPos } from "@/app/api/pos";
import { Tables } from "@/types/supabase";
import { toastMessage } from "@/utils/toast/toastMessage";

interface IProps {
  cartList: Tables<"products">[];
  currentShop: Tables<"shop"> | null;
  totalPrice: number;
  discountedTotalPrice: number;
  discountRate: number;
  resetCartList: () => void;
  deleteLastPayment: () => void;
}

export default function PaymentButtons(props: IProps) {
  const { cartList, currentShop, totalPrice, discountedTotalPrice, discountRate, resetCartList, deleteLastPayment } =
    props;

  const payment = (paymentType: "card" | "cash" | "account") => {
    if (cartList.length === 0) {
      toastMessage("결제할 제품이 없습니다.", "error");
      return;
    }
    if (currentShop === null) {
      toastMessage("매장을 선택해주세요.", "error");
      return;
    }
    const product = cartList;
    const shopId = currentShop.id;

    insertPos({ product, totalPrice, discountedTotalPrice, paymentType, shopId, discountRate });
  };

  return (
    <div className="flex-wrap justify-between w-full gap-10 flex-center">
      <div className="gap-5 flex-center">
        <p className="text-lg font-semibold min-w-fit">결제취소</p>
        <button type="button" className="delete-button small-button min-w-fit" onClick={deleteLastPayment}>
          {/* TODO */}
          직전 거래 취소 후 불러오기
        </button>
        <button type="button" className="delete-button small-button min-w-fit" onClick={resetCartList}>
          장바구니 초기화
        </button>
      </div>
      <div className="gap-5 flex-center">
        <p className="text-lg font-semibold min-w-fit">결제완료</p>
        <button
          onClick={() => {
            payment("card");
          }}
          type="button"
          className="success-button small-button min-w-fit"
        >
          카드 결제
        </button>
        <button
          onClick={() => {
            payment("cash");
          }}
          type="button"
          className="success-button small-button min-w-fit"
        >
          현금 결제
        </button>
        <button
          onClick={() => {
            payment("account");
          }}
          type="button"
          className="success-button small-button min-w-fit"
        >
          이체 결제
        </button>
      </div>
    </div>
  );
}
