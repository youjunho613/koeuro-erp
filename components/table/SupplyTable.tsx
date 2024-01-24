"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { supplyColumns } from "./tableColumns";

export default function SupplyTable() {
  const data = [
    {
      id: 1,
      date: "2024/01/02",
      brandName: "부코스키",
      brandCode: "bukowski",
      managerName: "홍길동",
      managerNumber: 125,
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
      managerName: "홍길동",
      managerNumber: 125,
      barcode: 123456789013,
      quantity: 15,
      supplyPrice: 45000,
      deliveryPrice: 50000,
    },
  ];

  return (
    <Table>
      <TableHeader columns={supplyColumns}>
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
