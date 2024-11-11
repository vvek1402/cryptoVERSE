import { Divider, Title } from "@mantine/core";
import Layout from "../components/Layout/Layout";
import OrdersTable from "../components/Orders/Orders";

const OrdersLanding = () => {
  return (
    <Layout>
      <Title order={2} ta="center">
        Orders
      </Title>
      <Divider my="lg" />
      <OrdersTable />
    </Layout>
  );
};

export default OrdersLanding;
