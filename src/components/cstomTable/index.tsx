import React from "react";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const antIcon = (
  <Loading3QuartersOutlined style={{ fontSize: 50, color: "#0755E9" }} spin />
);

interface CustomTableProps {
  titles?: React.ReactNode[];
  data?: React.ReactNode[][];
  handleGoToDetail?: (id: any) => void;
  height?: string | number;
  show?: string;
  isFetching?: boolean;
  titleswidth?: string;
  datawidth?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  titles,
  data,
  handleGoToDetail,
  height,
  datawidth,
  titleswidth,
  show,
  isFetching,
}) => {
  return (
    <div
      style={{ height: height ? height : "auto" }}
      className="flex-1 w-full "
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 min-w-200 rounded-xl">
          <thead className="sticky top-0 z-10 h-14 ">
            <tr>
              {titles?.map((title, index) => (
                <th
                  style={{ width: titleswidth }}
                  key={index}
                  className="border-b border-primary px-5 py-2 text-[12px] font-medium text-heading text-left"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td
                  colSpan={titles?.length || 7}
                  className="py-5 text-center text-light"
                >
                  <Spin indicator={antIcon} />
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-[#E5EBF7] h-14 hover:text-black"
                  style={{ cursor: show ? show : "pointer", width: datawidth }}
                  onClick={() => handleGoToDetail?.(row)}
                >
                  {row.map((cell: any, colIndex: number) =>
                    cell !== null ? (
                      <td
                        key={colIndex}
                        className="px-5 py-2 border-b-[0.5px] border-primary text-[13px] font-normal text-heading"
                      >
                        {cell}
                      </td>
                    ) : null,
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={titles?.length || 7}
                  className="px-3 py-6 text-center text-heading"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
