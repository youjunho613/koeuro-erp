interface IProps {
  deleteLastPayment: () => void;
  resetCartList: () => void;
}
export default function CancelButtons({ deleteLastPayment, resetCartList }: IProps) {
  return (
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
  );
}
