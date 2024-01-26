import { TRelease } from "@/app/delivery/page";
import TableError from "./TableError";
import { releaseColumns } from "./tableColumns";
import { getKeyValue } from "@nextui-org/react";
import { deleteRelease } from "@/app/api/release";
import { TablesInsert } from "@/types/supabase";

interface IProps {
  releaseList: TRelease;
}
export default function ReleaseTable({ releaseList }: IProps) {
  if (releaseList === null) return <TableError />;

  return (
    <div className="table-base">
      <table className="table">
        <thead>
          <tr>
            {releaseColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {releaseList.map((supply) => (
            <tr key={supply.id}>
              {releaseColumns.map((column) => {
                const currentSupply = { ...supply, ...supply.products, products: undefined };
                return <td key={column.key}>{getKeyValue(currentSupply, column.key)}</td>;
              })}
              <td className="flex items-center justify-center">
                <button
                  onClick={() => {
                    deleteRelease(supply.id as Pick<TablesInsert<"releasing">, "id">);
                  }}
                  className="h-auto m-1 delete-button small-button"
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
