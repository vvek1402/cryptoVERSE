import {
  Container,
  Group,
  Burger,
  Button,
  Badge,
  Drawer,
  ScrollArea,
  Text,
  Flex,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import "../../style.scss";
import { useAuthStore } from "../../store/auth.store";
import { useHoldingsStore } from "../../store/holdings.store";
import { DarkMode } from "./DarkMode";
import { useBalanceStore } from "../../store/balance.store";
import { formatValueTwoDigit } from "../../utils/helpers";

const links = [
  { link: "/", label: "Coins" },
  { link: "/exchange", label: "Exchange" },
  { link: "/watchlist", label: "Watchlist" },
  { link: "/holdings", label: "Holdings" },
  { link: "/orders", label: "Orders" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const logout = useAuthStore((state) => state.logout);
  const totalQuantity = useHoldingsStore((state) => state.totalQuantity);
  const location = useLocation();
  const { balance } = useBalanceStore((state) => state);

  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={`link ${location.pathname == link.link ? "active" : ""}`}
      onClick={() => {
        close();
      }}
    >
      {link.label === "holdings" && totalQuantity > 0 ? (
        <>
          {link.label}{" "}
          <Badge color="teal" size="xl">
            {totalQuantity}
          </Badge>
        </>
      ) : (
        <Text fw={800}>{link.label}</Text>
      )}
    </Anchor>
  ));

  return (
    <header className="header">
      <Container fluid className="inner">
        <div className="logo">
          <Anchor component={Link} to="/" className="logoText">
            CryptoVERSE
          </Anchor>
        </div>

        <Group className="linksContainer desktopLinks">{items}</Group>

        <Group className="linksContainer desktopLinks">
          <DarkMode />
          <Button component={Link} to="/balance" type="button" variant="outline">
            Balance : ${formatValueTwoDigit(balance.toFixed(2))}
          </Button>
          <Button type="button" variant="outline" onClick={logout}>
            Logout
          </Button>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className="burgerMenu"
          size="sm"
        />

        <Drawer
          opened={opened}
          onClose={close}
          title="CryptoVERSE"
          padding="xl"
          size="sm"
          className="mobileMenu"
        >
          <ScrollArea>
            <Flex
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              {items}
              <Button type="button" variant="outline">
                Balance : ${balance}
              </Button>
              <Button type="button" variant="outline" onClick={logout}>
                Logout
              </Button>
            </Flex>
          </ScrollArea>
        </Drawer>
      </Container>
    </header>
  );
}
