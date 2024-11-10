import { Button, Modal, NumberInput, Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import CoinIcon from "../Common/CoinIcon";
import { CryptoSelected } from "../../utils/interfaces";
import CryptoPrice from "../Common/CryptoPrice";
import { useHoldingsStore } from "../../store/holdings.store";

export default function AddModal({
  opened,
  selectedCrypto,
  setOpened,
}: {
  opened: boolean;
  selectedCrypto: CryptoSelected;
  setOpened: (bool: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(0);
  const addCoin = useHoldingsStore((state) => state.addCoin);

  const handlePurchase = () => {
    if (selectedCrypto && quantity > 0) {
      addCoin({
        id: selectedCrypto.id,
        name: selectedCrypto.name,
        amount: quantity,
        priceUsd: parseFloat(selectedCrypto.priceUsd).toFixed(2),
        symbol: selectedCrypto.symbol,
      });
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
      title={`Purchase : ${selectedCrypto?.name}`}
    >
      <CoinIcon src={selectedCrypto?.symbol} alt={selectedCrypto?.name} />
      <Text>
        Price:{" "}
        {selectedCrypto?.name ? (
          <CryptoPrice assets={[(selectedCrypto.name.toLowerCase())]} defaultPrice={selectedCrypto?.priceUsd} />
        ) : (
          ""
        )}
      </Text>
      <NumberInput
        defaultValue={quantity}
        onChange={(val: number) => setQuantity(val)}
        placeholder="Enter quantity"
        max={10000}
        min={0}
      />
      <Button fullWidth mt="md" onClick={handlePurchase}>
         Purchase
      </Button>
    </Modal>
  );
}
