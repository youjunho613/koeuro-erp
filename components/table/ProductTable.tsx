import { getKeyValue } from "@nextui-org/react";
import { managementColumns } from "@/components/table/tableColumns";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

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

  const onDelete = async (barcode: number) => {
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

  if (productData === null) return <p>데이터가 없습니다.</p>;

  return (
    <div className="flex justify-between w-full gap-4 p-4 bg-white rounded-lg shadow-small">
      <table className="w-full h-auto min-w-full table-auto">
        <thead>
          <tr className="rounded-lg outline-none">
            {managementColumns.map((column) => (
              <th
                key={column.key}
                className="h-10 px-3 font-semibold text-left text-foreground-500 text-tiny bg-default-100 first:rounded-l-lg last:rounded-r-lg"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.barcode} className="outline-none">
              {managementColumns.map((column) => (
                <td key={column.key} className="px-3 py-2 font-normal align-middle outline-none text-small">
                  {getKeyValue(product, column.key)}
                </td>
              ))}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    onDelete(product.barcode);
                  }}
                  className="px-2 py-1 mx-1 my-1 align-middle rounded-lg bg-rose-300"
                >
                  삭제
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
