import { Flex, Text } from "@chakra-ui/react";

const SlotsTable = ({
  takenSlots,
  count,
}: {
  takenSlots: number[];
  count: number;
}) => {
  return (
    <Flex wrap={"wrap"} gap={1}>
      {[...Array(count)].map((_, i) => {
        const isOccupied = takenSlots.includes(i + 1);

        return (
          <Flex
            rounded={"lg"}
            justifyContent={"center"}
            alignItems={"center"}
            key={i}
            _dark={{
              bg: isOccupied ? "red.400" : "blue.900",
            }}
            _light={{
              bg: isOccupied ? "red.300" : "blue.100",
            }}
            h={7}
            w={7}
            _hover={
              isOccupied
                ? { cursor: "not-allowed" }
                : {
                    _dark: { bg: "blue.500", cursor: "pointer" },
                    _light: { bg: "blue.200", cursor: "pointer" },
                  }
            }
          >
            <Text fontSize={"xs"}>{i + 1}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default SlotsTable;
