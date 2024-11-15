import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  Group,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import { useHoldingsStore } from "../../store/holdings.store";
import { useCryptoPrices } from "../../utils/helpers";
import { useBalanceStore } from "../../store/balance.store";

export default function AddModal({
  opened,
  selectedCrypto,
  setOpened,
}: {
  opened: boolean;
  selectedCrypto: CryptoSelected;
  setOpened: (bool: boolean) => void;
}) {
  const [amount, setAmount] = useState<number | string>(0);
  const addCoin = useHoldingsStore((state) => state.addCoin);
  const { balance } = useBalanceStore((state) => state);

  const cryptoLivePrice: number =
    useCryptoPrices(selectedCrypto.name.toLowerCase()) ?? 0;
  const quantity = cryptoLivePrice ? Number(amount) / cryptoLivePrice : 0;
  const isButtonDisabled = balance < Number(amount) || Number(amount) <= 0;

  const handlePurchase = () => {
    if (selectedCrypto && Number(amount) > 0) {
      addCoin(
        {
          id: selectedCrypto.id,
          name: selectedCrypto.name,
          quantity: quantity,
          priceUsd: Number(cryptoLivePrice).toFixed(2),
          symbol: selectedCrypto.symbol,
          amountInvested: Number(amount),
        },
        Number(amount)
      );
      setOpened(false);
      setAmount(0);
      notifications.show({
        title: "Success !!",
        message: "Coin Added Successfully",
      });
    }
  };

  const setInvestmentPercentage = (percentage: number) => {
    const investAmount = (balance * percentage) / 100;
    setAmount(investAmount);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text style={{ fontWeight: 600, fontSize: "20px" }}>
          Purchase: {selectedCrypto?.name}
        </Text>
      }
    >
      <Stack m="sm">
        <Stack align="center">
          <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />
          <Text style={{ fontSize: "18px", fontWeight: 500 }}>
            Price: ${cryptoLivePrice}
          </Text>
        </Stack>

        <Divider />

        <NumberInput
          value={amount}
          onChange={setAmount}
          placeholder="Enter amount"
          max={balance}
          hideControls
          min={0}
          styles={{
            input: { height: "48px", fontSize: "16px", padding: "12px" },
          }}
        />
        <Text style={{ fontSize: "16px", fontWeight: 500 }}>
          Quantity: {quantity.toFixed(6)}
        </Text>

        <Divider />

        <Text style={{ fontSize: "16px", fontWeight: 500 }}>
          Available Balance: ${balance}
        </Text>

        <Text style={{ fontSize: "16px", fontWeight: 500 }}>
          Amount to invested:
        </Text>
        <Group p="apart">
          {[10, 25, 50, 100].map((percentage) => (
            <Button
              key={percentage}
              variant="outline"
              onClick={() => setInvestmentPercentage(percentage)}
            >
              {percentage}%
            </Button>
          ))}
        </Group>
        <Divider />

        <Button
          fullWidth
          mt="md"
          onClick={handlePurchase}
          color="teal"
          disabled={isButtonDisabled}
        >
          Purchase
        </Button>
      </Stack>
    </Modal>
  );
}
