import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Paper, Text, Center } from "@mantine/core";
import { useBalanceStore } from "../../store/balance.store";
import Layout from "../Layout/Layout";

const Balance = () => {
  const { balance, addBalance, withdrawBalance, fetchBalance } =
    useBalanceStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [actionType, setActionType] = useState<"add" | "withdraw">("add");

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleOpenModal = (type: "add" | "withdraw") => {
    setActionType(type);
    setModalOpen(true);
    setAmount(0);
  };

  const handleConfirm = () => {
    if (actionType === "add") {
      addBalance(amount);
    } else {
      withdrawBalance(amount);
    }
    setModalOpen(false);
    setAmount(0);
  };

  const isWithdrawExceedingBalance =
    actionType === "withdraw" && amount > balance;

  return (
    <Layout>
      <Center mt="md">
        <Button onClick={() => handleOpenModal("add")} color="green" mr="sm">
          Add Balance
        </Button>
        <Button onClick={() => handleOpenModal("withdraw")} color="red">
          Withdraw Balance
        </Button>
      </Center>
      <Paper
        withBorder
        style={{ padding: "20px" }}
        shadow="lg"
        radius="md"
        mt="xl"
      >
        <Text ta="center" fw={700} size="lg">
          Total Balance:
        </Text>
        <Text ta="center" size="xl" color="blue" mt="sm">
          ${balance.toFixed(2)}
        </Text>
      </Paper>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${actionType === "add" ? "Add" : "Withdraw"} Balance`}
      >
        <Text mb="xs">
          {actionType === "withdraw" &&
            `Available Balance: $${balance.toFixed(2)}`}
        </Text>

        <Input
          placeholder="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.currentTarget.value))}
          mb="md"
        />

        <Button
          fullWidth
          onClick={handleConfirm}
          color={actionType === "add" ? "green" : "red"}
          disabled={actionType === "withdraw" && isWithdrawExceedingBalance}
        >
          Confirm
        </Button>
      </Modal>
    </Layout>
  );
};

export default Balance;
