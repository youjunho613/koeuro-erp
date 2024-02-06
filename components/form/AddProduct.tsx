import { getBrand } from "@/app/api/brand";
import { insertProduct } from "@/app/api/product";
import type { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";
import React from "react";
import { useForm } from "react-hook-form";

interface IHandleOnKeyDown {
  event: React.KeyboardEvent<HTMLInputElement>;
  target: keyof Tables<"products"> | "submit";
}

export default function AddProduct() {
  const [brandList, setBrandList] = React.useState<Tables<"brand">[] | null>(null);
  const { register, handleSubmit, setFocus, reset } = useForm<Tables<"products">>();

  const handleOnKeyDown = ({ event, target }: IHandleOnKeyDown) => {
    if (event.key !== "Enter") return;
    if (event.key === "Enter" && target !== "submit") {
      setFocus(target);
    }
    if (target === "submit") {
      addProduct();
    }
  };

  const addProduct = handleSubmit(async (data) => {
    if (brandList === null) {
      toastMessage("브랜드를 불러오는데 실패했습니다.", "warn");
      return;
    }

    // FIXME
    const manager = {
      managerName: "홍길동",
      managerNumber: 0,
    };

    if (data.brandCode === "") {
      toastMessage("브랜드를 선택하세요", "warn");
      return;
    }
    const brandName = brandList.find((brand) => brand.brandCode === data.brandCode)?.brandName;
    if (brandName === undefined) return;
    const brand = {
      brandCode: data.brandCode,
      brandName,
    };

    insertProduct({ ...data, ...manager, ...brand, quantity: 0 });
    reset();
  });

  React.useEffect(() => {
    const fetchBrandList = async () => {
      const data = await getBrand();
      setBrandList(data);
    };
    fetchBrandList();
  }, [setBrandList]);

  return (
    <form onSubmit={addProduct} className="form">
      <div className="flex flex-wrap items-center justify-around gap-5">
        <select className="mx-10" id="brandSelect" {...register("brandCode")}>
          <option value="">브랜드 선택</option>
          {brandList !== null &&
            brandList.map((option) => (
              <option key={option.id} value={option.brandCode}>
                {option.brandName}
              </option>
            ))}
        </select>
        <label className="label" htmlFor="barcode">
          제품 바코드
          <p className="text-red-500">(필수)</p>
          <input
            type="number"
            id="barcode"
            autoComplete="off"
            autoFocus
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "koreaName" });
            }}
            {...register("barcode")}
          />
        </label>
        <label className="label" htmlFor="koreaName">
          제품명
          <input
            type="text"
            id="koreaName"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "englishName" });
            }}
            {...register("koreaName")}
          />
        </label>
        <label className="label" htmlFor="englishName">
          영문 제품명
          <input
            type="text"
            id="englishName"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "color" });
            }}
            {...register("englishName")}
          />
        </label>
        <label className="label" htmlFor="color">
          색상
          <input
            type="text"
            id="color"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "size" });
            }}
            {...register("color")}
          />
        </label>
        <label className="label" htmlFor="size">
          크기
          <input
            type="text"
            id="size"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "countryOfOrigin" });
            }}
            {...register("size")}
          />
        </label>
        <label className="label" htmlFor="countryOfOrigin">
          원산지
          <input
            type="text"
            id="countryOfOrigin"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "countryOfManufacture" });
            }}
            {...register("countryOfOrigin")}
          />
        </label>
        <label className="label" htmlFor="countryOfManufacture">
          제조국
          <input
            type="text"
            id="countryOfManufacture"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "certificationNumber" });
            }}
            {...register("countryOfManufacture")}
          />
        </label>
        <label className="label" htmlFor="certificationNumber">
          인증번호
          <input
            type="text"
            id="certificationNumber"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "minimumAge" });
            }}
            {...register("certificationNumber")}
          />
        </label>
        <label className="label" htmlFor="minimumAge">
          사용연령
          <input
            type="text"
            id="minimumAge"
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "supplyPrice" });
            }}
            {...register("minimumAge")}
          />
        </label>
        <label className="label" htmlFor="supplyPrice">
          입고가
          <input
            className="text-right"
            type="number"
            id="supplyPrice"
            defaultValue={0}
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "deliveryPrice" });
            }}
            {...register("supplyPrice")}
          />
        </label>
        <label className="label" htmlFor="deliveryPrice">
          판매가
          <input
            className="text-right"
            type="number"
            id="deliveryPrice"
            defaultValue={0}
            onKeyDown={(event) => {
              handleOnKeyDown({ event, target: "submit" });
            }}
            {...register("deliveryPrice")}
          />
        </label>
        <button type="button" className="success-button small-button" onClick={addProduct}>
          등록
        </button>
        <button type="reset" className="delete-button small-button">
          초기화
        </button>
      </div>
    </form>
  );
}
