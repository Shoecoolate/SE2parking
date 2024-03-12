import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  VStack,
  Select,
  Flex,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useModalState } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addEntry } from "../../redux/slices/entry-slice";
import { v4 as uuidv4 } from "uuid";

import { useForm } from "react-hook-form";
import { EntriesProps } from "../../types";

import { getClosestAvailableSlot } from "../../lib/get-closest-available-slot";
import { FaStar } from "react-icons/fa";

const EntryFormModal = () => {
  const entries = useAppSelector((state) => state.entries);
  const takenCarSlots = entries?.data
    ?.filter((entry) => entry.vehicle === "car")
    ?.map((entry) => parseInt(`${entry.slot}`));

  const takenMotorSlots = entries?.data
    ?.filter((entry) => entry.vehicle === "motorcycle")
    ?.map((entry) => parseInt(`${entry.slot}`));
  const studentNumbers = entries.data.map((entry) => entry.studentNo);
  const closestAvailableCarSlot = getClosestAvailableSlot({
    slots: [...Array(116)].map((_, i) => i + 1),
    takenSlots: takenCarSlots,
  });
  const closestAvailableMotorSlot = getClosestAvailableSlot({
    slots: [...Array(116)].map((_, i) => i + 1),
    takenSlots: takenMotorSlots,
  });
  const { isOpen, closeModal } = useModalState();
  const dispatch = useAppDispatch();

  const form = useForm<EntriesProps>();

  const vehicleType = form.watch("vehicle");
  const studentNumber = form.watch("studentNo");

  const onSubmit = (values: EntriesProps) => {
    if (studentNumbers?.includes(studentNumber)) {
      return form.setError("studentNo", {
        message: "Student number is already taken.",
      });
    }

    dispatch(addEntry({ ...values, id: uuidv4(), date: `${new Date()}` }));
    closeModal();
  };

  return (
    <Modal isOpen={isOpen("ADD_ENTRY_FORM_MODAL")} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Add an entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <FormControl
                isInvalid={Boolean(form.formState.errors?.studentNo)}
              >
                <FormLabel>Student #</FormLabel>
                <Input
                  {...form.register("studentNo", {
                    required: "Student # is required.",
                  })}
                  colorScheme="purple"
                  variant={"filled"}
                  placeholder="e.g. 2019456"
                />
                {form.formState.errors?.studentNo?.message && (
                  <FormErrorMessage>
                    {form.formState.errors?.studentNo?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={Boolean(form.formState.errors?.vehicle)}>
                <FormLabel>Vehicle</FormLabel>
                <Select
                  {...form.register("vehicle", {
                    required: "Vehicle is required.",
                  })}
                  variant={"filled"}
                  placeholder="Select option"
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                </Select>
                {form.formState.errors?.vehicle?.message && (
                  <FormErrorMessage>
                    {form.formState.errors?.vehicle?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={Boolean(form.formState.errors?.plateNo)}>
                <FormLabel>Plate #</FormLabel>
                <Input
                  {...form.register("plateNo", {
                    required: "Plate # is required.",
                    pattern: {
                      value:
                        vehicleType === "car"
                          ? /^[A-Z]{3}-\d{4}$/
                          : /^\d{3}-[A-Z]{3}$/,
                      message: "DDD-LLLL for cars & LLL-DDD for motorcyles",
                    },
                  })}
                  variant={"filled"}
                  placeholder="e.g. AAA-1234 or 123-AAA"
                />
                {form.formState.errors?.plateNo?.message ? (
                  <FormErrorMessage>
                    {form.formState.errors?.plateNo?.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    DDD-LLLL for cars & DDD-LL for motorcyles
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl isInvalid={Boolean(form.formState.errors?.slot)}>
                <FormLabel>Slot #</FormLabel>
                <Select
                  {...form.register("slot", {
                    required: "Slot is required.",
                  })}
                  variant={"filled"}
                  placeholder="Select option"
                >
                  {[...Array(vehicleType === "car" ? 116 : 110)].map((_, i) => (
                    <option
                      disabled={
                        vehicleType === "car"
                          ? takenCarSlots?.includes(i + 1)
                          : takenMotorSlots?.includes(i + 1)
                      }
                      value={i + 1}
                      key={i}
                    >
                      Slot {i + 1}
                    </option>
                  ))}
                </Select>
                {form.formState.errors?.slot?.message ? (
                  <FormErrorMessage>
                    {form.formState.errors?.slot?.message}
                  </FormErrorMessage>
                ) : (
                  <>
                    {vehicleType && (
                      <FormHelperText
                        display={"flex"}
                        alignItems={"center"}
                        gap={1.5}
                        _dark={{ color: "blue.300", fontWeight: "bold" }}
                      >
                        <Box as="span" mb={0.5}>
                          <FaStar fontSize={16} />
                        </Box>{" "}
                        Nearest available slot is #
                        {vehicleType === "car"
                          ? closestAvailableCarSlot
                          : closestAvailableMotorSlot}
                      </FormHelperText>
                    )}
                  </>
                )}
              </FormControl>
            </VStack>

            <Flex justifyContent={"end"} pt={5} pb={4}>
              <HStack gap={2}>
                <Button
                  onClick={closeModal}
                  variant={"ghost"}
                  colorScheme="blue"
                >
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
              </HStack>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EntryFormModal;
