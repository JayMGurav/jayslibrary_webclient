import { Center, Text } from "@chakra-ui/react";

export default function BookCoverFallback({title}) {
  return(
    <Center bg="gray.50" h="full" w="full">
     <Text fontSize="xl" fontWeight="medium" >{title}</Text>
    </Center>
  )
}