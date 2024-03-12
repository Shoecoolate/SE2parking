import { Box, Container, Badge, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
  const { setColorMode, colorMode } = useColorMode();

  const handleColorMode = () =>
    setColorMode(colorMode === "dark" ? "light" : "dark");
  return (
    <Box as="nav" pos={"fixed"} w={"100%"}>
      <Container
        display={"flex"}
        justifyContent={"space-between"}
        maxW={"3xl"}
        py={17}
      >
        <Badge
          variant="subtle"
          colorScheme="blue"
          _light={{
            borderColor: "blue.500",
            color: "white",
            bg: "blue.500",
          }}
          fontWeight={"black"}
          fontSize={"2xl"}
          rounded={"xl"}
          px={2.5}
          py={0.5}
          letterSpacing={1}
          lineHeight={1.25}
          textTransform={"lowercase"}
          border={"2px"}
        >
          ParkMe
        </Badge>
        <IconButton
          variant="ghost"
          aria-label="color-mode-toggle"
          onClick={handleColorMode}
          icon={
            colorMode === "dark" ? (
              <IoSunnyOutline fontSize={24} />
            ) : (
              <IoMoonOutline fontSize={24} />
            )
          }
        />
      </Container>
    </Box>
  );
};

export default Navbar;
