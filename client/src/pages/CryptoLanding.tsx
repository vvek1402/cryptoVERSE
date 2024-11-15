import { Divider, Title } from "@mantine/core";
import CryptoTable from "../components/Crypto/CryptoTable";
import Layout from "../components/Layout/Layout";

const CryptoLanding = () => {
  return (
    <>
      <Layout>
        <Title ta="center" order={2}>
          Cryptocurrency Prices
        </Title>
        <Divider my="lg" />
        <CryptoTable type="crypto" />
      </Layout>
    </>
  );
};

export default CryptoLanding;
