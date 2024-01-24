import { getKeyValue } from "@nextui-org/react";
import { managementColumns } from "@/components/table/tableColumns";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";
import TableError from "./TableError";

interface IProps {
  productData: Tables<"products">[] | null;
}

export default function ProductTable({ productData }: IProps) {
  const deleteProduct = async (barcode: number) => {
    const { error } = await supabase.from("products").delete().eq("barcode", barcode);

    if (!!error) {
      toastMessage(error.message, "error");
    }
  };

  const deleteProductHandler = async (barcode: number) => {
    const { data: currentProduct } = await supabase.from("products").select("*").eq("barcode", barcode).single();

    if (currentProduct === null) {
      toastMessage("해당하는 상품이 없습니다", "warn");
      return;
    }

    if (currentProduct.quantity !== 0 && !confirm("재고가 있는 상품입니다 삭제하시겠습니까?")) {
      return;
    }

    deleteProduct(barcode);
  };

  if (productData === null) return <TableError />;

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
          {productData.map((product) => (
            <tr key={product.barcode}>
              {managementColumns.map((column) => (
                <td key={column.key}>{getKeyValue(product, column.key)}</td>
              ))}
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
