"use client";

import SupplySearchForm from "@/components/form/SupplySearchForm";
import SupplyTable from "@/components/table/SupplyTable";
import SubTitle from "@/components/typography/SubTitle";
import { useEffect, useState } from "react";
import { getSupply } from "../api/supply";
import { Tables } from "@/types/supabase";

export interface ISearchInput {
  barcode: string;
  start_date: string;
  end_date: string;
  brandName: string;
  brandCode: string;
  minQuantity: string;
  maxQuantity: string;
}
export type TSupply = (Tables<"receiving"> & { products: TProductPick })[] | null;
type TProductPick = Pick<Tables<"products">, "brandCode" | "brandName" | "englishName" | "koreaName"> | null;

export default function Page() {
  const [supplyList, setSupplyList] = useState<TSupply>(null);

  useEffect(() => {
    const fetchSupply = async () => {
      const data = await getSupply();
      setSupplyList(data);
    };

    fetchSupply();
  }, [setSupplyList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="입고 조회" />
      <SupplySearchForm setSupplyList={setSupplyList} />
      <div className="flex flex-col mx-auto my-10 w-9/10">
        <SupplyTable supplyList={supplyList} />
      </div>
    </div>
  );
}
