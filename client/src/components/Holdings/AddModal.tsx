import { Button, Modal, NumberInput, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import { useHoldingsStore } from "../../store/holdings.store";
import { useCryptoPrices } from "../../utils/helpers";
import { useBalanceStore } from "../../store/balance.store";
import { IconCoin } from "@tabler/icons-react";

export default function AddModal({
  opened,
  selectedCrypto,
  setOpened,
}: {
  opened: boolean;
  selectedCrypto: CryptoSelected;
  setOpened: (bool: boolean) => void;
}) {
  const [quantity, setQuantity] = useState<any>(0);
  const addCoin = useHoldingsStore((state) => state.addCoin);
  const { balance } = useBalanceStore((state) => state);

  let cyptoLivePrice: any =
    useCryptoPrices(selectedCrypto.name.toLowerCase()) ?? 0;
  let totalCost = quantity * cyptoLivePrice;
  let isButtonDisabled = balance < totalCost || quantity <= 0;

  const handlePurchase = () => {
    if (selectedCrypto && quantity > 0) {
      addCoin(
        {
          id: selectedCrypto.id,
          name: selectedCrypto.name,
          amount: quantity,
          priceUsd: cyptoLivePrice,
          symbol: selectedCrypto.symbol,
        },
        totalCost
      );
      setOpened(false);
      setQuantity(0);
      notifications.show({
        title: "Success !!",
        message: "Coin Added Successfully",
      });
    }
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
            Price: ${cyptoLivePrice}
          </Text>
        </Stack>


        <NumberInput
          defaultValue={quantity}
          onChange={setQuantity}
          placeholder="Enter quantity"
          max={10000}
          min={0}
          styles={{
            input: { height: "48px", fontSize: "16px", padding: "12px" },
          }}
        />
        <Text style={{ fontSize: "16px", fontWeight: 500 }}>
          Available Balance: ${balance}
        </Text>
        <Text style={{ fontSize: "16px", fontWeight: 500 }}>
          Required Balance: ${totalCost}
        </Text>

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
