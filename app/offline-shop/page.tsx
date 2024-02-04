"use client";

import SubTitle from "@/components/typography/SubTitle";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import React from "react";
import { getShopAndOrder } from "../api/shop";

export default function Page() {
  const [shopList, setShopList] = React.useState<(Tables<"shop"> & { pos: Tables<"pos">[] })[] | null>([]);

  React.useEffect(() => {
    const fetchShop = async () => {
      const shopData = await getShopAndOrder();
      setShopList(shopData);
    };
    fetchShop();
  }, [setShopList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="매장 매출" />
      <div className="gap-10 my-10 w-9/10 flex-col-center">
        <p>총 매장 수 : {shopList === null ? "?" : `${shopList.length}개`}</p>
        <table className="table">
          <thead>
            <tr>
              <th>매장명</th>
              <th>결제건수</th>
              <th>상품판매수</th>
              <th>매출</th>
            </tr>
          </thead>
          <tbody>
            {shopList?.map((shop) => {
              const totalPrice = shop.pos
                .map((payment) => payment.discountedTotalPrice)
                .reduce((acc, cur) => acc + cur, 0);
              const totalProduct = shop.pos.map((payment) => payment.product).reduce((acc, cur) => acc + cur.length, 0);
              return (
                <tr key={shop.id}>
                  <td>{shop.name}</td>
                  <td>{shop.pos.length}</td>
                  <td>{totalProduct}</td>
                  <td>{totalPrice.toLocaleString("ko-KR")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul className="flex-wrap w-full gap-10 px-5 py-10 shadow-2xl bg-zinc-300 border-slate-500 rounded-2xl flex-center">
          {shopList?.map((shop) => {
            const totalPrice = shop.pos.map((payment) => payment.totalPrice).reduce((acc, cur) => acc + cur, 0);
            const totalProduct = shop.pos.map((payment) => payment.product).reduce((acc, cur) => acc + cur.length, 0);
            return (
              <li key={shop.id} className="w-1/5 shadow-2xl flex-center ">
                <Link
                  href={`/offline-shop-payment-detail/${shop.id}`}
                  className="w-full h-full p-5 bg-white hover:text-white flex-col-center rounded-xl hover:bg-slate-500"
                >
                  <p className="text-xl font-semibold">{shop.name}</p>
                  <p className="text-sm">{shop.category}</p>
                  <p className="self-start">결제 {shop.pos.length}건</p>
                  <p className="self-start">상품 {totalProduct}개 판매</p>
                  <p className="self-end">매출 {totalPrice.toLocaleString("ko-KR")}원</p>
                  <button className="small-button">상세보기</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
