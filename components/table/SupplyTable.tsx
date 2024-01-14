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
    <>
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
      <table className="supply-table">
        <caption>입고 관리</caption>
        <thead>
          <tr>
            <th scope="col">입고일자</th>
            <th scope="col">브랜드</th>
            <th scope="col">브랜드 코드</th>
            <th scope="col">담당자</th>
            <th scope="col">담당자 사번</th>
            <th scope="col">제품 바코드</th>
            <th scope="col">입고 수량</th>
            <th scope="col">입고가</th>
            <th scope="col">판매가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th aria-label="입고일자" scope="row">
              2024/01/02
            </th>
            <td aria-label="브랜드">부코스키</td>
            <td aria-label="브랜드 코드">bukowski</td>
            <td aria-label="담당자">홍길동</td>
            <td aria-label="담당자 사번">0125</td>
            <td aria-label="제품 바코드">123456789012</td>
            <td aria-label="입고 수량">20</td>
            <td aria-label="입고가">45000</td>
            <td aria-label="판매가">60000</td>
          </tr>
          <tr>
            <th scope="row">2024/01/02</th>
            <td>부코스키</td>
            <td>bukowski</td>
            <td>홍길동</td>
            <td>0125</td>
            <td>123456789012</td>
            <td>20</td>
            <td>50000</td>
            <td>60000</td>
          </tr>
          <tr>
            <th scope="row">2024/01/02</th>
            <td>부코스키</td>
            <td>bukowski</td>
            <td>홍길동</td>
            <td>0125</td>
            <td>123456789012</td>
            <td>20</td>
            <td>30000</td>
            <td>40000</td>
          </tr>
          <tr>
            <th scope="row">2024/01/02</th>
            <td>부코스키</td>
            <td>bukowski</td>
            <td>홍길동</td>
            <td>0125</td>
            <td>123456789012</td>
            <td>30</td>
            <td>45000</td>
            <td>60000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2}>
              Total albums
            </th>
            <td colSpan={2}>77</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
