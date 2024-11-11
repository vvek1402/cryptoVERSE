import { Divider, Title } from "@mantine/core";
import Holdings from "../components/Holdings/Holdings";
import Layout from "../components/Layout/Layout";

const HoldingsLanding = () => {
  return (
    <Layout>
      <Title order={2} ta="center">
        My Holdings
      </Title>
      <Divider my="lg" />
      <Holdings />
    </Layout>
  );
};

export default HoldingsLanding;
