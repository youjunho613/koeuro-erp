import type { Tables } from "@/types/supabase";
import React from "react";
import OfflineSortButtons from "../button/OfflineSortButtons";
import PaymentCancelButton from "../button/PaymentCancelButton";

interface IProps {
  refetchShop: () => void;
  isDetailVisible: boolean;
  shopPos: Tables<"pos">[];
  setShop: React.Dispatch<React.SetStateAction<(Tables<"shop"> & { pos: Tables<"pos">[] }) | null>>;
}

export default function OfflineShopTable({ refetchShop, isDetailVisible, shopPos, setShop }: IProps) {
  const paymentType = (paymentType: string) => {
    switch (paymentType) {
      case "card":
        return "카드";
      case "cash":
        return "현금";
      case "kakao":
        return "카카오페이";
      case "naver":
        return "네이버페이";
      case "account":
        return "계좌이체";
      default:
        break;
    }
  };

  return (
    <div className="table-base">
      <table className="table">
        <thead>
          <tr>
            <th>
              결제일
              <OfflineSortButtons type="date" setShop={setShop} />
            </th>
            {isDetailVisible && (
              <>
                <th>주문번호</th>
                <th>결제시간</th>
                <th>할인 전 금액</th>
                <th>할인율</th>
              </>
            )}
            <th>결제수단</th>
            <th>
              결제금액
              <OfflineSortButtons type="price" setShop={setShop} />
            </th>
            <th>
              결제상품
              <OfflineSortButtons type="payment" setShop={setShop} />
            </th>
            <th>
              <button className="p-1 ml-2 rounded-lg delete-button" type="button" onClick={refetchShop}>
                초기화
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {shopPos.map((payment) => {
            const payDate = payment.created_at.split("T")[0];
            const payHour = payment.created_at.split("T")[1].split(":")[0];
            const payMinute = payment.created_at.split("T")[1].split(":")[1];
            return (
              <tr key={payment.id} className={payment.isCancel ? "bg-red-50" : ""}>
                <td>{payDate}</td>
                {isDetailVisible && (
                  <>
                    <td>{payment.id}</td>
                    <td>
                      {payHour} : {payMinute}
                    </td>
                    <td>{payment.totalPrice.toLocaleString("ko-KR")}원</td>
                    <td>{payment.discountRate}%</td>
                  </>
                )}
                <td>{paymentType(payment.paymentType)}</td>
                <td className={payment.isCancel ? "line-through" : ""}>
                  {payment.discountedTotalPrice.toLocaleString("ko-KR")}원
                </td>
                <td>
                  <ul>
                    {payment.product.map((product, index) => {
                      if (product === null) return null;
                      const productData = JSON.parse(JSON.stringify(product)) as Tables<"products">;
                      const { deliveryPrice, koreaName, barcode } = productData;
                      const productDiscountedPrice = deliveryPrice - deliveryPrice * (payment.discountRate / 100);
                      return (
                        <li
                          key={`${barcode}${index}`}
                          className="flex items-center justify-between bg-white border-b hover:bg-slate-400 border-slate-300"
                        >
                          <span>{koreaName}</span>
                          <p>
                            {isDetailVisible && (
                              <span className="mr-4 line-through">{deliveryPrice.toLocaleString("ko-KR")}원</span>
                            )}
                            <span>{productDiscountedPrice.toLocaleString("ko-KR")}원</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>
                  <PaymentCancelButton payment={payment} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
