import { Divider, Text, Title } from "@mantine/core";
import ExchangeTable from "../components/Exchange/ExchangeTable";
import Layout from "../components/Layout/Layout";

const ExchangeLanding = () => {
  return (
    <Layout>
      <Title order={2} ta="center">
        Exchanges
      </Title>
      <Divider my="lg" />

      <ExchangeTable />
    </Layout>
  );
};

export default ExchangeLanding;
