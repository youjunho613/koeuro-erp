import { deleteBrand, getBrandByCode, updateBrand } from "@/app/api/brand";
import { toastMessage } from "@/utils/toast/toastMessage";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import BrandSelect from "../select/BrandSelect";

export default function ModifyBrand() {
  const [currentBrand, setCurrentBrand] = React.useState("");

  const {
    data: brandData,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["brand", currentBrand],
    queryFn: () => getBrandByCode(currentBrand),
  });

  const { register, handleSubmit } = useForm({
    values: { brandName: brandData?.brandName, brandCode: brandData?.brandCode },
  });

  const onChangeBrand: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
  };

  const modifyBrandHandler = handleSubmit(async (data) => {
    if (currentBrand === "") {
      toastMessage("수정 할 브랜드를 선택해주세요.", "error");
      return;
    }
    if (data.brandName === "" || data.brandCode === "") {
      toastMessage("수정 될 값이 비어있습니다.", "error");
      return;
    }

    updateBrand({ ...data, id: brandData?.id });
  });

  const deleteBrandHandler = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    deleteBrand(currentBrand);
  };

  return (
    <form onSubmit={modifyBrandHandler} className="form">
      <BrandSelect onChangeBrand={onChangeBrand} />
      {isPending ? (
        <p>로딩중</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <label htmlFor="brandName" className="label">
            이름
            <input type="text" id="brandName" disabled={currentBrand === ""} {...register("brandName")} />
          </label>
          <label htmlFor="brandCode" className="label">
            코드
            <input type="text" id="brandCode" disabled={currentBrand === ""} {...register("brandCode")} />
          </label>
          <button type="submit" className="success-button small-button">
            수정
          </button>
          <button type="button" className="delete-button small-button" onClick={deleteBrandHandler}>
            삭제
          </button>
        </>
      )}
    </form>
  );
}
