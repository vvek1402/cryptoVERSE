import { Container, Group, Burger, Button, Badge, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import "../../style.scss";
import { useAuthStore } from "../../store/auth.store";
import { useWalletStore } from "../../store/wallet.store";

const links = [
  { link: "/", label: "Coins" },
  { link: "/exchange", label: "Exchange" },
  { link: "/wallet", label: "Wallet" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const logout = useAuthStore((state) => state.logout);
  const totalQuantity = useWalletStore((state) => state.totalQuantity);
  const location = useLocation();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`link ${location.pathname == link.link ? 'active' : ''}`}
      onClick={() => {
        close(); 
      }}
    >
      {link.label === "Wallet" && totalQuantity > 0 ? (
        <>
          {link.label}{" "}
          <Badge color="teal" size="xl">
            {totalQuantity}
          </Badge>
        </>
      ) : (
        link.label
      )}
    </Link>
  ));

  return (
    <header className="header">
      <Container fluid className="inner">
        <div className="logo">
          <Link to="/" className="logoText">
            CryptoVERSE
          </Link>
        </div>

        <Group className="linksContainer desktopLinks">
          {items}
        </Group>

        <Group className="linksContainer desktopLinks">
          <Button type="button" variant="outline" onClick={logout}>
            Logout
          </Button>
        </Group>

        <Burger opened={opened} onClick={toggle} className="burgerMenu" size="sm" />

        <Drawer
          opened={opened}
          onClose={close}
          title="CryptoVERSE"
          padding="xl"
          size="sm"
          className="mobileMenu"
        >
          <ScrollArea>
            <Group spacing="md" align="center">
              {items}
            </Group>
            <Button type="button" style={{marginTop : "20px"}} variant="outline" onClick={logout}>
                Logout
              </Button>
          </ScrollArea>
        </Drawer>
      </Container>
    </header>
  );
}
