"use client";

import { managementColumns } from "@/components/table/tableColumns";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const brandData = [
  { id: 1, brandName: "부코스키", brandCode: "bukowski" },
  { id: 2, brandName: "아스트라", brandCode: "astra" },
  { id: 3, brandName: "노베", brandCode: "nowe" },
];

interface IProductInput {
  barcode: number;
  supplyPrice: number;
  deliveryPrice: number;
}

export default function Page() {
  const [currentBrand, setCurrentBrand] = useState("");
  const [productData, setProductData] = useState<Tables<"products">[] | null>(
    null
  );

  const { register, handleSubmit } = useForm<IProductInput>();

  const selectRef = useRef<HTMLSelectElement>(null);

  const onChangeBrand: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentBrand(event.target.value);
  };

  const fetchProduct = async () => {
    const { data } = await supabase.from("products").select("*");

    setProductData(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const addProduct = handleSubmit(async (data) => {
    if (currentBrand === "" && selectRef.current !== null) {
      selectRef.current.focus();
      alert("브랜드를 선택하세요");
      return;
    }

    const brandName = brandData.find(
      (brand) => brand.brandCode === currentBrand
    )?.brandName;

    if (brandName === undefined) return;

    const managerName = "홍길동";
    const managerNumber = 0;

    const { data: supabaseData, error } = await supabase
      .from("products")
      .insert([
        {
          ...data,
          brandCode: currentBrand,
          brandName,
          managerName,
          managerNumber,
          quantity: 0,
        },
      ]);
    console.log("error :", error);
    console.log("supabaseData :", supabaseData);
    alert("상품이 등록되었습니다");
  });

  const deleteProduct = () => {};
  const modifyProduct = () => {};
  const addBrand = () => {};
  const deleteBrand = () => {};
  const modifyBrand = () => {};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-10 my-10">
        <select
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
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          상품등록
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          상품수정
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          상품삭제
        </button>
      </div>
      <div>
        <form onSubmit={addProduct} className="flex flex-col gap-4 p-10 border">
          <label className="flex gap-2" htmlFor="barcode">
            입고가
            <input
              className="text-right"
              {...register("supplyPrice")}
              type="text"
              id="supplyPrice"
              defaultValue={0}
            />
          </label>
          <label className="flex gap-2" htmlFor="barcode">
            판매가
            <input
              {...register("deliveryPrice")}
              className="text-right"
              type="text"
              id="deliveryPrice"
              defaultValue={0}
            />
          </label>
          <label className="flex gap-2" htmlFor="barcode">
            바코드
            <input {...register("barcode")} type="text" id="barcode" />
          </label>
          <button type="submit">등록</button>
          <button type="reset">초기화</button>
        </form>
      </div>
      <div>
        {productData === null ? (
          <p>데이터 비어있음</p>
        ) : (
          <Table>
            <TableHeader columns={managementColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={productData}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnsKey) => (
                    <TableCell>{getKeyValue(item, columnsKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-center gap-10 my-10">
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          브랜드 등록
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          브랜드 수정
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-red-300 rounded-xl hover:bg-amber-200">
          브랜드 삭제
        </button>
      </div>
    </div>
  );
}
