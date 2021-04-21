import { Box } from "@chakra-ui/layout";
import React from "react";

interface wrapperProps {
  varient?: "small" | "regular";
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  varient = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      w="100%"
      maxW={varient === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};
