"use client";

import Loading from "@/components/Loading";
import AddReleaseForm from "@/components/form/AddReleaseForm";
import ReleaseSearchForm from "@/components/form/ReleaseSearchForm";
import ReleaseTable from "@/components/table/ReleaseTable";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import type { IShowForm } from "@/types/visibleStatus";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRelease } from "../api/release";

export type TRelease = (Tables<"releasing"> & { products: TProductPick })[] | null | undefined;
type TProductPick = Pick<Tables<"products">, "brandCode" | "brandName" | "englishName" | "koreaName"> | null;

export default function Page() {
  const { data, error, isPending, isError } = useQuery({ queryKey: ["releasing"], queryFn: getRelease });

  const initialShowForm = { addForm: false, searchForm: false };
  const [isShow, setIsShow] = React.useState<IShowForm>(initialShowForm);
  const [releaseList, setReleaseList] = React.useState<TRelease>(data);

  const onChangeFormShow = (target: keyof IShowForm) => {
    setIsShow({ ...initialShowForm, [target]: !isShow[target] });
  };

  React.useEffect(() => {
    const fetchSupply = async () => {
      const data = await getRelease();
      setReleaseList(data);
    };

    fetchSupply();
  }, [setReleaseList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="출고 관리" />

      {!isShow.addForm && (
        <button
          className="p-5 my-5 text-lg font-bold shadow-lg rounded-2xl w-9/10 button warning-button"
          onClick={() => onChangeFormShow("addForm")}
        >
          출고 등록
        </button>
      )}
      {isShow.addForm && <AddReleaseForm onChangeFormShow={onChangeFormShow} />}

      {!isShow.searchForm && (
        <button
          className="p-5 my-5 text-lg font-bold shadow-lg rounded-2xl w-9/10 button warning-button"
          onClick={() => onChangeFormShow("searchForm")}
        >
          검색
        </button>
      )}
      {isShow.searchForm && <ReleaseSearchForm setReleaseList={setReleaseList} onChangeFormShow={onChangeFormShow} />}
      <div className="flex flex-col mx-auto my-10 w-9/10">
        {isPending ? <Loading /> : isError ? <p>{error.message}</p> : <ReleaseTable releaseList={releaseList} />}
      </div>
    </div>
  );
}
