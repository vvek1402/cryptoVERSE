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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useWalletStore } from "../../store/wallet.store";
import Layout from "../Layout/Layout";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import { formatValueToUsd } from "../../utils/helpers";

const Wallet = () => {
  const { coins, removeCoin } = useWalletStore();
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
    amount: 0,
  });
  const [sellQuantity, setSellQuantity] = useState(1);

  const totalValue = useMemo(() => {
    return coins.reduce((acc, coin : any) => acc + coin.amount * coin.priceUsd, 0);
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
      <Text
        align="center"
        weight={600}
        size="xl"
        style={{ marginBottom: "20px" }}
      >
        My Wallet
      </Text>

      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 980, cols: 2 },
          { maxWidth: 600, cols: 1 },
        ]}
      >
        {coins.map((coin : any) => {
          const totalCoinValue = (coin.amount * coin.priceUsd).toFixed(2);
          return (
            <Paper withBorder p="md" radius="md" key={coin.name}>
              <CoinIcon src={coin?.symbol} alt={coin?.name} />

              <Group position="apart" style={{ marginBottom: 5 }}>
                <Text weight={500}>{coin.name}</Text>
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
        <Text size="lg" weight={600} align="center">
          Overall Wallet Total
        </Text>
        <Text size="xl" color="blue" align="center" weight={700} mt="sm">
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
          onChange={(val : number) => setSellQuantity(val)}
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

export default Wallet;
