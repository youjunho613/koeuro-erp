import { getBrandByCode } from "@/app/api/brand";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import BrandSelect from "../select/BrandSelect";

export default function ModifyBrand() {
  const [currentBrand, setCurrentBrand] = React.useState("");
  console.log("currentBrand :", currentBrand);

  const {
    data: brandData,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: () => getBrandByCode(currentBrand),
  });
  console.log("data :", brandData);

  const { register, handleSubmit } = useForm();

  const onChangeBrand: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
  };

  const modifyBrandHandler = handleSubmit(async (data) => {
    console.log(data);
  });

  if (isError) return <p>{error.message}</p>;
  if (isPending) return <p>로딩중</p>;

  return (
    <form onSubmit={modifyBrandHandler} className="form">
      <BrandSelect onChangeBrand={onChangeBrand} />
      <label htmlFor="brandName" className="label">
        이름
        <input type="text" id="brandName" defaultValue={brandData?.brandName} {...register("brandName")} />
      </label>
      <label htmlFor="brandCode" className="label">
        코드
        <input type="text" id="brandCode" defaultValue={brandData?.brandCode} {...register("brandCode")} />
      </label>
      <button type="submit" className="success-button small-button">
        수정
      </button>
      <button type="button" className="delete-button small-button">
        삭제
      </button>
    </form>
  );
}
