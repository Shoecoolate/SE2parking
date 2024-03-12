import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  IconButton,
  TableCaption,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  HStack,
  Text,
} from "@chakra-ui/react";

import { FaTrash } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { removeEntry } from "../../redux/slices/entry-slice";
import {
  IoSearch,
  IoCloseCircleOutline,
  IoChevronBackSharp,
  IoChevronForward,
} from "react-icons/io5";
import moment from "moment";
import { EntriesProps } from "../../types";

const usePagination = (items: EntriesProps[] = [], page = 1, perPage = 10) => {
  const [activePage, setActivePage] = React.useState(page);
  const totalPages = Math.ceil(items.length / perPage);
  const offset = perPage * (activePage - 1);
  const paginatedItems = items.slice(offset, perPage * activePage);

  return {
    activePage,
    nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
    previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
    totalPages,
    totalItems: items.length,
    items: paginatedItems,
  };
};

const EntriesTable = () => {
  const [search, setSearch] = React.useState("");
  const [filteredEntries, setFilteredEntries] = React.useState<EntriesProps[]>(
    []
  );

  const {
    items: paginatedEntries,
    nextPage,
    previousPage,
    activePage,
    totalPages,
  } = usePagination(filteredEntries, 1, 5);

  const columns = [
    "Student #",
    "Vehicle",
    "Plate #",
    "Slot #",
    "Date",
    "Action",
  ];

  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.entries.data);

  const handleSearch = React.useCallback(() => {
    if (search) {
      const stringChecker = (value: string | number) => {
        return value.toString().toLowerCase().includes(search);
      };

      const filtered = entries.filter((entry) => {
        const hasStudentNo = stringChecker(entry.studentNo);
        const hasPlateNo = stringChecker(entry.plateNo);
        const hasVehicle = stringChecker(entry.vehicle);
        const hasSlot = stringChecker(entry.slot);

        if (hasStudentNo || hasPlateNo || hasVehicle || hasSlot) {
          return entry;
        }
      });

      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [search, entries]);

  React.useEffect(() => {
    void handleSearch();
  }, [handleSearch]);

  return (
    <>
      <Box mb={6}>
        <InputGroup>
          <InputLeftElement>
            <IoSearch fontSize={21} />
          </InputLeftElement>
          <Input
            rounded={"xl"}
            variant={"filled"}
            placeholder="Looking for something?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <InputRightElement>
              <IconButton
                onClick={() => setSearch("")}
                aria-label="remove-search"
                variant={"ghost"}
                size={"xs"}
                rounded={"full"}
                icon={<IoCloseCircleOutline fontSize={21} />}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
      <Card rounded={"2xl"}>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              {entries.length <= 0 && !search && (
                <TableCaption textAlign={"center"}>
                  No entries yet today.
                </TableCaption>
              )}

              {filteredEntries.length <= 0 && search && (
                <TableCaption textAlign={"center"}>No records.</TableCaption>
              )}
              <Thead>
                <Tr>
                  {columns.map((col, i) => (
                    <Th key={i}>{col}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {entries.length > 0 &&
                  paginatedEntries.map((entry, i) => (
                    <Tr key={i}>
                      <Td>{entry.studentNo}</Td>
                      <Td>{entry.vehicle}</Td>
                      <Td>{entry.plateNo}</Td>
                      <Td>{entry.slot}</Td>
                      <Td>{moment(entry.date).format("MMM DD, YYYY")}</Td>
                      <Td>
                        <IconButton
                          onClick={() =>
                            dispatch(removeEntry({ entryId: entry.id }))
                          }
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          aria-label="remove-entry"
                          icon={<FaTrash />}
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {totalPages > 1 && (
              <Box w={"100%"} pt={4}>
                <HStack w={"100%"}>
                  <IconButton
                    onClick={previousPage}
                    size={"sm"}
                    aria-label="back"
                    icon={<IoChevronBackSharp />}
                  />

                  <IconButton
                    onClick={nextPage}
                    size={"sm"}
                    aria-label="next"
                    icon={<IoChevronForward />}
                  />

                  <Box>
                    <Text fontSize={"sm"}>
                      page {activePage} of {totalPages}{" "}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default EntriesTable;
