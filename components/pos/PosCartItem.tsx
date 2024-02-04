import type { Tables } from "@/types/supabase";
import { discountHandler, floorHandler } from "@/utils/calculator/calculator";

interface IProps {
  isFloor: boolean;
  discountRate: number;
  product: { product: Tables<"products">; index: number };
  deleteProduct: (index: number) => void;
}

export default function PosCartItem({ isFloor, discountRate, product: { product, index }, deleteProduct }: IProps) {
  const { barcode, koreaName, deliveryPrice } = product;
  const discountPrice = discountHandler({ price: deliveryPrice, discountRate });
  return (
    <div key={`${barcode}${index}`} className="flex items-center justify-between w-full">
      <label htmlFor={`barcode-${index}`} className="w-full text-lg label">
        <div className="flex items-center w-1/3 h-10 gap-10">
          제품 바코드
          <input type="text" id={`barcode-${index}`} disabled value={barcode} />
        </div>
        <p className="w-1/4 h-10">제품명 : {koreaName}</p>
        <p className="w-1/4 h-10">정가 : {deliveryPrice.toLocaleString("ko-KR")}</p>
        <p className="w-1/4 h-10">
          할인가 :
          {isFloor
            ? floorHandler(discountPrice).toLocaleString("ko-KR")
            : discountHandler({ price: deliveryPrice, discountRate }).toLocaleString("ko-KR")}
        </p>
      </label>
      <button
        type="button"
        className="min-w-fit delete-button small-button"
        onClick={() => {
          deleteProduct(index);
        }}
      >
        삭제
      </button>
    </div>
  );
}
