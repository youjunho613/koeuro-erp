import type { Tables } from "@/types/supabase";

interface IProps {
  shop: Tables<"shop"> & { pos: Tables<"pos">[] };
}

export default function OfflineShopReport({ shop }: IProps) {
  const totalPrice = shop.pos.map((payment) => payment.discountedTotalPrice).reduce((acc, cur) => acc + cur, 0);
  const cancelPaymentList = shop.pos.filter((payment) => payment.isCancel);
  const cancelPaymentPrice = cancelPaymentList.map((payment) => payment.discountedTotalPrice);
  const totalCancelPrice = cancelPaymentPrice.reduce((acc, cur) => acc + cur, 0);
  const totalProduct = shop.pos.map((payment) => payment.product).reduce((acc, cur) => acc + cur.length, 0);

  return (
    <div className="w-full gap-2 my-10 flex-col-center">
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">주소 :</span>
        <span className="text-sm font-normal">{shop.address}</span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">기간 :</span>
        <span className="text-sm font-normal">
          {shop.start_date} ~ {shop.end_date}
        </span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">총 금액 :</span>
        <span className="text-sm font-normal">{totalPrice.toLocaleString("ko-KR")} 원</span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">취소금액 :</span>
        <span className="text-sm font-normal">{totalCancelPrice.toLocaleString("ko-KR")} 원</span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-semibold">판매금액 :</span>
        <span className="text-sm font-semibold">{(totalPrice - totalCancelPrice).toLocaleString("ko-KR")} 원</span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">결제 횟수 :</span>
        <span className="text-sm font-normal">{shop.pos.length} 회</span>
      </p>
      <p className="justify-between w-96 flex-center">
        <span className="text-sm font-normal">판매 갯수 :</span>
        <span className="text-sm font-normal">{totalProduct} 개</span>
      </p>
    </div>
  );
}
