import React, { useState } from "react";
import {
  Modal,
  Text,
  SimpleGrid,
  NumberInput,
  Stack,
  Button,
  Group,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useHoldingsStore } from "../../store/holdings.store";
import HoldingCard from "./HoldingCard";
import { CryptoSelected } from "../../utils/interfaces";
import { useCryptoPrices } from "../../utils/helpers";
import CoinIcon from "../Common/CoinIcon";

const Holdings = () => {
  const { coins, removeCoin } = useHoldingsStore();
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
    quantity: 0,
  });
  const [sellQuantity, setSellQuantity] = useState<number>(0);

  const cyptoLivePrice =
    useCryptoPrices(selectedCrypto.name.toLowerCase()) ?? 0;

  const handleSell = () => {
    if (selectedCrypto && sellQuantity > 0) {
      removeCoin(
        {
          id: selectedCrypto.id,
          name: selectedCrypto.name,
          quantity: selectedCrypto.quantity,
          priceUsd: Number(cyptoLivePrice).toFixed(2),
          symbol: selectedCrypto.symbol,
        },
        sellQuantity,
        sellQuantity * cyptoLivePrice
      );
      setOpened(false);
      setSellQuantity(0);
      notifications.show({
        title: "Success!",
        message: "Coin sold successfully",
      });
    }
  };

  const handleSellClick = (coin: CryptoSelected) => {
    setSelectedCrypto(coin);
    setOpened(true);
  };

  const setSellPercentage = (percentage: number) => {
    const sellAmount = (Number(selectedCrypto.quantity) * percentage) / 100;
    setSellQuantity(sellAmount);
  };

  return (
    <>
      <SimpleGrid cols={{ sm: 1, md: 2, lg: 4 }}>
        {coins.map((coin) => (
          <HoldingCard
            key={coin.name}
            coin={coin}
            handleSellClick={handleSellClick}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Sell: ${selectedCrypto?.name}`}
      >
        <Stack m="sm">
          <Stack align="center">
            <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />
            <Text style={{ fontSize: "18px", fontWeight: 500 }}>
              Price: ${cyptoLivePrice}
            </Text>
          </Stack>
          <NumberInput
            value={sellQuantity}
            hideControls
            onChange={(val) => setSellQuantity(Number(val))}
            placeholder="Enter quantity to sell"
            max={selectedCrypto.quantity}
          />

          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity Available: {selectedCrypto?.quantity}
          </Text>

          <Divider />

          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity To Sell:
          </Text>
          <Group p="apart">
            {[10, 25, 50, 100].map((percentage) => (
              <Button
                key={percentage}
                variant="outline"
                onClick={() => setSellPercentage(percentage)}
              >
                {percentage}%
              </Button>
            ))}
          </Group>
          <Divider />
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Total Value: ${cyptoLivePrice * Number(sellQuantity)}
          </Text>
          <Button fullWidth mt="md" color="red" onClick={handleSell}>
            Sell
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Holdings;
