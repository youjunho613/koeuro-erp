"use client";

import CancelButtons from "@/components/pos/CancelButtons";
import DiscountRateInput from "@/components/pos/DiscountRateInput";
import PaymentButtons from "@/components/pos/PaymentButtons";
import PosCartItem from "@/components/pos/PosCartItem";
import SelectOfflineShop from "@/components/pos/SelectOfflineShop";
import IsFloorCheckBox from "@/components/pos/isFloorCheckBox";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import { discountHandler, floorHandler } from "@/utils/calculator/calculator";
import { toastMessage } from "@/utils/toast/toastMessage";
import React from "react";
import { useForm } from "react-hook-form";
import { deletePos, getLastPayment } from "../api/pos";
import { getCurrentProduct } from "../api/product";
import { getShop } from "../api/shop";

export default function Page() {
  const [discountRate, setDiscountRate] = React.useState<number>(10);
  const [isFloor, setIsFloor] = React.useState(true);
  const [cartList, setCartList] = React.useState<Tables<"products">[]>([]);
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

  const onChangeIsFloor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFloor(e.target.checked);
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
    const filteredCartList = cartList.filter((_, i) => i !== index);
    setCartList(filteredCartList);
  };

  const resetCartList = () => {
    setCartList([]);
  };

  const priceArray = cartList.map((product) => product.deliveryPrice);
  const totalPrice = priceArray.reduce((acc, cur) => acc + cur, 0);
  const discountPrice = discountHandler({ price: totalPrice, discountRate });
  const discountedTotalPrice = isFloor ? floorHandler(discountPrice) : discountPrice;

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
          <p className="text-2xl font-semibold">{discountRate} %</p>
          <p className="px-3 text-lg font-semibold rounded-lg bg-slate-300">결제 금액</p>
          <p className="text-2xl font-semibold">{discountedTotalPrice.toLocaleString("ko-KR")} 원</p>
        </div>

        {!!currentShop ? (
          <div className="flex-wrap justify-between w-full gap-10 flex-center">
            <CancelButtons resetCartList={resetCartList} deleteLastPayment={deleteLastPayment} />
            <PaymentButtons
              data={{
                product: cartList,
                shopId: currentShop.id,
                totalPrice,
                discountedTotalPrice,
                discountRate,
                paymentType: "",
              }}
              resetCartList={resetCartList}
            />
          </div>
        ) : (
          <p className="text-lg font-semibold text-center min-w-fit">결제를 위해 매장을 선택해주세요</p>
        )}
      </div>
      <form onSubmit={addProduct} className="px-10 form">
        <div className="justify-end gap-10 text-lg label">
          <DiscountRateInput discountRate={discountRate} onChangeDiscountRate={onChangeDiscountRate} />
          <IsFloorCheckBox isFloor={isFloor} onChangeIsFloor={onChangeIsFloor} />
          <SelectOfflineShop currentShop={currentShop} onSelectShop={onSelectShop} shopList={shopList} />
        </div>

        {cartList.map((product, index) => {
          return (
            <PosCartItem
              isFloor={isFloor}
              discountRate={discountRate}
              product={{ product, index }}
              deleteProduct={deleteProduct}
            />
          );
        })}
        <label className="justify-between text-lg label" htmlFor="barcode">
          <div className="w-1/4 h-10 gap-10 flex-center">
            제품 바코드
            <input type="number" id="barcode" autoComplete="off" {...register("barcode")} />
          </div>
          <button type="submit" onClick={addProduct} className="success-button small-button">
            추가
          </button>
        </label>
      </form>
    </div>
  );
}
