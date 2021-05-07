import { Center, Text } from "@chakra-ui/react";

export default function BookCoverFallback({title}) {
  return(
    <Center bg="white" h="full" w="full">
     <Text fontSize="xl" fontWeight="medium" >{title}</Text>
    </Center>
  )
}