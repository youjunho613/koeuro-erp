"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

export default function SupplyTable() {
  const data = [
    {
      id: 1,
      date: "2024/01/02",
      brandName: "부코스키",
      brandCode: "bukowski",
      name: "홍길동",
      number: 125,
      barcode: 123456789012,
      quantity: 20,
      supplyPrice: 50000,
      deliveryPrice: 60000,
    },
    {
      id: 2,
      date: "2024/01/03",
      brandName: "부코스키",
      brandCode: "bukowski",
      name: "홍길동",
      number: 125,
      barcode: 123456789013,
      quantity: 15,
      supplyPrice: 45000,
      deliveryPrice: 50000,
    },
  ];
  const columns = [
    { key: "date", label: "입고일자" },
    { key: "brandName", label: "브랜드" },
    { key: "brandCode", label: "브랜드 코드" },
    { key: "name", label: "담당자" },
    { key: "number", label: "담당자 사번" },
    { key: "barcode", label: "제품 바코드" },
    { key: "quantity", label: "입고 수량" },
    { key: "supplyPrice", label: "입고가" },
    { key: "deliveryPrice", label: "판매가" },
  ];
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>{(columnsKey) => <TableCell>{getKeyValue(item, columnsKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
