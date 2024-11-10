import { Text } from "@mantine/core";
import CryptoTable from "../components/Crypto/CryptoTable";
import Layout from "../components/Layout/Layout";

const CryptoLanding = () => {
  return (
    <>
      <Layout>
        <Text ta="center" size="xl" mb="20px" fw="700">
          Cryptocurrency Prices
        </Text>
        <CryptoTable />
      </Layout>
    </>
  );
};

export default CryptoLanding;
