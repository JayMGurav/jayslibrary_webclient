import { Box, Center, Text, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function ImageFallbaclComp({title}) {
  return(
    <Center bg="white" h="100px" w="60px">
     <Text fontSize="xl" fontWeight="medium" >{title}</Text>
    </Center>
  )
}


export default function({book}){
  return(
    <Box key={book.id} p="2"  direction="column" borderRadius="lg">
      <Center w="xs" h="sm" bg="white" borderRadius="lg" pos="relative">
        {book.stared && (
          <Box pos="absolute" top="4" right="6" d="flex" alignItems="center" justifyContent="center"  bg="#fff3b0" borderRadius="full" w="30px" h="30px">
            <StarIcon color="#ffc386"/>
          </Box>
        )}
        <Image 
          src={book.cover} 
          fallback={<ImageFallbaclComp title={book.title}/>} 
          filter="drop-shadow(2px 25px 10px rgba(0, 0, 0, 0.15));" 
          borderRadius="xl"
          boxSize="250"
          fit="contain"
          align="center"
        />
      </Center>
      <Box my="4" >
        <Text fontSize="2xl" fontWeight="medium" fontFamily="serif">{book.title}</Text>
        <Text fontSize="md" fontWeight="medium" letterSpacing="wide">{book.author}</Text>
      </Box>
    </Box>
  )
}