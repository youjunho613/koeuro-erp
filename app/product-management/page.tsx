"use client";

import AddBrand from "@/components/form/AddBrand";
import AddProduct from "@/components/form/AddProduct";
import ModifyBrand from "@/components/form/ModifyBrand";
import ModifyProduct from "@/components/form/ModifyProduct";
import ProductSearchForm from "@/components/form/ProductSearchForm";
import BrandSelect from "@/components/select/BrandSelect";
import ProductManagementTab from "@/components/tab/ProductManagementTab";
import ProductTable from "@/components/table/ProductTable";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import { getFilteredProduct, getProduct } from "../api/product";

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

  const onChangeTab = (target: TTab) => {
    if (currentTab === target) {
      setCurrentTab("");
      return;
    }
    setCurrentTab(target);
  };

  const onChangeBrand: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
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
      <ProductManagementTab currentTab={currentTab} onChangeTab={onChangeTab} />
      {currentTab === "filtering" && <ProductSearchForm setProductList={setProductList} />}
      {currentTab === "addProduct" && <AddProduct />}
      {currentTab === "modifyProduct" && <ModifyProduct setProductList={setProductList} />}
      {currentTab === "addBrand" && <AddBrand />}
      {currentTab === "modifyBrand" && <ModifyBrand />}
      <BrandSelect onChangeBrand={onChangeBrand} />

      <ProductTable productList={productList} />
    </div>
  );
}
