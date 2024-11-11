// HoldingCard.js
import React, { useMemo } from "react";
import { Paper, Text, Stack, Button } from "@mantine/core";
import CoinIcon from "../Common/CoinIcon";
import { useCryptoPrices } from "../../utils/helpers";
import { Link } from "react-router-dom";

const HoldingCard = ({ coin, handleSellClick }: any) => {
  const livePrice: any = useCryptoPrices(coin.name.toLowerCase()) ?? 0;

  const profitLoss: any = useMemo(() => {
    return ((livePrice - coin.priceUsd) * coin.amount).toFixed(2);
  }, [livePrice, coin.priceUsd, coin.amount]);

  const totalValue = (coin.amount * livePrice).toFixed(2);

  return (
    <Paper withBorder p="md" radius="md" key={coin.name}>
      <Stack m="sm">
        <Stack align="center">
          <Link to={`/details/${coin.id}`}>
            <CoinIcon src={coin?.symbol} alt={coin?.name} />
            <Text>{coin.name}</Text>
          </Link>
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Quantity: {coin.amount}
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Current Price (USD): ${livePrice}
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>
            Purchase Price (USD): ${coin.priceUsd}
          </Text>
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
};

export default HoldingCard;
