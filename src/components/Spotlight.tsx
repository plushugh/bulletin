import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { Clipboard, ClipboardPlus, Search } from "tabler-icons-react";

const Spotlight: React.FC = ({ children }) => {
  const actions: SpotlightAction[] = [
    {
      title: "Create",
      description: "Create a bulletin",
      onTrigger: () => null,
      icon: <ClipboardPlus size={18} />,
    },
    {
      title: "View",
      description: "View a bulletin from code",
      onTrigger: () => null,
      icon: <Clipboard size={18} />,
    },
  ];
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<Search size={18} />}
      searchPlaceholder="Search actions..."
      shortcut={["mod + P", "mod + K", "/"]}
      nothingFoundMessage="Nothing found..."
    >
      {children}
    </SpotlightProvider>
  );
};

export default Spotlight;
