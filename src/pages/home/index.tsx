import { Container, Text, Button, Flex } from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";
import { EntriesTable, SlotsTable } from "../../components";

import { useModalState } from "../../hooks";

import { useAppSelector } from "../../redux/hooks";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const HomePage = () => {
  const entries = useAppSelector((state) => state.entries);
  const takenCarSlots = entries?.data
    ?.filter((entry) => entry.vehicle === "car")
    ?.map((entry) => parseInt(`${entry.slot}`));

  const takenMotorSlots = entries?.data
    ?.filter((entry) => entry.vehicle === "motorcycle")
    ?.map((entry) => parseInt(`${entry.slot}`));

  const { openModal } = useModalState();
  return (
    <Container pt={20} pb={15} maxW={"3xl"}>
      <Flex
        justifyContent={"space-between"}
        w={"100%"}
        alignItems={"center"}
        mb={3}
      >
        <Text as={"h1"} fontSize={"2xl"} fontWeight={700} letterSpacing={1}>
          Available slots
        </Text>
      </Flex>

      <Tabs mb={5}>
        <TabList>
          <Tab>Cars</Tab>
          <Tab>Motorcycles</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <SlotsTable count={116} takenSlots={takenCarSlots} />
          </TabPanel>
          <TabPanel px={0}>
            <SlotsTable count={110} takenSlots={takenMotorSlots} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex
        justifyContent={"space-between"}
        w={"100%"}
        alignItems={"center"}
        py={5}
      >
        <Text as={"h1"} fontSize={"2xl"} fontWeight={700} letterSpacing={1}>
          Entries
        </Text>
        <Button
          leftIcon={<FaPlus />}
          fontWeight={700}
          colorScheme="blue"
          size={"sm"}
          onClick={() => openModal("ADD_ENTRY_FORM_MODAL")}
        >
          Add
        </Button>
      </Flex>
      <EntriesTable />
    </Container>
  );
};

export default HomePage;
