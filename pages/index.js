import Book from "@/components/Book";
import Layout from "@/components/Layout";
import { MotionFlex } from "@/components/motionComponents";
import { BOOKS_QUERY } from "@/gql/query.graphql";
import { initializeApollo } from "@/hooks/useApollo";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";


export default function Home({books}){

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  
  return(
    <Layout>
      <Flex align="center" justify="center" py="16" textAlign="center">
        <Box maxW="2xl" px="4" >
          <Heading as="h1"  size="3xl" fontWeight="bold" m="8">Jay's Library</Heading>
          <Text fontSize="xl" fontWeight="medium" noOfLines={2}>Books that I'm reading, read or would read and the ones that I think are worth paying attention to.</Text>
        </Box>
      </Flex>
      <MotionFlex 
        as="main" 
        align="center" 
        justify="space-evenly" 
        p="4" 
        my="10" 
        style={{gap: '4ch'}} 
        wrap="wrap"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <MotionFlex 
          maxW="xs" 
          borderRadius="lg" 
          align="center" 
          justify="center" 
          px="4" 
          flex="2 2 20ch"
          variants={item} 
        >
          <Text fontSize="3xl"  fontWeight="medium">Upvote and comment the one you feel interesting🤩.</Text>
        </MotionFlex>
        {books?.map((book) => (
          <Book 
            key={book.id} 
            book={book}
          />
        ))}
      </MotionFlex>
    </Layout>
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