import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Center, Text, Button, Card } from "@mantine/core";
import CommonTable from "../Common/CommonTable";
import { queryLimit } from "../../utils/constants";
import { OrdersLog } from "../../utils/interfaces";
import { fetchOrdersLogs } from "../../services/HoldingsAPIService";
import Layout from "../Layout/Layout";

const OrdersTable = () => {
  const limit = queryLimit;
  const [offset, setOffset] = useState(0);
  const [ordersLogs, setOrdersLogs] = useState<OrdersLog[]>([]);
  const [moreData, setMoreData] = useState(true);

  const { isLoading, error, isFetching } = useQuery(
    ["orderLogs", { offset, limit }],
    () => fetchOrdersLogs(offset, limit),
    {
      keepPreviousData: true,
      onSuccess: (newData) => {
        if (offset === 0) {
          setOrdersLogs(newData);
        } else {
          setOrdersLogs((prevData) => [...prevData, ...newData]);
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
        <Text color="red">Error fetching payment logs</Text>
      </Center>
    );
  }

  const ordersTableData = {
    head: ["Date", "Added Value", "Order Type", "Coin Name", "Amount"],
    body: ordersLogs.map((log) => [
      new Date(log.createdAt).toLocaleDateString(),
      <span
        style={{
          color: log.totalPrice >= 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {log.totalPrice >= 0
          ? `+$${log.totalPrice.toFixed(2)}`
          : `-$${Math.abs(log.totalPrice).toFixed(2)}`}
      </span>,
      log.orderType,
      log.coinName,
      log.amount,
    ]),
  };

  return (
    <>
      {ordersLogs.length > 0 ? <CommonTable data={ordersTableData} /> : <></>}
      <Center style={{ marginTop: "20px", display: moreData ? "" : "none" }}>
        <Button onClick={loadMore} loading={isFetching}>
          View More
        </Button>
      </Center>
    </>
  );
};

export default OrdersTable;
