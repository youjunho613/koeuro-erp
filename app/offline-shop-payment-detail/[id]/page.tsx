"use client";

import { cancelPos } from "@/app/api/pos";
import { currentShop } from "@/app/api/shop";
import OfflineSortButtons from "@/components/button/OfflineSortButtons";
import SubTitle from "@/components/typography/SubTitle";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";

interface IProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: shopId } }: IProps) {
  const [shop, setShop] = useState<(Tables<"shop"> & { pos: Tables<"pos">[] }) | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      const shopData = await currentShop(Number(shopId));
      setShop(shopData);
    };
    fetchShop();
  }, [setShop]);

  const cancelPayment = async (paymentId: number, isCancel: boolean) => {
    await cancelPos(paymentId, isCancel);
  };

  if (shop === null) return <div>loading...</div>;

  const totalPrice = shop.pos.map((payment) => payment.discountedTotalPrice).reduce((acc, cur) => acc + cur, 0);
  const cancelPaymentList = shop.pos.filter((payment) => payment.isCancel);
  const totalCancelPrice = cancelPaymentList
    .map((payment) => payment.discountedTotalPrice)
    .reduce((acc, cur) => acc + cur, 0);
  const totalProduct = shop.pos.map((payment) => payment.product).reduce((acc, cur) => acc + cur.length, 0);

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
    shop.pos.map((payment) => payment.paymentType);
  };

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText={`${shop.name} 매출`} />
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
          <span className="text-sm font-normal">총 금액ㅅ :</span>
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
          <span className="text-sm font-normal">판매 갯수 :</span>
          <span className="text-sm font-normal">{totalProduct} 개</span>
        </p>
      </div>
      <table className="table my-10">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>
              결제일
              <OfflineSortButtons type="date" setShop={setShop} />
            </th>
            <th>결제시간</th>
            <th>결제수단</th>
            <th>결제금액</th>
            <th>할인율</th>
            <th>
              결제금액
              <OfflineSortButtons type="price" setShop={setShop} />
            </th>
            <th>
              결제상품
              <OfflineSortButtons type="payment" setShop={setShop} />
            </th>
          </tr>
        </thead>
        <tbody>
          {shop.pos.map((payment) => {
            const date = payment.created_at.split("T")[0];
            const hour = payment.created_at.split("T")[1].split(":")[0];
            const minute = payment.created_at.split("T")[1].split(":")[1];
            return (
              <tr key={payment.id} className={payment.isCancel ? "bg-red-50" : ""}>
                <td>{payment.id}</td>
                <td>{date}</td>
                <td>
                  {hour} : {minute}
                </td>
                <td>{paymentType(payment.paymentType)}</td>
                <td>{payment.totalPrice.toLocaleString("ko-KR")}원</td>
                <td>{payment.discountRate}</td>
                <td className={payment.isCancel ? "line-through" : ""}>
                  {payment.discountedTotalPrice.toLocaleString("ko-KR")}원
                </td>
                <td>
                  <ul>
                    {payment.product.map((product, index) => {
                      if (product === null) return null;
                      const productData = JSON.parse(JSON.stringify(product)) as Tables<"products">;
                      const productDiscountedPrice =
                        productData.deliveryPrice - productData.deliveryPrice * (payment.discountRate / 100);
                      return (
                        <li
                          key={`${productData.barcode}${index}`}
                          className="flex items-center justify-between bg-white border-b hover:bg-slate-400 border-slate-300"
                        >
                          <span>{productData.koreaName}</span>
                          <p>
                            <span className="mr-4 line-through">
                              {productData.deliveryPrice.toLocaleString("ko-KR")}원
                            </span>
                            <span>{productDiscountedPrice.toLocaleString("ko-KR")}원</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>
                  {payment.isCancel ? (
                    <button
                      className="success-button small-button"
                      type="button"
                      onClick={() => {
                        cancelPayment(payment.id, true);
                      }}
                    >
                      재승인
                    </button>
                  ) : (
                    <button
                      className="delete-button small-button"
                      type="button"
                      onClick={() => {
                        cancelPayment(payment.id, false);
                      }}
                    >
                      결제 취소
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
