import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Center, Text, Input, Button } from "@mantine/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { formatValueToUsd, formatValueTwoDigit } from "../../utils/helpers";
import { CryptoData, CryptoSelected } from "../../utils/interfaces";
import { fetchCryptoData } from "../../services/APIService";
import Layout from "../Layout/Layout";
import CommonTable from "../Common/CommonTable";
import AddModal from "../Wallet/AddModal";
import { useDebouncedValue } from "@mantine/hooks";
import CoinIcon from "../Common/CoinIcon";
import { queryLimit } from "../../utils/constants";

const CryptoTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const limit = queryLimit;
  const [offset, setOffset] = useState(0);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [moreData, setMoreData] = useState(true);
  const [opened, setOpened] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
  });

  const { data, isLoading, error, isFetching, refetch } = useQuery(
    ["cryptoData", { search: debouncedSearch, limit, offset }],
    fetchCryptoData,
    {
      keepPreviousData: true,
      onSuccess: (newData) => {
        if (offset === 0) {
          setCryptoData(newData);
        } else {
          setCryptoData((prevData) => [...prevData, ...newData]);
        }

        if (newData.length < limit) {
          setMoreData(false);
        }
      },
    }
  );

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (debouncedSearch) {
      newParams.set("search", debouncedSearch);
    } else {
      newParams.delete("search");
    }

    navigate({ search: newParams.toString() }, { replace: true });
    setOffset(0);
    refetch();
    setMoreData(true);
  }, [debouncedSearch, navigate, refetch]);

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

  const cryptoTableData = {
    head: [
      "Rank",
      "Symbol",
      "Name",
      "Supply",
      "Max Supply",
      "Market Cap (USD)",
      "Price (USD)",
      "Change (24Hr)",
      "Action",
    ],
    body: cryptoData?.map((crypto) => [
      crypto.rank,
      <CoinIcon src={crypto.symbol} alt={crypto.name} />,
      <Link to={`/details/${crypto.id}`}>{crypto.name}</Link>,
      formatValueToUsd(crypto.supply),
      crypto.maxSupply ? formatValueToUsd(crypto.maxSupply) : "N/A",
      formatValueToUsd(crypto.marketCapUsd),
      formatValueToUsd(crypto.priceUsd),
      <span
        style={{
          color: parseFloat(crypto.changePercent24Hr) < 0 ? "red" : "green",
        }}
      >
        {formatValueTwoDigit(crypto.changePercent24Hr)}%
      </span>,
      <Button onClick={() => handlePurchaseClick(crypto)}>Purchase</Button>,
    ]),
  };

  const handlePurchaseClick = (crypto: CryptoSelected) => {
    setSelectedCrypto(crypto);
    setOpened(true);
  };

  return (
    <Layout>
      <Text
        align="center"
        size="xl"
        weight={700}
        style={{ marginBottom: "20px" }}
      >
        Cryptocurrency Prices
      </Text>

      <Input
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        style={{ marginBottom: "20px" }}
      />

      <CommonTable data={cryptoTableData} />

      <Center style={{ marginTop: "20px", display: moreData ? "" : "none" }}>
        <Button onClick={loadMore} loading={isFetching}>
          View More
        </Button>
      </Center>

      <AddModal
        opened={opened}
        selectedCrypto={selectedCrypto}
        setOpened={setOpened}
      />
    </Layout>
  );
};

export default CryptoTable;
