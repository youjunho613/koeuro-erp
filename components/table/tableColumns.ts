export const commonColumn = [
  { key: "brandName", label: "브랜드" },
  { key: "brandCode", label: "브랜드 코드" },
  { key: "managerName", label: "담당자" },
  { key: "managerNumber", label: "담당자 사번" },
  { key: "barcode", label: "제품 바코드" },
  { key: "supplyPrice", label: "입고가" },
  { key: "deliveryPrice", label: "판매가" },
];

export const supplyColumns = [
  { key: "date", label: "입고일자" },
  { key: "quantity", label: "입고 수량" },
  ...commonColumn,
];

export const managementColumns = [
  ...commonColumn,
  { key: "quantity", label: "재고" },
];
