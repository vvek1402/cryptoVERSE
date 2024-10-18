import React, { memo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  Loader,
  Button,
  Group,
  Card,
  Text,
  Center,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { calculateDateRange } from "../../../utils/helpers";
import { fetchCryptoHistory } from "../../../services/APIService";
import { CryptoHistoryResponse, History } from "../../../utils/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }: CryptoHistoryResponse) => {
  const chartData = {
    labels: data.map((item) => new Date(item.time).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map((item) => parseFloat(item.priceUsd)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Price Over Time" },
    },
    scales: {
      x: { 
        type: "category", 
        title: { display: true, text: "Date" } 
      },
      y: { 
        title: { display: true, text: "Price (USD)" }, 
        beginAtZero: false 
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
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

  return (
    <div>
      <Text
        weight={600}
        size="lg"
        style={{ marginBottom: "10px", marginTop: "30px" }}
      >
        Historical Prices
      </Text>
      <Card
        shadow="md"
        padding="xl"
        radius="md"
        style={{ backgroundColor: "#f9fafb" }}
      >
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 980, cols: 2 },
            { maxWidth: 600, cols: 1 },
          ]}
        >
          <Paper withBorder p="md" radius="md">
            <Text c="dimmed" tt="uppercase" fw={500} fz="xs">
              High (USD):{" "}
            </Text>
            <Text fw={500} fz="md">
              {high}
            </Text>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Text c="dimmed" tt="uppercase" fw={500} fz="xs">
              LOW (USD):{" "}
            </Text>
            <Text fw={500} fz="md">
              {low}
            </Text>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Text c="dimmed" tt="uppercase" fw={500} fz="xs">
              Average (USD):{" "}
            </Text>
            <Text fw={500} fz="md">
              {average}
            </Text>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              Change %:{" "}
            </Text>
            <Text fw={500} fz="md">
              {change}
            </Text>
          </Paper>
        </SimpleGrid>
        <ChartComponent data={data} />
        <Group position="center" style={{ marginTop: "20px" }}>
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
