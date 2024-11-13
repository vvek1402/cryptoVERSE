// Holdings.js
import React, { useState, useMemo } from "react";
import {
  Modal,
  Text,
  SimpleGrid,
  NumberInput,
  Stack,
  Button,
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
  const [sellQuantity, setSellQuantity] = useState<number | string>(1);

  let cyptoLivePrice: number =
    useCryptoPrices(selectedCrypto.name.toLowerCase()) ?? 0;
  const handleSell = () => {
    if (selectedCrypto && Number(sellQuantity) > 0) {
      removeCoin(
        {
          id: selectedCrypto.id,
          name: selectedCrypto.name,
          quantity: selectedCrypto.quantity,
          priceUsd: Number(cyptoLivePrice).toFixed(2),
          symbol: selectedCrypto.symbol,
        },
        Number(sellQuantity),
        Number(sellQuantity) * cyptoLivePrice
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
        title={`Sell : ${selectedCrypto?.name}`}
      >
        <Stack m="sm">
          <Stack align="center">
            <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />
            <Text style={{ fontSize: "18px", fontWeight: 500 }}>
              Price: ${cyptoLivePrice}
            </Text>
          </Stack>{" "}
          <NumberInput
            defaultValue={sellQuantity}
            onChange={setSellQuantity}
            placeholder="Enter quantity to sell"
            max={selectedCrypto?.quantity}
            min={0}
          />
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity Available: {selectedCrypto?.quantity}
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
