"use client";

import { getBrand } from "@/app/api/brand";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IProps {
  onChangeBrand: React.ChangeEventHandler<HTMLSelectElement>;
}

type TBrand = Tables<"brand">[] | null | undefined;

export default function BrandSelect({ onChangeBrand }: IProps) {
  const { data, error, isPending, isError } = useQuery({ queryKey: ["brand"], queryFn: getBrand });

  const [brandList, setBrandList] = React.useState<TBrand>(data);

  const selectRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    const fetchBrand = async () => {
      const data = await getBrand();
      setBrandList(data);
    };
    fetchBrand();
  }, [setBrandList]);

  return (
    <select
      className="my-5"
      name="brandSelect"
      id="brandSelect"
      ref={selectRef}
      onChange={(event) => {
        onChangeBrand(event);
      }}
    >
      <option value="">브랜드 선택</option>
      {isPending ? (
        <option>로딩중</option>
      ) : isError ? (
        <option>{error.message}</option>
      ) : (
        brandList?.map((option) => (
          <option key={option.id} value={option.brandCode}>
            {option.brandName}
          </option>
        ))
      )}
    </select>
  );
}
