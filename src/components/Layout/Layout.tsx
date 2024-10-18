import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Container } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const Layout = ({ children }: {
  children: ReactNode;
}) => {
  return (
    <>
      <Header />
      <Notifications />
      <Container
        style={{
          padding: "40px",
          borderRadius: "12px",
        }}
        fluid
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
