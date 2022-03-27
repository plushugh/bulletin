import {
  AppShell,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { ColorSchemeToggle, SpotlightButton } from ".";

const Shell: React.FC = ({ children }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppShell
      padding="md"
      sx={{
        main: {
          padding: 0,
        },
      }}
      header={
        <Header
          height={60}
          sx={(theme) => ({
            paddingLeft: theme.spacing.lg,
            paddingRight: theme.spacing.lg,

            "@media (max-width: 768px)": {
              paddingLeft: theme.spacing.sm,
              paddingright: theme.spacing.sm,
            },
          })}
        >
          <Group position="apart" spacing="sm" sx={{ height: "100%" }}>
            <Group spacing="sm" sx={{ height: "100%" }}>
              {colorScheme === "light" ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10H14C12.9391 10 11.9217 10.4214 11.1716 11.1716C10.4214 11.9217 10 12.9391 10 14V38C10 39.0609 10.4214 40.0783 11.1716 40.8284C11.9217 41.5786 12.9391 42 14 42H34C35.0609 42 36.0783 41.5786 36.8284 40.8284C37.5786 40.0783 38 39.0609 38 38V14C38 12.9391 37.5786 11.9217 36.8284 11.1716C36.0783 10.4214 35.0609 10 34 10H30"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26 6H22C19.7909 6 18 7.79086 18 10C18 12.2091 19.7909 14 22 14H26C28.2091 14 30 12.2091 30 10C30 7.79086 28.2091 6 26 6Z"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 20C14.8954 20 14 20.8954 14 22C14 23.1046 14.8954 24 16 24V20ZM32 24C33.1046 24 34 23.1046 34 22C34 20.8954 33.1046 20 32 20V24ZM16 24L32 24V20L16 20V24Z"
                    fill="black"
                  />
                  <path
                    d="M16 32C14.8954 32 14 32.8954 14 34C14 35.1046 14.8954 36 16 36V32ZM32 36C33.1046 36 34 35.1046 34 34C34 32.8954 33.1046 32 32 32V36ZM16 36L32 36V32L16 32V36Z"
                    fill="black"
                  />
                  <path
                    d="M16 26C14.8954 26 14 26.8954 14 28C14 29.1046 14.8954 30 16 30V26ZM32 30C33.1046 30 34 29.1046 34 28C34 26.8954 33.1046 26 32 26V30ZM16 30L32 30V26L16 26V30Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10H14C12.9391 10 11.9217 10.4214 11.1716 11.1716C10.4214 11.9217 10 12.9391 10 14V38C10 39.0609 10.4214 40.0783 11.1716 40.8284C11.9217 41.5786 12.9391 42 14 42H34C35.0609 42 36.0783 41.5786 36.8284 40.8284C37.5786 40.0783 38 39.0609 38 38V14C38 12.9391 37.5786 11.9217 36.8284 11.1716C36.0783 10.4214 35.0609 10 34 10H30"
                    stroke="#C1C2C5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26 6H22C19.7909 6 18 7.79086 18 10C18 12.2091 19.7909 14 22 14H26C28.2091 14 30 12.2091 30 10C30 7.79086 28.2091 6 26 6Z"
                    stroke="#C1C2C5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 20C14.8954 20 14 20.8954 14 22C14 23.1046 14.8954 24 16 24V20ZM32 24C33.1046 24 34 23.1046 34 22C34 20.8954 33.1046 20 32 20V24ZM16 24L32 24V20L16 20V24Z"
                    fill="#C1C2C5"
                  />
                  <path
                    d="M16 32C14.8954 32 14 32.8954 14 34C14 35.1046 14.8954 36 16 36V32ZM32 36C33.1046 36 34 35.1046 34 34C34 32.8954 33.1046 32 32 32V36ZM16 36L32 36V32L16 32V36Z"
                    fill="#C1C2C5"
                  />
                  <path
                    d="M16 26C14.8954 26 14 26.8954 14 28C14 29.1046 14.8954 30 16 30V26ZM32 30C33.1046 30 34 29.1046 34 28C34 26.8954 33.1046 26 32 26V30ZM16 30L32 30V26L16 26V30Z"
                    fill="#C1C2C5"
                  />
                </svg>
              )}

              <Title order={2} sx={{ fontWeight: 800 }}>
                Bulletin
              </Title>
            </Group>
            <Group spacing="md">
              <SpotlightButton />
              <ColorSchemeToggle />
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Shell;
