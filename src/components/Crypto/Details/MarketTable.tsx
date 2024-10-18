import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCryptoMarkets } from "../../../services/APIService";
import { Button, Card, Center, Divider, Loader, Text } from "@mantine/core";
import CommonTable from "../../Common/CommonTable";
import { Market } from "../../../utils/interfaces";
import { useParams } from "react-router-dom";
import { formatValueToUsd, formatValueTwoDigit } from "../../../utils/helpers";
import { queryLimit } from "../../../utils/constants";

export default function MarketTable() {
  const [marketPage, setMarketPage] = useState(0);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [hasMoreMarkets, setHasMoreMarkets] = useState(true);
  const [loadingMoreMarkets, setLoadingMoreMarkets] = useState(false);
  const { id } = useParams() as { id: string };
  const limit = queryLimit;

  const { isLoading: loadingMarkets, error } = useQuery(
    ["cryptoMarkets", id, marketPage],
    async () => {
      setLoadingMoreMarkets(true);
      const newMarkets = await fetchCryptoMarkets(
        id,
        limit,
        marketPage * limit
      );
      if (newMarkets.length < limit) {
        setHasMoreMarkets(false);
      }
      
      setMarkets((prevMarkets) => [...prevMarkets, ...newMarkets]);
      setLoadingMoreMarkets(false);
      return newMarkets;
    },
    {
      enabled: !!id,
      keepPreviousData: true,
    }
  );
  const marketTableData = {
    caption: "Market Data",
    head: ["Market", "Pair", "Price (USD)", "Volume (24H)", "Volume %"],
    body: markets.map((market) => [
      market.exchangeId,
      `${market.baseSymbol}/${market.quoteSymbol}`,
      `$${formatValueTwoDigit(market.priceUsd)}`,
      `$${formatValueToUsd(market.volumeUsd24Hr).toLocaleString()}`,
      `${formatValueTwoDigit(market.volumePercent).toLocaleString()} %`,
    ]),
  };

  if (loadingMarkets) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Card shadow="md" padding="xl" radius="md">
      <Text weight={600} size="lg" style={{ marginBottom: "10px" }}>
        Top Markets
      </Text>
      <Divider style={{ marginBottom: "20px" }} />

      <CommonTable data={marketTableData} />

      {hasMoreMarkets && (
        <Center>
          <Button
            onClick={() => setMarketPage((prevPage) => prevPage + 1)}
            style={{ marginTop: "20px" }}
            loading={loadingMoreMarkets}
          >
            View More
          </Button>
        </Center>
      )}
    </Card>
  );
}
