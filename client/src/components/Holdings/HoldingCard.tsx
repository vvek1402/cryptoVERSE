import React, { useMemo } from "react";
import { Paper, Text, Stack, Button, Anchor, Divider } from "@mantine/core";
import CoinIcon from "../Common/CoinIcon";
import { useCryptoPrices } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { CryptoSelected } from "../../utils/interfaces";

const HoldingCard = ({
  coin,
  handleSellClick,
}: {
  coin: CryptoSelected;
  handleSellClick: (coin: CryptoSelected) => void;
}) => {
  const livePrice: number = useCryptoPrices(coin.name.toLowerCase()) ?? 0;

  const coinQuantity = coin.quantity ?? 0;

  const profitLoss: number = useMemo(() => {
    return Number(
      ((livePrice - Number(coin.priceUsd)) * coinQuantity).toFixed(2)
    );
  }, [livePrice, coin.priceUsd, coin.quantity]);

  const totalValue = (coinQuantity * livePrice).toFixed(2);

  return (
    <Paper withBorder p="md" radius="md" key={coin.name}>
      <Stack m="sm">
        <Stack align="center">
          <Anchor component={Link} to={`/details/${coin.id}`}>
            <CoinIcon src={coin?.symbol} alt={coin?.name} />
            <Text>{coin.name}</Text>
          </Anchor>
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Price : ${livePrice}
          </Text>
          <Divider style={{ width: "100%" }} />
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity: {coinQuantity}
          </Text>

          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Purchase Price : ${coin.priceUsd}
          </Text>
          <Divider style={{ width: "100%" }} />
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Total Value: ${totalValue}
          </Text>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: profitLoss >= 0 ? "green" : "red",
            }}
          >
            Profit/Loss: ${profitLoss}
          </Text>
        </Stack>
        <Button color="red" fullWidth onClick={() => handleSellClick(coin)}>
          Sell
        </Button>
      </Stack>
    </Paper>
  );
};

export default HoldingCard;
