import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  Center,
  Grid,
  Title,
  Button,
  Group,
  Flex,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";
import { fetchCryptoDetails } from "../../../services/CryptoAPIService";
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
  );

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
        <Center>
          <Group mb="30px" ta="center" mx="auto">
            <CoinIcon src={details.symbol} alt={details.name} />
            <Title>
              {details.name} ({details.symbol})
            </Title>
          </Group>
        </Center>
        <Flex justify="flex-end">
          <Group mb="20px">
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
          <Grid.Col span={12}>
            <Chart />
          </Grid.Col>
          <Grid.Col span={12}>
            <MarketTable />
          </Grid.Col>
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
