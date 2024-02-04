interface IProps {
  isFloor: boolean;
  onChangeIsFloor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IsFloorCheckBox({ isFloor, onChangeIsFloor }: IProps) {
  return (
    <label htmlFor="isFloor">
      천단위 절사 여부
      <input type="checkbox" id="isFloor" className="toggle" checked={isFloor} onChange={onChangeIsFloor} />
    </label>
  );
}
