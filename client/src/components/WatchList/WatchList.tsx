import useWatchlistStore from "../../store/watchlist.store";
import CryptoTable from "../Crypto/CryptoTable";
import { Text } from "@mantine/core";

const Watchlist = () => {
  const { watchlist } = useWatchlistStore(
    (state) => ({
      watchlist: state.watchlist,
    })
  );

  const ids = watchlist.map((coin) => coin.coinId).join(",");

  return (
    <>
      <CryptoTable ids={ids} type="watchlist" />
    </>
  );
};

export default Watchlist;
