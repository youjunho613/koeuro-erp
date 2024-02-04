"use client";

import Loading from "@/components/Loading";
import AddReceiving from "@/components/form/AddReceiving";
import SupplySearchForm from "@/components/form/SupplySearchForm";
import SupplyTable from "@/components/table/SupplyTable";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import type { IShowForm } from "@/types/visibleStatus";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSupply } from "../api/supply";

export type TSupply = (Tables<"receiving"> & { products: TProductPick })[] | null | undefined;
type TProductPick = Pick<Tables<"products">, "brandCode" | "brandName" | "englishName" | "koreaName"> | null;

export default function Page() {
  const { data, error, isPending, isError } = useQuery({ queryKey: ["receiving"], queryFn: getSupply });

  const initialShowForm = { addForm: false, searchForm: false };
  const [isShow, setIsShow] = React.useState<IShowForm>(initialShowForm);
  const [supplyList, setSupplyList] = React.useState<TSupply>(data);

  const onChangeFormShow = (target: keyof IShowForm) => {
    setIsShow({ ...initialShowForm, [target]: !isShow[target] });
  };

  React.useEffect(() => {
    const fetchSupply = async () => {
      const data = await getSupply();
      setSupplyList(data);
    };

    fetchSupply();
  }, [setSupplyList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="입고 관리" />

      {!isShow.addForm && (
        <button
          className="p-5 my-5 text-lg font-bold shadow-lg rounded-2xl w-9/10 button warning-button"
          onClick={() => onChangeFormShow("addForm")}
        >
          입고 등록
        </button>
      )}
      {isShow.addForm && <AddReceiving onChangeFormShow={onChangeFormShow} />}

      {!isShow.searchForm && (
        <button
          className="p-5 my-5 text-lg font-bold shadow-lg rounded-2xl w-9/10 button warning-button"
          onClick={() => onChangeFormShow("searchForm")}
        >
          검색
        </button>
      )}
      {isShow.searchForm && <SupplySearchForm setSupplyList={setSupplyList} onChangeFormShow={onChangeFormShow} />}
      <div className="flex flex-col mx-auto my-10 w-9/10">
        {isPending ? <Loading /> : isError ? <p>{error.message}</p> : <SupplyTable supplyList={supplyList} />}
      </div>
    </div>
  );
}
