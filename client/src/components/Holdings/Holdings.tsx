import React, { useState, useMemo } from "react";
import {
  Button,
  Modal,
  Text,
  Group,
  Paper,
  SimpleGrid,
  NumberInput,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useHoldingsStore } from "../../store/holdings.store";
import Layout from "../Layout/Layout";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import { useCryptoPrices } from "../../utils/helpers";

const Holdings = () => {
  const { coins, removeCoin } = useHoldingsStore();
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
    amount: 0,
  });
  const [sellQuantity, setSellQuantity] = useState<any>(1);
  let cyptoLivePrice: any =
    useCryptoPrices(selectedCrypto.name.toLowerCase()) ?? 0;

  const totalValue = useMemo(() => {
    return coins.reduce(
      (acc, coin: any) => acc + coin.amount * coin.priceUsd,
      0
    );
  }, [coins]);

  const handleSell = () => {
    if (selectedCrypto && sellQuantity > 0) {
      removeCoin(
        selectedCrypto.id,
        sellQuantity,
        sellQuantity * cyptoLivePrice
      );
      setOpened(false);
      setSellQuantity(0);
      notifications.show({
        title: "Success !!",
        message: "Coin Selled Successfully",
      });
    }
  };

  const handleSellClick = (coin: CryptoSelected) => {
    setSelectedCrypto(coin);
    setOpened(true);
  };

  return (
    <Layout>
      <Text ta="center" size="xl" mb="20px" fw="700">
        My Holdings
      </Text>

      <SimpleGrid cols={{ sm: 1, md: 2, lg: 4 }}>
        {coins.map((coin: any) => {
          const totalCoinValue = (coin.amount * coin.priceUsd).toFixed(2);
          return (
            <Paper withBorder p="md" radius="md" key={coin.name}>
              <Stack m="sm">
                <Stack align="center">
                  <CoinIcon src={coin?.symbol} alt={coin?.name} />
                  <Text>{coin.name}</Text>
                  <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                    Quantity: {coin.amount}
                  </Text>
                  <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                    Current Price (USD): ${coin.priceUsd}{" "}
                  </Text>
                  <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                    Total Value: ${totalCoinValue}
                  </Text>
                </Stack>

                <Button
                  color="red"
                  fullWidth
                  mt="md"
                  onClick={() => handleSellClick(coin)}
                >
                  Sell
                </Button>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>

      <Paper withBorder style={{ padding: "20px" }} radius="md" mt="xl">
        <Text ta="center" fw={700} size="lg">
          Overall Total
        </Text>
        <Text ta="center" size="xl" color="blue" mt="sm">
          ${totalValue.toFixed(2)}
        </Text>
      </Paper>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Sell : ${selectedCrypto?.name}`}
      >
        <Stack m="sm">
          <Stack align="center">
            <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />
            <Text style={{ fontSize: "18px", fontWeight: 500 }}>
              Price: ${cyptoLivePrice}
            </Text>
          </Stack>
          <NumberInput
            defaultValue={sellQuantity}
            onChange={setSellQuantity}
            placeholder="Enter quantity to sell"
            max={selectedCrypto?.amount}
            min={0}
          />
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity Available: {selectedCrypto?.amount}
          </Text>

          <Button fullWidth mt="md" onClick={handleSell}>
            Sell
          </Button>
        </Stack>
      </Modal>
    </Layout>
  );
};

export default Holdings;
