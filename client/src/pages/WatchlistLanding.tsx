import { Divider, Title } from "@mantine/core";
import Layout from "../components/Layout/Layout";
import Watchlist from "../components/WatchList/WatchList";

const WatchlistLanding = () => {
  return (
    <Layout>
      <Title order={2} ta="center">
        Watchlist
      </Title>
      <Divider my="lg" />
      <Watchlist />
    </Layout>
  );
};

export default WatchlistLanding;
