"use client";

import { getKeyValue } from "@nextui-org/react";
import { versionColumns, versionData } from "./version.const";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-11/12">
      <table className="w-full h-auto min-w-full table-auto">
        <thead>
          <tr className="rounded-lg outline-none">
            {versionColumns.map((column) => (
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
          {versionData.map((item) => (
            <tr key={item.id} className="outline-none">
              {versionColumns.map((column) => (
                <td key={column.key} className="px-3 py-2 font-normal align-middle outline-none text-small">
                  {getKeyValue(item, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
