import { Center, Text } from "@chakra-ui/react";

export default function BookCoverFallback({title}) {
  return(
    <Center bg="white" h="100px" w="60px">
     <Text fontSize="xl" fontWeight="medium" >{title}</Text>
    </Center>
  )
}