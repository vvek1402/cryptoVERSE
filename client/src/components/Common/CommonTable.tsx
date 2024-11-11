import { Card, ScrollArea, Table } from "@mantine/core";
import { CommonTableProps } from "../../utils/interfaces";

const CommonTable = ({ data } : CommonTableProps) => {
  return (
    <ScrollArea>
      <Card withBorder padding="xl" radius="md" mt={20}>
        <Table striped highlightOnHover data={data} />
      </Card>
    </ScrollArea>
  );
};

export default CommonTable;
