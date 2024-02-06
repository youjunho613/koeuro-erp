interface IProps {
  discountRate: number;
  onChangeDiscountRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DiscountRateInput({ discountRate, onChangeDiscountRate }: IProps) {
  return (
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
  );
}
