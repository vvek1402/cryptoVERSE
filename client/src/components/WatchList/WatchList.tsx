import useWatchlistStore from "../../store/watchlist.store";
import Layout from "../Layout/Layout";
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
    <Layout>
      <Text ta="center" size="xl" mb="20px" fw="700">
        Watchlist
      </Text>

      <CryptoTable ids={ids} />
    </Layout>
  );
};

export default Watchlist;
