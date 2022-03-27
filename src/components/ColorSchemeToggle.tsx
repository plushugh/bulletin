import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

const ColorSchemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Tooltip radius="md" position="bottom" withArrow label="⌘ + J">
      <ActionIcon
        size="lg"
        radius="md"
        variant="default"
        onClick={() => toggleColorScheme()}
      >
        {colorScheme === "dark" ? <Sun /> : <MoonStars />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
