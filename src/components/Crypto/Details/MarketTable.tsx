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
  const [markets, setMarkets] = useState<Market[]>([]);
  const { id } = useParams() as { id: string };
  const limit = queryLimit;
  const [offset, setOffset] = useState(0);
  const [hasMoreMarkets, setHasMoreMarkets] = useState(true);

  const {
    isLoading: loadingMarkets,
    error,
    isFetching,
  } = useQuery(["cryptoData", { id, limit, offset }], fetchCryptoMarkets, {
    enabled: !!id,
    keepPreviousData: true,
    onSuccess: (newData) => {
      if (offset === 0) {
        setMarkets(newData);
      } else {
        setMarkets((prevMarkets) => [...prevMarkets, ...newData]);
      }

      if (newData.length < limit) {
        setHasMoreMarkets(false);
      }
    },
    onError: () => {
      setHasMoreMarkets(false);
    },
  });
  const marketTableData = {
    head: ["Market", "Pair", "Price (USD)", "Volume (24H)", "Volume %"],
    body: markets.map((market) => [
      market.exchangeId,
      `${market.baseSymbol}/${market.quoteSymbol}`,
      `$${formatValueTwoDigit(market.priceUsd)}`,
      `$${formatValueToUsd(market.volumeUsd24Hr)}`,
      `${formatValueTwoDigit(market.volumePercent)} %`,
    ]),
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
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
      <Text size="lg" style={{ marginBottom: "10px" }}>
        Top Markets
      </Text>
      <Divider style={{ marginBottom: "20px" }} />

      <CommonTable data={marketTableData} />

      {hasMoreMarkets && (
        <Center>
          <Button
            onClick={loadMore}
            style={{ marginTop: "20px" }}
            loading={isFetching}
          >
            View More
          </Button>
        </Center>
      )}
    </Card>
  );
}
