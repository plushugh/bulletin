import { Center, Group, Title } from "@mantine/core";
import { CodeForm } from "@src/components";
import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <Center sx={{ height: "calc(100vh - 60px)", padding: 0 }}>
      <Group direction="column" align="center">
        <Title
          order={1}
          sx={{
            fontWeight: 800,
            "@media (min-width: 768px)": { fontSize: 50 },
            "@media (min-width: 1024px)": { fontSize: 60 },
          }}
        >
          Enter Code
        </Title>
        <CodeForm />
      </Group>
    </Center>
  );
};

export default Home;
