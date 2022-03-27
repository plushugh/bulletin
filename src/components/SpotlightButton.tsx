import { ActionIcon, Tooltip } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import { Search } from "tabler-icons-react";

const SpotlightButton: React.FC = () => {
  const { openSpotlight } = useSpotlight();

  return (
    <Tooltip radius="md" position="bottom" withArrow label="/">
      <ActionIcon
        size="lg"
        radius="md"
        variant="default"
        onClick={() => openSpotlight()}
      >
        <Search />
      </ActionIcon>
    </Tooltip>
  );
};

export default SpotlightButton;
