import Book from "@/components/Book";
import { BOOKS_QUERY } from "@/gql/query.graphql";
import { initializeApollo } from "@/hooks/useApollo";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";


export default function Home({books}){
  return(
    <Box pos="relative" w="100%" maxW="1200px" mx="auto">
      <Flex align="center" justify="center" py="16" textAlign="center">
        <Box maxW="2xl" px="4">
          <Heading as="h1"  size="3xl" fontWeight="bold" m="8">Jay's Library</Heading>
          <Text fontSize="xl" fontWeight="medium" noOfLines={2}>Books that I'm reading, read or would read and the ones that I think are worth paying attention to.</Text>
        </Box>
      </Flex>
      <Flex as="main" align="center" justify="space-evenly" p="4" my="10">
        <Flex maxW="xs" borderRadius="lg" align="center" justify="center" px="4">
          <Text fontSize="3xl" fontFamily="serif" fontWeight="medium">Upvote and comment the one you feel interesting🤩.</Text>
        </Flex>
        {books?.map((book) => (
          <Book key={book.key} book={book}/>
        ))}
      </Flex>
    </Box>
  )
}


export async function getServerSideProps(context) {
  const client = initializeApollo()
  if(client){
    const { data } = await client.query({
      query: BOOKS_QUERY,
      context: {
        headers: {
          ...context.req.headers
        },
      },
    });
    return {
      props: {
        books: data.books
      },
    };
  }
  return {
    props: {
      books: []
    },
  };
}