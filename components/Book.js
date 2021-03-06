import NextLink from "next/link";
import { Box, Center, Text,  LinkBox, LinkOverlay } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { MotionLinkBox } from "./motionComponents";
// import BookCoverFallback from "./BookCoverFallback";

import Image from 'next/image'


export default function Book({book}){
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  

  return(
    <MotionLinkBox 
      p="2"  
      direction="column" 
      borderRadius="lg"
      variants={item}
      whileHover={{ scale: 1.045 }}
      maxW="md"
    >
      <Center w="xs" h="sm" bg="white" borderRadius="lg" pos="relative">
        {book.stared && (
          <Box pos="absolute" top="4" right="6" d="flex" alignItems="center" justifyContent="center"  bg="#fff3b0" borderRadius="full" w="30px" h="30px">
            <StarIcon color="#ffc386"/>
          </Box>
        )}
        <Image 
          src={book.cover} 
          className="dropShadow"
          width="250"
          height="300"
          layout="fixed"
          quality="60"
          loading ="lazy"
          objectFit="contain"
          objectPosition="center top"
          // initial={{ x: 60, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // transition={{ delay: 0.25 }}
          // exit={{ x: 60, opacity: 0 }}
        />
      </Center>
      <Box my="4" >
        <NextLink href="/book/[id]" as={`/book/${book.id}`} passHref 
        >
        <LinkOverlay >
          <Text wordBreak="break-word" maxW="xs" fontSize="xl" fontWeight="medium">{book.title}</Text>
        </LinkOverlay>
        </NextLink>
        <Text fontSize="md" fontWeight="medium" letterSpacing="wide">{book.author}</Text>
      </Box>
    </MotionLinkBox>
  )
}