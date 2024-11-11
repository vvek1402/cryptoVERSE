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
import AddModal from "../../Holdings/AddModal";
import { CryptoSelected } from "../../../utils/interfaces";
import {
  IconBasketPlus,
  IconBookmark,
  IconExternalLink,
  IconLink,
} from "@tabler/icons-react";
import useWatchlistStore from "../../../store/watchlist.store";
import { notifications } from "@mantine/notifications";

const CryptoDetail = () => {
  const { id } = useParams() as { id: string };
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
  });
  const { addCoin, removeCoin, isInWatchlist } = useWatchlistStore(
    (state) => state
  );

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

  const handleWatchlistClick = (crypto: CryptoSelected) => {
    if (isInWatchlist(crypto.id)) {
      removeCoin(crypto.id);
      notifications.show({
        title: "Success !!",
        message: "Coin Removed From Watchlist Successfully",
      });
    } else {
      addCoin(crypto.id, crypto.name);

      notifications.show({
        title: "Success !!",
        message: "Coin Added to Watchlist Successfully",
      });
    }
  };

  return (
    <>
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
          <Button
            onClick={() => handleWatchlistClick(details)}
            color={isInWatchlist(details.id) ? "teal" : ""}
          >
            <IconBookmark />
          </Button>
          <Button onClick={() => handlePurchaseClick(details)}>
            <IconBasketPlus />
          </Button>
          <Button component={Link} to={details.explorer} target="_blank">
            <IconExternalLink />
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
    </>
  );
};

export default CryptoDetail;
