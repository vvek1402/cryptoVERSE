import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Center,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export function LoginForm() {
  const [type] = useToggle(["login"]);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => {
        if (!val) return "Email is required";
        return /^\S+@\S+$/.test(val) ? null : "Invalid email";
      },
      password: (val) => {
        if (!val) return "Password is required";
        return val.length < 6
          ? "Password should include at least 6 characters"
          : null;
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (type === "login") {
      login(values.email, values.password);
      navigate("/");
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Box>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Welcome to CryptoVERSE,
          </Text>

          <Divider label="" labelPosition="center" my="lg" />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Email Address"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
                radius="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                radius="md"
              />
            </Stack>

            <Group mt="xl">
              <Button fullWidth type="submit" style={{backgroundColor : "#232F53"}}>
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Center>
  );
}
