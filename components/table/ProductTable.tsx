import { deleteProduct, getCurrentProduct } from "@/app/api/product";
import { getFilteredRelease } from "@/app/api/release";
import { getFilteredSupply } from "@/app/api/supply";
import { managementColumns } from "@/components/table/tableColumns";
import type { Tables } from "@/types/supabase";
import { toastMessage } from "@/utils/toast/toastMessage";
import { getKeyValue } from "@nextui-org/react";
import TableError from "./TableError";

interface IProps {
  productList: Tables<"products">[] | null;
}

export default function ProductTable({ productList }: IProps) {
  const deleteProductHandler = async (barcode: number) => {
    const currentProduct = await getCurrentProduct(barcode);

    if (currentProduct === null) {
      toastMessage("해당하는 상품이 없습니다", "warn");
      return;
    }

    if (currentProduct.quantity !== 0 && !confirm("재고가 있는 상품입니다 삭제하시겠습니까?")) {
      return;
    }

    const supplyList = await getFilteredSupply(barcode);
    const releaseList = await getFilteredRelease(barcode);

    if (
      confirm(`
입고 (${supplyList?.length})건, 출고 (${releaseList?.length})건이 있습니다.
삭제 (내역포함) 하시겠습니까?`)
    ) {
      deleteProduct(barcode);
    }
  };

  if (productList === null) return <TableError />;

  return (
    <div className="table-base">
      <table className="table">
        <thead>
          <tr>
            {managementColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.barcode}>
              {managementColumns.map((column) => (
                <td key={column.key}>{getKeyValue(product, column.key)}</td>
              ))}
              <td key={product.barcode}>{product.isSelling ? "판매중" : "미판매"}</td>
              <td className="flex items-center justify-center">
                <button
                  onClick={() => {
                    deleteProductHandler(product.barcode);
                  }}
                  className="m-1 delete-button small-button"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
