import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Center, Text, Button, Card } from "@mantine/core";
import CommonTable from "../Common/CommonTable";
import { queryLimit } from "../../utils/constants";
import { fetchPaymentLogs } from "../../services/BalanceAPIService";
import { PaymentLog } from "../../utils/interfaces";
import { useBalanceStore } from "../../store/balance.store";

const PaymentLogsTable = () => {
  const limit = queryLimit;
  const [offset, setOffset] = useState(0);
  const [paymentLogs, setPaymentLogs] = useState<PaymentLog[]>([]);
  const [moreData, setMoreData] = useState(true);
  const { balance } = useBalanceStore();

  const { isLoading, error, isFetching, refetch } = useQuery(
    ["paymentLogs", { offset, limit }],
    () => fetchPaymentLogs(offset, limit),
    {
      keepPreviousData: true,
      onSuccess: (newData) => {
        if (offset === 0) {
          setPaymentLogs(newData);
        } else {
          setPaymentLogs((prevData) => [...prevData, ...newData]);
        }

        if (newData.length < limit) {
          setMoreData(false);
        }
      },
    }
  );

  useEffect(() => {
    setOffset(0);
    refetch();
  }, [balance])

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

  const paymentLogsTableData = {
    head: ["Date", "Added Amount"],
    body: paymentLogs.map((log) => [
      new Date(log.createdAt).toLocaleDateString(),
      <span
        style={{
          color: log.addedAmount >= 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {log.addedAmount >= 0 ? `+$${log.addedAmount.toFixed(2)}` : `-$${Math.abs(log.addedAmount).toFixed(2)}`}
      </span>,
    ]),
  };
  

  return (
    <>
      <Card withBorder padding="xl" radius="md" mt={20}>
        <Text ta="center" size="xl" mb="20px" fw="700">
          Payment Logs
        </Text>
        <CommonTable data={paymentLogsTableData} />
        <Center style={{ marginTop: "20px", display: moreData ? "" : "none" }}>
          <Button onClick={loadMore} loading={isFetching}>
            View More
          </Button>
        </Center>
      </Card>
    </>
  );
};

export default PaymentLogsTable;
