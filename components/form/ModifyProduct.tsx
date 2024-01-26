import { useForm } from "react-hook-form";
import { Tables, TablesUpdate } from "@/types/supabase";
import { useEffect, useState } from "react";
import { toastMessage } from "@/utils/toast/toastMessage";
import { getCurrentProduct, modifyProduct } from "@/app/api/product";
import { getBrand } from "@/app/api/brand";

interface IProps {
  setProductList: React.Dispatch<React.SetStateAction<Tables<"products">[] | null>>;
}

export default function ModifyProduct({ setProductList }: IProps) {
  const [currentBarcode, setCurrentBarcode] = useState<number | undefined>(undefined);
  const [currentProduct, setCurrentProduct] = useState<Tables<"products"> | null>(null);
  const [brandList, setBrandList] = useState<Tables<"brand">[] | null>(null);

  const { register, handleSubmit, getValues } = useForm<TablesUpdate<"products">>({
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
      isSelling: currentProduct?.isSelling ?? true,
    },
  });

  const fetchProduct = async (barcode: number | undefined) => {
    if (barcode === undefined) return;
    const data = await getCurrentProduct(barcode);
    setCurrentProduct(data);
  };

  const modifyProductHandler = handleSubmit(async (data) => {
    if (currentBarcode === undefined) return;
    if (brandList === null) {
      toastMessage("브랜드를 불러오는데 실패했습니다.", "warn");
      return;
    }
    if (data.brandCode === "" || data.brandCode === undefined) {
      toastMessage("브랜드를 선택하세요", "warn");
      return;
    }

    const brandName = brandList.find((brand) => brand.brandCode === data.brandCode)?.brandName;

    try {
      modifyProduct(currentBarcode, { ...data, brandName });
      setProductList(null);
    } catch (error) {}
  });

  useEffect(() => {
    const fetchBrandList = async () => {
      const data = await getBrand();
      setBrandList(data);
    };
    fetchBrandList();
  }, [setBrandList]);

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
          className="h-10 rounded-lg min-w-fit success-button small-button text-small"
          onClick={() => {
            fetchProduct(currentBarcode);
          }}
        >
          조회
        </button>
      </form>
      {currentProduct !== null && (
        <form onSubmit={modifyProductHandler} className="flex flex-col gap-4 p-10 border bg-default-200 rounded-xl">
          <select className="mx-10" id="brandSelect" defaultValue={getValues("brandCode")} {...register("brandCode")}>
            <option value="">브랜드 선택</option>
            {brandList !== null &&
              brandList.map((option) => (
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
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="weight">
              중량
              <input type="text" id="weight" {...register("weight")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="releaseDate">
              출시일자
              <input type="text" id="releaseDate" {...register("releaseDate")} />
            </label>
          </div>
          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="weight">
              제품 구성
              <input type="text" id="weight" {...register("weight")} />
            </label>
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="releaseDate">
              제품 재질
              <input type="text" id="releaseDate" {...register("releaseDate")} />
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

          <div className="flex justify-between w-full gap-4 py-2 border-b border-black">
            <label className="flex justify-between w-full gap-2 px-3 py-2" htmlFor="isSelling">
              판매중
              <input className="toggle" type="checkbox" id="isSelling" {...register("isSelling")} />
            </label>
          </div>
          <button type="button" onClick={modifyProductHandler} className="success-button small-button">
            수정
          </button>
          <button type="reset" className="delete-button small-button">
            입력 초기화
          </button>
        </form>
      )}
    </div>
  );
}
