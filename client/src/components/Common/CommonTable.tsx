import { ScrollArea, Table } from "@mantine/core";
import { CommonTableProps } from "../../utils/interfaces";

const CommonTable = ({ data } : CommonTableProps) => {
  return (
    <ScrollArea>
      <Table striped highlightOnHover data={data} />
    </ScrollArea>
  );
};

export default CommonTable;
