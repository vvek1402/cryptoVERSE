import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Box,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../../services/AuthAPIService";
import { serverError } from "../../utils/helpers";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const { doLogin } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
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
      terms: (val) =>
        type === "register" && !val ? "You must accept terms" : null,
    },
  });

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      doLogin();
      navigate("/");
    },
    onError: (error: unknown) => {
      serverError(form, error);
    },
  });

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      doLogin();
      navigate("/");
    },
    onError: (error: unknown) => {
      serverError(form, error);
    },
  });

  const handleSubmit = () => {
    if (type === "login") {
      loginMutation.mutate({
        email: form.values.email,
        password: form.values.password,
      });
    } else {
      registerMutation.mutate({
        email: form.values.email,
        password: form.values.password,
        name: form.values.name,
      });
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Box>
        <Notifications />
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" fw={500}>
            Welcome to cryptoVERSE
          </Text>

          <Divider labelPosition="center" my="lg" />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              {type === "register" && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@example.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                radius="md"
              />

              {type === "register" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                  error={form.errors.terms && "You must accept terms"}
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button
                type="submit"
                loading={
                  type === "login"
                    ? loginMutation.isLoading
                    : registerMutation.isLoading
                }
              >
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Center>
  );
}
