import { cancelPos } from "@/app/api/pos";

interface IProps {
  payment: {
    id: number;
    isCancel: boolean;
  };
}

export default function PaymentCancelButton({ payment }: IProps) {
  const cancelPayment = async (paymentId: number, isCancel: boolean) => {
    await cancelPos(paymentId, isCancel);
  };

  return (
    <>
      {payment.isCancel ? (
        <button
          className="success-button small-button"
          type="button"
          onClick={() => {
            cancelPayment(payment.id, false);
          }}
        >
          재승인
        </button>
      ) : (
        <button
          className="delete-button small-button"
          type="button"
          onClick={() => {
            cancelPayment(payment.id, true);
          }}
        >
          결제 취소
        </button>
      )}
    </>
  );
}
