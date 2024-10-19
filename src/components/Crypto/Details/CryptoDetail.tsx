import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  Center,
  Grid,
  Col,
  Title,
  Button,
  Group,
  Flex,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";
import { fetchCryptoDetails } from "../../../services/APIService";
import Layout from "../../Layout/Layout";
import { Stats } from "./Stats";
import MarketTable from "./MarketTable";
import CoinIcon from "../../Common/CoinIcon";
import { useState } from "react";
import AddModal from "../../Wallet/AddModal";
import { CryptoSelected } from "../../../utils/interfaces";

const CryptoDetail = () => {
  const { id } = useParams() as { id: string };
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
  });

  const { data: details, isLoading: loadingDetails } = useQuery(
    ["cryptoDetails", { id }],
    fetchCryptoDetails,
    {
      enabled: !!id,
    }
  )

  if (loadingDetails) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  const handlePurchaseClick = (crypto: CryptoSelected) => {
    setSelectedCrypto(crypto);
    setOpened(true);
  };

  return (
    <>
      <Layout>
        <Title align="center" style={{ marginBottom: "30px" }}>
          <CoinIcon src={details.symbol} alt={details.name} />
          {"  "}
          {details.name} ({details.symbol})
        </Title>
        <Flex justify="flex-end">
          <Group style={{ marginBottom: "20px" }}>
            <Button onClick={() => handlePurchaseClick(details)}>
              Purchase
            </Button>
            <Button component={Link} to={details.explorer} target="_blank">
              Explore
            </Button>
          </Group>
        </Flex>
        <Stats details={details} />
        <Grid gutter="xl">
          <Col span={12} md={12}>
            <Chart />
          </Col>
          <Col span={12} md={12}>
            <MarketTable />
          </Col>
        </Grid>
        <AddModal
          opened={opened}
          selectedCrypto={selectedCrypto}
          setOpened={setOpened}
        />
      </Layout>
    </>
  );
};

export default CryptoDetail;
