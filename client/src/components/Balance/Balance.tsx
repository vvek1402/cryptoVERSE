import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Paper,
  Text,
  Center,
  NumberInput,
  Group,
  Title,
  Stack,
  Divider,
} from "@mantine/core";
import { useBalanceStore } from "../../store/balance.store";
import PaymentLogsTable from "./PaymentLogs";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const Balance = () => {
  const { balance, addBalance, withdrawBalance, fetchBalance } =
    useBalanceStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState<any>(1);
  const [actionType, setActionType] = useState<"add" | "withdraw">("add");

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleOpenModal = (type: "add" | "withdraw") => {
    setActionType(type);
    setModalOpen(true);
    setAmount(1);
  };

  const handleConfirm = () => {
    if (actionType === "add") {
      addBalance(amount);
    } else {
      withdrawBalance(amount);
    }
    setModalOpen(false);
    setAmount(1);
  };

  const isWithdrawExceedingBalance =
    actionType === "withdraw" && amount > balance;

  return (
    <>
      <Paper
        withBorder
        style={{
          padding: "30px",
          borderRadius: "16px",
        }}
        mt="xl"
      >
        <Stack align="center">
          <Title order={2} ta="center">
            Total Balance
          </Title>
          <Text size="xl" w={700} ta="center">
            ${balance.toFixed(2)}
          </Text>
        </Stack>
        <Divider my="lg" />
        <Center mt="lg">
          <Group>
            <Button
              onClick={() => handleOpenModal("add")}
              color="teal"
              leftSection={<IconPlus />}
              radius="md"
              size="md"
            >
              Add Balance
            </Button>
            <Button
              onClick={() => handleOpenModal("withdraw")}
              color="red"
              leftSection={<IconMinus />}
              radius="md"
              size="md"
            >
              Withdraw Balance
            </Button>
          </Group>
        </Center>
      </Paper>


      <PaymentLogsTable />

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${actionType === "add" ? "Add" : "Withdraw"} Balance`}
        centered
        radius="lg"
        styles={{
          title: { fontWeight: 600, fontSize: "20px" },
          body: { padding: "24px" },
        }}
      >
        <Stack>
          {actionType === "withdraw" && (
            <Text color="dimmed" size="sm">
              Available Balance: <strong>${balance.toFixed(2)}</strong>
            </Text>
          )}

          <NumberInput
            placeholder="Enter amount"
            min={1}
            value={amount}
            onChange={setAmount}
            styles={{
              input: {
                height: "48px",
                fontSize: "16px",
                padding: "12px",
              },
            }}
          />

          <Button
            fullWidth
            onClick={handleConfirm}
            color={actionType === "add" ? "teal" : "red"}
            disabled={isWithdrawExceedingBalance || amount <= 0}
            size="md"
            radius="md"
          >
            {actionType === "add" ? "Confirm Add" : "Confirm Withdraw"}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Balance;
