import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Container fluid style={{ margin: "100px" }}>
      <SimpleGrid>
        <Image
          src="https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg"
          width="400"
          height="auto"
          style={{ objectFit: "cover" }}
        />
        <div>
          <Title className="title">Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            component={Link}
            to="/"
            size="md"
            mt="xl"
          >
            Get back to home page
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}
