import { Tables } from "@/types/supabase";

export const commonColumn: { key: keyof Tables<"products">; label: string }[] = [
  { key: "barcode", label: "제품 바코드" },
  { key: "koreaName", label: "제품명" },
  { key: "englishName", label: "영문 제품명" },
  { key: "color", label: "색상" },
  { key: "size", label: "크기" },
  { key: "countryOfOrigin", label: "원산지" },
  { key: "countryOfManufacture", label: "제조국" },
  { key: "certificationNumber", label: "인증번호" },
  { key: "minimumAge", label: "사용연령" },
  { key: "brandName", label: "브랜드" },
  { key: "brandCode", label: "브랜드 코드" },
  { key: "managerName", label: "담당자" },
  { key: "managerNumber", label: "담당자 사번" },
  { key: "supplyPrice", label: "입고가" },
  { key: "deliveryPrice", label: "판매가" },
];

export const supplyColumns = [
  { key: "date", label: "입고일자" },
  { key: "quantity", label: "입고 수량" },
  ...commonColumn,
];

export const managementColumns: { key: keyof Tables<"products">; label: string }[] = [
  ...commonColumn,
  { key: "quantity", label: "재고" },
];
