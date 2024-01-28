"use client";

import SubTitle from "@/components/typography/SubTitle";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import ReleaseForm from "@/components/form/ReleaseForm";
import ReleaseTable from "@/components/table/ReleaseTable";
import { getRelease } from "../api/release";

export type TRelease = (Tables<"releasing"> & { products: TProductPick })[] | null;
type TProductPick = Pick<Tables<"products">, "brandCode" | "brandName" | "englishName" | "koreaName"> | null;

export default function Page() {
  const [releaseList, setReleaseList] = useState<TRelease>(null);

  useEffect(() => {
    const fetchRelease = async () => {
      const data = await getRelease();
      setReleaseList(data);
    };

    fetchRelease();
  }, [setReleaseList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="출고 조회" />
      <ReleaseForm setReleaseList={setReleaseList} />
      <div className="flex flex-col mx-auto my-10 w-9/10">
        <ReleaseTable releaseList={releaseList} />
      </div>
    </div>
  );
}
