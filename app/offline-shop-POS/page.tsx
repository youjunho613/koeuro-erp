"use client";

import PaymentButtons from "@/components/pos/PaymentButtons";
import PaymentConfig from "@/components/pos/PaymentConfig";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import { toastMessage } from "@/utils/toast/toastMessage";
import React from "react";
import { useForm } from "react-hook-form";
import { deletePos, getLastPayment } from "../api/pos";
import { getCurrentProduct } from "../api/product";
import { getShop } from "../api/shop";

export default function Page() {
  const [discountRate, setDiscountRate] = React.useState<number>(10);
  const [cartList, setCartList] = React.useState<Tables<"products">[]>([]);
  const [isRound, setIsRound] = React.useState(true);
  const [shopList, setShopList] = React.useState<Tables<"shop">[]>([]);
  const [currentShop, setCurrentShop] = React.useState<Tables<"shop"> | null>(null);

  const { register, handleSubmit, reset } = useForm<{ barcode: number }>();

  const onSelectShop = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shopId = e.target.value;
    const shop = shopList.find((shop) => shop.id === Number(shopId));
    if (shop === undefined) {
      return;
    }
    setCurrentShop(shop);
  };

  const onChangeIsRound = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRound(e.target.checked);
  };

  const onChangeDiscountRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(Number(e.target.value));
  };

  const addProduct = handleSubmit(async (data) => {
    const product = await getCurrentProduct(data.barcode);

    if (product === null) {
      toastMessage("해당 제품이 존재하지 않습니다.", "error");
      return;
    }

    setCartList([...cartList, product]);
    reset();
  });

  const deleteLastPayment = async () => {
    const lastOrder = await getLastPayment();

    if (lastOrder === null) {
      toastMessage("취소할 결제가 없습니다.", "error");
      return;
    }
    setCartList(lastOrder.product as Tables<"products">[]);
    deletePos(lastOrder.id);
  };

  const deleteProduct = (index: number) => {
    const newCartList = cartList.filter((_, i) => i !== index);
    setCartList(newCartList);
  };

  const resetCartList = () => {
    setCartList([]);
  };

  const priceArray = cartList.map((product) => product.deliveryPrice);
  const totalPrice = priceArray.reduce((acc, cur) => acc + cur, 0);
  const discountPrice = totalPrice * (1 - discountRate / 100);
  const discountedTotalPrice = isRound ? Math.round(discountPrice / 1000) * 1000 : discountPrice;

  React.useEffect(() => {
    const fetchShopList = async () => {
      const shopList = await getShop();
      if (shopList === null) {
        toastMessage("매장을 불러오는데 실패했습니다.", "error");
        return;
      }
      setShopList(shopList);
    };
    fetchShopList();
  }, [setShopList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="결제" />
      <div className="gap-5 p-5 my-10 border-2 flex-col-center w-9/10 rounded-xl border-slate-500">
        <div className="justify-between gap-10 flex-center">
          <p className="px-3 text-lg font-semibold rounded-lg bg-slate-300">상품 수량</p>
          <p className="text-2xl font-semibold">{cartList.length} 개</p>
          <p className="px-3 text-lg font-semibold rounded-lg bg-slate-300">할인율</p>
          <p className="text-lg font-semibold">{discountRate} %</p>
          <p className="px-3 text-lg font-semibold rounded-lg bg-slate-300">결제 금액</p>
          <p className="text-2xl font-semibold">{discountedTotalPrice.toLocaleString("ko-KR")} 원</p>
        </div>

        <PaymentButtons
          cartList={cartList}
          currentShop={currentShop}
          totalPrice={totalPrice}
          discountedTotalPrice={discountedTotalPrice}
          discountRate={discountRate}
          resetCartList={resetCartList}
          deleteLastPayment={deleteLastPayment}
        />
      </div>
      <form onSubmit={addProduct} className="px-10 form">
        <PaymentConfig
          currentShop={currentShop}
          discountRate={discountRate}
          isRound={isRound}
          onChangeDiscountRate={onChangeDiscountRate}
          onChangeIsRound={onChangeIsRound}
          onSelectShop={onSelectShop}
          shopList={shopList}
        />
        {cartList.map((product, index) => (
          <div key={`${product.barcode}${index}`} className="flex items-center justify-between w-full">
            <label htmlFor={`barcode${index}`} className="w-full text-lg label">
              <div className="flex items-center w-1/3 h-10 gap-10">
                제품 바코드
                <input type="text" id={`barcode${index}`} disabled value={product.barcode} />
              </div>
              <p className="w-1/3 h-10">제품명 : {product.koreaName}</p>
              <p className="w-1/3 h-10">판매가 : {product.deliveryPrice}</p>
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
        ))}
        <label className="justify-between text-lg label" htmlFor="barcode">
          <div className="w-1/4 h-10 gap-10 flex-center">
            제품 바코드
            <input type="number" id="barcode" autoComplete="off" {...register("barcode")} />
          </div>
          <p className="w-1/4 h-10"></p>
          <p className="w-1/4 h-10"></p>
          <button type="submit" onClick={addProduct}></button>
        </label>
      </form>
    </div>
  );
}
