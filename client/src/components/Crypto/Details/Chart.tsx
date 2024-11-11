import React, { memo, useState, useEffect } from "react";
import {
  Loader,
  Button,
  Group,
  Card,
  Text,
  Center,
  Paper,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  calculateDateRange,
  formatValueTwoDigit,
} from "../../../utils/helpers";
import { fetchCryptoHistory } from "../../../services/CryptoAPIService";
import { CryptoHistoryResponse, History } from "../../../utils/interfaces";
import { AreaChart } from "@mantine/charts";

const ChartComponent = ({ data }: CryptoHistoryResponse) => {
  const chartData = data.map((item) => ({
    date: new Date(item.time).toLocaleDateString(),
    price: formatValueTwoDigit(item.priceUsd),
  }));

  return (
    <AreaChart
      h={300}
      data={chartData}
      dataKey="date"
      unit="$"
      dotProps={{ r: 2, strokeWidth: 1 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      withGradient
      series={[{ name: "price", color: "teal" }]}
    />
  );
};

const Chart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialRange = searchParams.get("range") || "1y";

  const [range, setRange] = useState(initialRange);
  const { id } = useParams() as { id: string };

  const { data, isLoading, error } = useQuery(
    ["cryptoHistory", id, range],
    () => {
      const { now, start } = calculateDateRange(range);
      return fetchCryptoHistory(id, "d1", start, now);
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("range", range);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [range, navigate, location.search]);

  if (isLoading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text color="red">Error fetching data</Text>
      </Center>
    );
  }

  const prices = data
    .map((item: History) => parseFloat(item.priceUsd))
    .filter((price: number) => !isNaN(price));

  const high = prices.length > 0 ? Math.max(...prices).toFixed(2) : "N/A";
  const low = prices.length > 0 ? Math.min(...prices).toFixed(2) : "N/A";

  const average =
    prices.length > 0
      ? (
          prices.reduce((sum: number, curr: number) => sum + curr, 0) /
          prices.length
        ).toFixed(2)
      : "N/A";

  const change =
    prices.length > 1
      ? (((prices[prices.length - 1] - prices[0]) / prices[0]) * 100).toFixed(2)
      : "N/A";

  const statItems = [
    { label: "High (USD)", value: high },
    { label: "Low (USD)", value: low },
    { label: "Average (USD)", value: average },
    { label: "Change (%)", value: change },
  ];

  return (
    <div>
      <Card shadow="md" padding="xl" radius="md" mt="20">
        <Text size="lg" style={{ marginBottom: "10px" }}>
          Historical Prices
        </Text>
        <Divider style={{ marginBottom: "20px" }} />
        <SimpleGrid mb={20} cols={{ sm: 1, md: 2, lg: 4 }}>
          {statItems.map((stat, index) => (
            <Paper withBorder p="md" radius="md" key={index}>
              <Text c="dimmed" tt="uppercase" fw={500} fz="xs">
                {stat.label}:{" "}
              </Text>
              <Text fw={500} fz="md">
                {stat.value}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
        <ChartComponent data={data} />
        <Group mt="20" ta="center" mx="auto">
          {["1w", "1m", "3m", "6m", "1y"].map((option) => (
            <Button
              key={option}
              variant={range === option ? "filled" : "outline"}
              onClick={() => setRange(option)}
            >
              {option.toUpperCase()}
            </Button>
          ))}
        </Group>
      </Card>
    </div>
  );
};

export default memo(Chart);
