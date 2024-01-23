"use client";

import SubTitle from "@/components/typography/SubTitle";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [currentProduct, setCurrentProduct] =
    useState<Tables<"products"> | null>(null);
  console.log("currentProduct :", currentProduct);

  const { register, getValues, setValue, handleSubmit } = useForm<
    Tables<"products">
  >({
    defaultValues: { quantity: 0 },
  });

  const fetchProduct = handleSubmit(async (data) => {
    console.log("실행");

    const { barcode } = data;

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("barcode", barcode)
      .single();

    setCurrentProduct(product);
  });

  const supplyProduct = async () => {
    if (getValues("barcode") === undefined) {
      alert("바코드를 입력하세요");
      return;
    }
    if (currentProduct === null) {
      alert("해당하는 상품이 없습니다");
      return;
    }

    await supabase
      .from("products")
      .update({ quantity: currentProduct.quantity + getValues("quantity") })
      .eq("barcode", getValues("barcode"))
      .single();
    alert("입고되었습니다");
  };

  const onClickQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = event.currentTarget;
    if (innerText === "-") {
      setValue("quantity", getValues("quantity") - 1, { shouldTouch: true });
      return;
    }
    if (innerText === "-10") {
      setValue("quantity", getValues("quantity") - 10);
      return;
    }
    if (innerText === "+10") {
      setValue("quantity", getValues("quantity") + 10);
      return;
    }
    setValue("quantity", getValues("quantity") + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SubTitle innerText="입고 등록" />
      {/* SupplyForm */}
      <form
        onSubmit={fetchProduct}
        className="flex flex-col gap-5 p-5 my-10 border px-auto w-9/10 rounded-2xl bg-slate-200"
      >
        <div className="flex items-center justify-start gap-10">
          <label htmlFor="koreaName" className="flex gap-2">
            제품명
            <input
              type="text"
              id="koreaName"
              disabled
              className="text-center disabled:bg-slate-50"
              value={currentProduct?.koreaName ?? ""}
            />
          </label>
          <label htmlFor="englishName" className="flex gap-2">
            영문명
            <input
              type="text"
              id="englishName"
              disabled
              className="text-center disabled:bg-slate-50"
              value={currentProduct?.englishName ?? ""}
            />
          </label>
          <label htmlFor="quantity" className="flex gap-2">
            현재 재고
            <input
              type="text"
              id="quantity"
              disabled
              className="text-center disabled:bg-slate-50"
              value={currentProduct?.quantity ?? ""}
            />
          </label>
        </div>
        <div className="flex items-center justify-start gap-10">
          <label htmlFor="barcode" className="flex gap-2">
            바코드
            <input
              type="text"
              id="barcode"
              autoComplete="off"
              {...register("barcode", {
                onChange: () => {
                  setCurrentProduct(null);
                },
              })}
            />
            <p className="flex items-center text-xs">수기 입력시 엔터</p>
          </label>
          <label htmlFor="quantity" className="flex gap-2">
            수량
            <input
              type="number"
              id="quantity"
              defaultValue={0}
              {...register("quantity")}
            />
          </label>
        </div>
        <div className="flex items-center justify-around">
          <div className="flex items-center justify-center gap-2 p-5 bg-white rounded-lg">
            <button
              onClick={onClickQuantity}
              type="button"
              className="flex items-center justify-center w-10 px-3 py-1 rounded-lg bg-rose-300"
            >
              -10
            </button>
            <button
              onClick={onClickQuantity}
              type="button"
              className="flex items-center justify-center w-10 px-3 py-1 rounded-lg bg-rose-200"
            >
              -
            </button>
            <button
              onClick={onClickQuantity}
              type="button"
              className="flex items-center justify-center w-10 px-3 py-1 rounded-lg bg-cyan-200"
            >
              +
            </button>
            <button
              onClick={onClickQuantity}
              type="button"
              className="flex items-center justify-center w-10 px-3 py-1 rounded-lg bg-cyan-300"
            >
              +10
            </button>
          </div>
          <button></button>
          <button type="button" onClick={supplyProduct}>
            입고
          </button>
          <button type="reset">초기화</button>
        </div>
      </form>

      <table></table>
    </div>
  );
}
