import { updateQuantity } from "@/app/api/product";
import { insertReceiving } from "@/app/api/supply";
import type { Tables, TablesInsert } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddReceiving() {
  const [currentProduct, setCurrentProduct] = useState<Tables<"products"> | null>(null);

  const { register, getValues, setValue, handleSubmit, reset, setFocus } = useForm<TablesInsert<"receiving">>({
    defaultValues: { quantity: 0 },
  });

  const fetchProduct = handleSubmit(async (data) => {
    const { barcode } = data;

    const { data: product } = await supabase.from("products").select("*").eq("barcode", barcode).single();

    setCurrentProduct(product);
  });

  const onClickQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = event.currentTarget;
    switch (innerText) {
      case "-":
        setValue("quantity", getValues("quantity") - 1, { shouldTouch: true });
        return;
      case "+":
        setValue("quantity", getValues("quantity") + 1, { shouldTouch: true });
        return;
      case "-10":
        setValue("quantity", getValues("quantity") - 10, { shouldTouch: true });
        return;
      case "+10":
        setValue("quantity", getValues("quantity") + 10, { shouldTouch: true });
        return;
      default:
        return;
    }
  };

  const supplyProduct = handleSubmit(async (data) => {
    const { barcode, quantity } = data;

    if (barcode === undefined || String(barcode) === "") {
      toastMessage("바코드를 입력하세요", "warn");
      return;
    }
    if (currentProduct === null) {
      toastMessage("해당하는 상품이 없습니다", "warn");
      return;
    }

    if (quantity === 0) {
      toastMessage("수량을 입력하세요", "warn");
      return;
    }

    const totalQuantity = Number(currentProduct.quantity) + Number(quantity);

    updateQuantity({ barcode, quantity: totalQuantity });
    insertReceiving({ ...data, pastQuantity: totalQuantity });

    reset();
    setCurrentProduct(null);
    toastMessage("입고되었습니다", "success");
  });

  useEffect(() => {
    setFocus("barcode");
  }, [supplyProduct]);

  const datetime = new Date();
  const todayDate = datetime.toISOString().substring(0, 10);

  return (
    <form onSubmit={fetchProduct} className="form">
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
            autoFocus
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
          <input type="number" id="quantity" defaultValue={0} {...register("quantity")} />
        </label>
        <label htmlFor="receiving_date" className="flex gap-2">
          입고일
          <input type="date" id="receiving_date" defaultValue={todayDate} {...register("receiving_date")} />
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
        <button className="success-button small-button" type="button" onClick={supplyProduct}>
          입고
        </button>
        <button className="delete-button small-button" type="reset">
          초기화
        </button>
      </div>
    </form>
  );
}
