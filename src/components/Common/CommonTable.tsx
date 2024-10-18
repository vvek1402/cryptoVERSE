import { ScrollArea, Table } from "@mantine/core";
import { CommonTableProps } from "../../utils/interfaces";

const CommonTable = ({ data } : CommonTableProps) => {
  return (
    <ScrollArea>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            {data.head.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default CommonTable;
