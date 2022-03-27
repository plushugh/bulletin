import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { FileCode2 } from "tabler-icons-react";

const CodeForm = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) => {
        return /^[0-9]{8}$/.test(value) ? null : "Invalid code";
      },
    },
  });

  const { showNotification } = useNotifications();

  const handleSubmit = async (values: typeof form.values) => {};

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
      <TextInput
        placeholder="Enter Code"
        radius="md"
        size="xl"
        width="100%"
        icon={<FileCode2 />}
        sx={(theme) => ({
          "@media (min-width: 768px)": {
            marginLeft: theme.breakpoints.sm * -0.25,
            marginRight: theme.breakpoints.sm * -0.25,
          },
          "@media (min-width: 1024px)": {
            marginLeft: theme.breakpoints.md * -0.25,
            marginRight: theme.breakpoints.md * -0.25,
          },
          boxShadow: theme.shadows.sm,
          "&:focus, &:focus-within": {
            boxShadow: theme.shadows.md,
          },
          "&:active": {
            boxShadow: theme.shadows.lg,
          },
        })}
        {...form.getInputProps("code")}
        errorProps={{
          style: {
            display: "none",
          },
        }}
      />
      <Button
        size="xl"
        variant="outline"
        mt="xl"
        rightIcon
        type="submit"
        radius="md"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

export default CodeForm;
