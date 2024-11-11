import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Center, Text, Input, Button } from "@mantine/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { formatValueToUsd, formatValueTwoDigit } from "../../utils/helpers";
import { CryptoData, CryptoSelected } from "../../utils/interfaces";
import { fetchCryptoData } from "../../services/CryptoAPIService";
import CommonTable from "../Common/CommonTable";
import AddModal from "../Holdings/AddModal";
import { useDebouncedValue } from "@mantine/hooks";
import CoinIcon from "../Common/CoinIcon";
import { queryLimit } from "../../utils/constants";
import { IconBasketPlus, IconBookmark } from "@tabler/icons-react";
import useWatchlistStore from "../../store/watchlist.store";
import { notifications } from "@mantine/notifications";

const CryptoTable = ({ ids }: { ids?: string }) => {
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
  const { addCoin, removeCoin, isInWatchlist } = useWatchlistStore(
    (state) => state
  );

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSelected>({
    name: "",
    symbol: "",
    priceUsd: "",
    id: "",
  });

  const { isLoading, error, isFetching, refetch } = useQuery(
    [
      "cryptoData",
      { search: debouncedSearch, limit, offset, ...(ids ? { ids } : {}) },
    ],
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
      <>
        <Button
          onClick={() => handleWatchlistClick(crypto)}
          color={isInWatchlist(crypto.id) ? "teal" : ""}
        >
          <IconBookmark />
        </Button>
        <Button ml={4} onClick={() => handlePurchaseClick(crypto)}>
          <IconBasketPlus />
        </Button>
      </>,
      ,
    ]),
  };

  const handlePurchaseClick = (crypto: CryptoSelected) => {
    setSelectedCrypto(crypto);
    setOpened(true);
  };

  const handleWatchlistClick = (crypto: CryptoSelected) => {
    if (isInWatchlist(crypto.id)) {
      removeCoin(crypto.id);
      notifications.show({
        title: "Success !!",
        message: "Coin Removed From Watchlist Successfully",
      });
    } else {
      addCoin(crypto.id, crypto.name);

      notifications.show({
        title: "Success !!",
        message: "Coin Added to Watchlist Successfully",
      });
    }
  };

  return (
    <>
      {!ids ? (
        <Input
          placeholder="Search by name or symbol"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          mb="20px"
        />
      ) : (
        <></>
      )}

      <CommonTable data={cryptoTableData} />

      <Center mt="20px" display={moreData ? "" : "none"}>
        <Button onClick={loadMore} loading={isFetching}>
          View More
        </Button>
      </Center>

      <AddModal
        opened={opened}
        selectedCrypto={selectedCrypto}
        setOpened={setOpened}
      />
    </>
  );
};

export default CryptoTable;
