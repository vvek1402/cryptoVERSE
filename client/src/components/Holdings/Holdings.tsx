import React, { useState, useMemo } from "react";
import {
  Button,
  Modal,
  Input,
  Text,
  Badge,
  Group,
  Paper,
  SimpleGrid,
  NumberInput,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useHoldingsStore } from "../../store/holdings.store";
import Layout from "../Layout/Layout";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import { formatValueToUsd } from "../../utils/helpers";

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
  const [sellQuantity, setSellQuantity] = useState<number>(1);

  const totalValue = useMemo(() => {
    return coins.reduce(
      (acc, coin: any) => acc + coin.amount * coin.priceUsd,
      0
    );
  }, [coins]);

  const handleSell = () => {
    if (selectedCrypto && sellQuantity > 0) {
      removeCoin(selectedCrypto.id, sellQuantity);
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
              <CoinIcon src={coin?.symbol} alt={coin?.name} />

              <Group style={{ marginBottom: 5 }}>
                <Text>{coin.name}</Text>
              </Group>
              <Text>
                Quantity:{" "}
                <Badge color="blue" size="xl">
                  {coin.amount}
                </Badge>
              </Text>
              <Text>
                Price (USD):{" "}
                <Badge color="green" size="xl">
                  ${formatValueToUsd(coin.priceUsd)}
                </Badge>
              </Text>
              <Text>
                Total Value:{" "}
                <Badge color="violet" size="xl">
                  ${formatValueToUsd(totalCoinValue)}
                </Badge>
              </Text>
              <Button
                color="red"
                fullWidth
                mt="md"
                onClick={() => handleSellClick(coin)}
              >
                Sell
              </Button>
            </Paper>
          );
        })}
      </SimpleGrid>

      <Paper
        withBorder
        style={{ padding: "20px" }}
        shadow="lg"
        radius="md"
        mt="xl"
      >
          <Text ta="center" fw={700} size="lg">Overall Total</Text>
          <Text ta="center" size="xl" color="blue" mt="sm">
            ${formatValueToUsd(totalValue.toFixed(2))}
          </Text>
      </Paper>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Sell : ${selectedCrypto?.name}`}
      >
        <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />

        <Text>Quantity Available: {selectedCrypto?.amount}</Text>
        <NumberInput
          defaultValue={sellQuantity}
          onChange={(val: number) => setSellQuantity(val)}
          placeholder="Enter quantity to sell"
          max={selectedCrypto?.amount}
          min={0}
        />
        <Button fullWidth mt="md" onClick={handleSell}>
          Sell
        </Button>
      </Modal>
    </Layout>
  );
};

export default Holdings;
