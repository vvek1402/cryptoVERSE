import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { formatValueToUsd, formatValueTwoDigit } from "../../../utils/helpers";
import { CryptoData, CryptoStatData } from "../../../utils/interfaces";

export function Stats({ details }: { details: CryptoData }) {
  const stats = [
    { title: "Rank", value: details.rank, diff: null },
    {
      title: "Price (USD)",
      value: `$${formatValueTwoDigit(details.priceUsd)}`,
      diff: details.changePercent24Hr,
    },
    {
      title: "Market Cap (USD)",
      value: `$${formatValueToUsd(details.marketCapUsd)}`,
      diff: null,
    },
    { title: "Supply", value: formatValueToUsd(details.supply), diff: null },
    {
      title: "Max Supply",
      value: details.maxSupply ? formatValueToUsd(details.maxSupply) : "N/A",
      diff: null,
    },
  ];

  const statsElements = stats.map((stat: CryptoStatData) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group>
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          {stat.diff !== null && (
            <ThemeIcon
              color="gray"
              variant="light"
              style={{
                color:
                  stat.diff > 0
                    ? "var(--mantine-color-teal-6)"
                    : "var(--mantine-color-red-6)",
              }}
              size={38}
              radius="md"
            >
              <DiffIcon size="1.8rem" stroke={1.5} />
            </ThemeIcon>
          )}
        </Group>
        {stat.diff !== null && (
          <Text c="dimmed" fz="sm" mt="md">
            <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
              {formatValueTwoDigit(stat.diff)}%
            </Text>{" "}
            {stat.diff > 0 ? "increase" : "decrease"} compared to last 24 hours
          </Text>
        )}
      </Paper>
    );
  });

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 980, cols: 2 },  // 2 columns for medium screens
        { maxWidth: 600, cols: 1 },  // 1 column for small screens
      ]}
    >
      {statsElements}
    </SimpleGrid>
  );
}
