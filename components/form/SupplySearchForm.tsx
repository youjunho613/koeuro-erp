"use client";

import { getSupply } from "@/app/api/supply";
import { ISearchInput, TSupply } from "@/app/warehousing/page";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  setSupplyList: Dispatch<SetStateAction<TSupply>>;
}

export default function SupplySearchForm({ setSupplyList }: IProps) {
  const [isShowForm, setIsShowForm] = useState(false);

  const onChangeFormShow = () => {
    setIsShowForm(!isShowForm);
  };

  const { register, handleSubmit, reset } = useForm<ISearchInput>();

  const resetProduct = async () => {
    const supplyList = await getSupply();
    setSupplyList(supplyList);
    reset();
  };

  const searchProduct = handleSubmit(async (data) => {
    const supplyList = await getSupply();
    if (supplyList === null) return;

    const filteredBarcode =
      data.barcode !== "" ? supplyList.filter((supply) => String(supply.barcode) === data.barcode) : supplyList;

    const filteredStartDate =
      data.start_date !== ""
        ? filteredBarcode.filter((supply) => supply.receiving_date >= data.start_date)
        : filteredBarcode;

    const filteredEndDate =
      data.end_date !== ""
        ? filteredStartDate.filter((supply) => supply.receiving_date <= data.end_date)
        : filteredStartDate;

    const filteredBrandName =
      data.brandName !== ""
        ? filteredEndDate.filter((supply) => supply.products?.brandName.includes(data.brandName))
        : filteredEndDate;

    const filteredBrandCode =
      data.brandCode !== ""
        ? filteredBrandName.filter((supply) => supply.products?.brandCode.includes(data.brandCode))
        : filteredBrandName;

    setSupplyList(filteredBrandCode);
  });

  return (
    <>
      {!isShowForm && (
        <button className="p-5 my-10 w-9/10 button warning-button" onClick={onChangeFormShow}>
          검색 조건 열기
        </button>
      )}
      {isShowForm && (
        <form onSubmit={searchProduct} className="form">
          <div className="flex flex-wrap items-center justify-around gap-5">
            <label htmlFor="start_date" className="label">
              입고일자
              <input type="date" id="start_date" {...register("start_date")} />~
              <input type="date" id="end_date" {...register("end_date")} />
            </label>
            <label htmlFor="brandName" className="label">
              브랜드
              <input type="text" id="brandName" {...register("brandName")} />
            </label>
            <label htmlFor="brandCode" className="label">
              브랜드 코드
              <input type="text" id="brandCode" {...register("brandCode")} />
            </label>
            <label htmlFor="barcode" className="label">
              바코드
              <input type="text" id="barcode" {...register("barcode")} />
            </label>
            <label htmlFor="" className="label">
              입고수량
              <input type="number" id="" {...register("minQuantity")} />
              ~
              <input type="text" id="" {...register("maxQuantity")} />
            </label>
          </div>
          <div className="flex items-center justify-around">
            <button onClick={searchProduct} type="button" className="success-button small-button">
              조회
            </button>
            <button onClick={resetProduct} type="button" className="delete-button small-button">
              검색 초기화
            </button>
          </div>
          <button
            className="absolute top-0 right-0 m-2 small-button delete-button"
            type="button"
            onClick={onChangeFormShow}
          >
            X
          </button>
        </form>
      )}
    </>
  );
}
