"use client";

import AddProduct from "@/components/form/AddProduct";
import ModifyProduct from "@/components/form/ModifyProduct";
import ProductManagementTab from "@/components/tab/productManagement/ProductManagementTab";
import ProductTable from "@/components/table/ProductTable";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";

const brandData = [
  { id: 1, brandName: "부코스키", brandCode: "bukowski" },
  { id: 2, brandName: "아스트라", brandCode: "astra" },
  { id: 3, brandName: "노베", brandCode: "nowe" },
];

export type TTab =
  | "addProduct"
  | "modifyProduct"
  | "deleteProduct"
  | "addBrand"
  | "modifyBrand"
  | "deleteBrand"
  | "filtering"
  | "";

export default function Page() {
  const [currentBrand, setCurrentBrand] = useState("");
  const [currentTab, setCurrentTab] = useState<TTab>("");
  const [productData, setProductData] = useState<Tables<"products">[] | null>(
    null
  );

  const selectRef = useRef<HTMLSelectElement>(null);

  const onChangeBrand: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
  };

  const onChangeTab = (target: TTab) => {
    if (currentTab === target) {
      setCurrentTab("");
      return;
    }
    setCurrentTab(target);
  };

  const fetchProduct = async (currentBrand: string) => {
    if (currentBrand === "") {
      const { data } = await supabase.from("products").select("*");
      setProductData(data);
      return;
    }

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("brandCode", currentBrand);

    setProductData(data);
  };

  useEffect(() => {
    fetchProduct(currentBrand);
  }, [currentBrand]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center my-10">
        <div className="flex items-center justify-center my-5">
          <select
            className="mx-10"
            name="brandSelect"
            id="brandSelect"
            ref={selectRef}
            onChange={(event) => {
              onChangeBrand(event);
            }}
          >
            <option value="">브랜드 선택</option>
            {brandData.map((option) => (
              <option key={option.id} value={option.brandCode}>
                {option.brandName}
              </option>
            ))}
          </select>
          <ProductManagementTab
            currentTab={currentTab}
            onChangeTab={onChangeTab}
          />
        </div>
        {currentTab === "filtering" && (
          <div>
            <p>조건검색 예정</p>
          </div>
        )}
        {currentTab === "addProduct" && (
          <AddProduct
            brandData={brandData}
            currentBrand={currentBrand}
            selectRef={selectRef}
          />
        )}
        {currentTab === "modifyProduct" && (
          <ModifyProduct
            brandData={brandData}
            currentBrand={currentBrand}
            selectRef={selectRef}
          />
        )}
        {currentTab === "addBrand" && (
          <div>
            <p>브랜드 등록 예정</p>
          </div>
        )}
        {currentTab === "modifyBrand" && (
          <div>
            <p>브랜드 수정 예정</p>
          </div>
        )}
        {currentTab === "deleteBrand" && (
          <div>
            <p>브랜드 삭제 예정</p>
          </div>
        )}
      </div>

      <ProductTable productData={productData} />
    </div>
  );
}
