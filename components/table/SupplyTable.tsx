import { getKeyValue } from "@nextui-org/react";
import { supplyColumns } from "./tableColumns";
import TableError from "./TableError";
import { deleteSupply } from "@/app/api/supply";
import { TSupply } from "@/app/warehousing/page";

interface IProps {
  supplyList: TSupply;
}

export default function SupplyTable({ supplyList }: IProps) {
  if (supplyList === null) return <TableError />;

  return (
    <div className="table-base">
      <table className="table">
        <thead>
          <tr>
            {supplyColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {supplyList.map((supply) => (
            <tr key={supply.id}>
              {supplyColumns.map((column) => {
                const currentSupply = { ...supply, ...supply.products, products: undefined };
                return <td key={column.key}>{getKeyValue(currentSupply, column.key)}</td>;
              })}
              <td className="flex items-center justify-center">
                <button
                  onClick={() => {
                    deleteSupply(supply.id);
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
