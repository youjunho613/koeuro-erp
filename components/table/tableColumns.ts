import { Tables } from "@/types/supabase";

interface Column {
  key: keyof Tables<"products"> | keyof Tables<"receiving">;
  label: string;
}

const commonColumns: Column[] = [
  { key: "barcode", label: "제품 바코드" },
  { key: "koreaName", label: "제품명" },
  { key: "englishName", label: "영문 제품명" },
];

const quantityColumn: Column[] = [{ key: "quantity", label: "수량" }];

const brandSpecColumn: Column[] = [
  { key: "brandName", label: "브랜드" },
  { key: "brandCode", label: "브랜드 코드" },
];

const productSpecColumn: Column[] = [
  { key: "color", label: "색상" },
  { key: "size", label: "크기" },
  { key: "countryOfOrigin", label: "원산지" },
  { key: "countryOfManufacture", label: "제조국" },
  { key: "certificationNumber", label: "인증번호" },
  { key: "minimumAge", label: "사용연령" },
];
const priceColumn: Column[] = [
  { key: "supplyPrice", label: "입고가" },
  { key: "deliveryPrice", label: "판매가" },
];

const productColumn: Column[] = [
  ...commonColumns,
  ...productSpecColumn,
  ...brandSpecColumn,
  { key: "managerName", label: "담당자" },
  ...priceColumn,
];

export const supplyColumns: Column[] = [
  { key: "receiving_date", label: "입고일자" },
  { key: "quantity", label: "입고 수량" },
  ...commonColumns,
  ...brandSpecColumn,
];

export const managementColumns: Column[] = [...productColumn, ...quantityColumn];
