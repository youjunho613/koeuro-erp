import { supabase } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { Tables, TablesUpdate } from "@/types/supabase";
import { ChangeEventHandler, useEffect, useState } from "react";
import { toastMessage } from "@/utils/toast/toastMessage";

interface IProps {
  currentBrand: string;
  selectRef: React.RefObject<HTMLSelectElement>;
  brandData: { id: number; brandName: string; brandCode: string }[];
}

export default function ModifyProduct({ brandData }: IProps) {
  const [currentBarcode, setCurrentBarcode] = useState<number | undefined>(undefined);
  const [currentProduct, setCurrentProduct] = useState<Tables<"products"> | null>(null);

  const { register, handleSubmit } = useForm<TablesUpdate<"products">>({
    values: {
      barcode: currentProduct?.barcode ?? 0,
      koreaName: currentProduct?.koreaName ?? "",
      englishName: currentProduct?.englishName ?? "",
      color: currentProduct?.color ?? "",
      size: currentProduct?.size ?? "",
      countryOfOrigin: currentProduct?.countryOfOrigin ?? "",
      countryOfManufacture: currentProduct?.countryOfManufacture ?? "",
      certificationNumber: currentProduct?.certificationNumber ?? "",
      minimumAge: currentProduct?.minimumAge ?? "",
      supplyPrice: currentProduct?.supplyPrice ?? 0,
      deliveryPrice: currentProduct?.deliveryPrice ?? 0,
      brandCode: currentProduct?.brandCode ?? "",
      brandName: currentProduct?.brandName ?? "",
    },
  });
  const fetchProduct = async (barcode: number | undefined) => {
    if (barcode === undefined) return;

    const { data } = await supabase.from("products").select("*").eq("barcode", barcode).single();

    setCurrentProduct(data);
  };

  const [currentBrand, setCurrentBrand] = useState(currentProduct?.brandCode);

  const onChangeBrand: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
  };

  useEffect(() => {
    setCurrentBrand(currentProduct?.brandCode);
  }, [currentBarcode]);

  const modifyProduct = handleSubmit(async (data) => {
    if (currentBrand === "" || currentBrand === undefined) {
      toastMessage("브랜드를 선택하세요", "warn");
      return;
    }
    if (currentBarcode === undefined) return;

    const brandName = brandData.find((brand) => brand.brandCode === currentBrand)?.brandName;

    const { error } = await supabase
      .from("products")
      .update({ ...data, brandCode: currentBrand, brandName })
      .eq("barcode", currentBarcode)
      .single();

    if (error === null) {
      toastMessage("상품이 수정되었습니다", "success");
    }
    if (error !== null) {
      toastMessage(error.message, "error");
    }
  });

  return (
    <div className="w-full">
      <form
        action={() => {
          fetchProduct(currentBarcode);
        }}
        className="flex items-center justify-around w-full gap-2 my-4"
      >
        <label className="flex justify-between w-full h-10 gap-2 px-3 py-2 rounded-lg bg-zinc-300" htmlFor="barcode">
          제품 바코드
          <input
            type="number"
            id="barcode"
            autoComplete="off"
            autoFocus
            value={currentBarcode}
            onChange={(event) => {
              setCurrentBarcode(event.target.value as unknown as number);
            }}
          />
        </label>
        <button
          type="submit"
          className="flex h-10 px-3 py-2 rounded-lg min-w-fit bg-cyan-300 text-small"
          onClick={() => {
            fetchProduct(currentBarcode);
          }}
        >
          조회
        </button>
      </form>
      {currentProduct !== null && (
        <form onSubmit={modifyProduct} className="flex flex-col gap-4 p-10 border bg-default-200 rounded-xl">
          <select
            className="mx-10"
            name="brandSelect"
            id="brandSelect"
            defaultValue={currentProduct?.brandCode}
            onChange={(event) => {
              onChangeBrand(event);
            }}
          >
            <option value="">브랜드 선택</option>
            {brandData.map((option) => (
              <option key={option.id} value={option.brandCode}>
                {option.brandName}
              </option>
            ))}
          </select>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="koreaName">
              제품명
              <input type="text" id="koreaName" {...register("koreaName")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="englishName">
              영문명
              <input type="text" id="englishName" {...register("englishName")} />
            </label>
          </div>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="color">
              색상
              <input type="text" id="color" {...register("color")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="size">
              크기
              <input type="text" id="size" {...register("size")} />
            </label>
          </div>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="countryOfOrigin">
              원산지
              <input type="text" id="countryOfOrigin" {...register("countryOfOrigin")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="countryOfManufacture">
              제조국
              <input type="text" id="countryOfManufacture" {...register("countryOfManufacture")} />
            </label>
          </div>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="certificationNumber">
              인증번호
              <input type="text" id="certificationNumber" {...register("certificationNumber")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="minimumAge">
              사용연령
              <input type="text" id="minimumAge" {...register("minimumAge")} />
            </label>
          </div>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="supplyPrice">
              입고가
              <input className="text-right" type="number" id="supplyPrice" {...register("supplyPrice")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="deliveryPrice">
              판매가
              <input className="text-right" type="number" id="deliveryPrice" {...register("deliveryPrice")} />
            </label>
          </div>
          <button type="button" onClick={modifyProduct} className="px-3 py-2 rounded-lg bg-cyan-300 text-small">
            수정
          </button>
          <button type="reset" className="px-3 py-2 rounded-lg bg-rose-300 text-small">
            초기화
          </button>
        </form>
      )}
    </div>
  );
}
