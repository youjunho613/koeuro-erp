import { getBrand } from "@/app/api/brand";
import { Tables } from "@/types/supabase";
import React from "react";

interface IProps {
  onChangeBrand: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function BrandSelect({ onChangeBrand }: IProps) {
  const [brandList, setBrandList] = React.useState<Tables<"brand">[] | null>(null);

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
      {brandList !== null &&
        brandList.map((option) => (
          <option key={option.id} value={option.brandCode}>
            {option.brandName}
          </option>
        ))}
    </select>
  );
}
