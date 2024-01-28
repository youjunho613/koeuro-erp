import { Tables } from "@/types/supabase";

interface IProps {
  currentShop: Tables<"shop"> | null;
  discountRate: number;
  onChangeIsRound: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDiscountRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectShop: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isRound: boolean;
  shopList: Tables<"shop">[];
}

export default function PaymentConfig(props: IProps) {
  const { currentShop, discountRate, onChangeIsRound, onChangeDiscountRate, onSelectShop, isRound, shopList } = props;
  return (
    <div className="justify-end gap-10 text-lg label">
      <label className="gap-2 flex-center" htmlFor="">
        할인율
        <input
          type="number"
          className="w-10"
          defaultValue={discountRate}
          onChange={(e) => {
            onChangeDiscountRate(e);
          }}
        />
        %
      </label>
      <label htmlFor="isRound">
        천단위 절사 여부
        <input type="checkbox" id="isRound" className="toggle" checked={isRound} onChange={onChangeIsRound} />
      </label>
      <select
        name="shop"
        id="shop"
        onChange={(e) => {
          onSelectShop(e);
        }}
      >
        <option value="" disabled={currentShop !== null}>
          매장 선택
        </option>
        {shopList.map((shop) => (
          <option key={shop.id} value={shop.id}>
            {shop.name}
          </option>
        ))}
      </select>
    </div>
  );
}
