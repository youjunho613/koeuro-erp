"use client";

import AddProduct from "@/components/form/AddProduct";
import ModifyProduct from "@/components/form/ModifyProduct";
import ProductSearchForm from "@/components/form/ProductSearchForm";
import ProductManagementTab from "@/components/tab/ProductManagementTab";
import ProductTable from "@/components/table/ProductTable";
import SubTitle from "@/components/typography/SubTitle";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { getFilteredProduct, getProduct } from "../api/product";

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
  const [productList, setProductList] = useState<Tables<"products">[] | null>(null);

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

  useEffect(() => {
    const fetchProduct = async (currentBrand: string) => {
      if (currentBrand === "") {
        const data = await getProduct();
        setProductList(data);
        return;
      } else {
        const data = await getFilteredProduct(currentBrand);
        setProductList(data);
      }
    };
    fetchProduct(currentBrand);
  }, [currentBrand, setProductList]);

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="상품 관리" />
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
          <ProductManagementTab currentTab={currentTab} onChangeTab={onChangeTab} />
        </div>
        {currentTab === "filtering" && <ProductSearchForm setProductList={setProductList} />}
        {currentTab === "addProduct" && (
          <AddProduct brandData={brandData} currentBrand={currentBrand} selectRef={selectRef} />
        )}
        {currentTab === "modifyProduct" && <ModifyProduct setProductList={setProductList} brandData={brandData} />}
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

      <ProductTable productList={productList} />
    </div>
  );
}
