import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Center, Text, Button, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatValueToUsd, formatValueTwoDigit } from "../../utils/helpers";
import { ExchangeData } from "../../utils/interfaces";
import { fetchExchangeData } from "../../services/CryptoAPIService";
import CommonTable from "../Common/CommonTable";
import { queryLimit } from "../../utils/constants";

const ExchangeTable = () => {
  const limit = queryLimit;
  const [offset, setOffset] = useState(0);
  const [exchangeData, setExchangeData] = useState<ExchangeData[]>([]);
  const [moreData, setMoreData] = useState(true);

  const { isLoading, error, isFetching } = useQuery(
    ["exchangeData", { limit, offset }],
    fetchExchangeData,
    {
      keepPreviousData: true,
      onSuccess: (newData) => {

        setExchangeData((prevData) => [...prevData, ...newData]);

        if (newData.length < 19) {
          setMoreData(false);
        }
      },
    }
  );

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  if (isLoading && offset === 0) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text color="red">Error fetching data</Text>
      </Center>
    );
  }

  const exchangeTableData = {
    head: ["Rank", "Name", "Trading Pairs", "Volume (24H)", "Total %"],
    body: exchangeData.map((exchange) => [
      exchange.rank,
      <Anchor component={Link} to={`${exchange.exchangeUrl}`}>{exchange.name}</Anchor>,
      exchange.tradingPairs,
      formatValueToUsd(exchange.volumeUsd),
      formatValueTwoDigit(exchange.percentTotalVolume) + "%",
    ]),
  };

  return (
    <>
      <CommonTable data={exchangeTableData} />
      <Center style={{ marginTop: "20px", display: moreData ? "" : "none" }}>
        <Button onClick={loadMore} loading={isFetching}>
          View More
        </Button>
      </Center>
    </>
  );
};

export default ExchangeTable;
