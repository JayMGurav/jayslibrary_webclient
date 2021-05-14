// import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { 
  Spinner, 
  Heading,
  Box, 
  Flex,
  Text, 
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Link
} from "@chakra-ui/react";
import NextLink from "next/link";
import Head from 'next/head'

// import { initializeApollo } from "@/hooks/useApollo";
import useError from "@/hooks/useError";
import Book from "@/components/Book";
import Layout from "@/components/Layout";
import { MotionFlex } from "@/components/motionComponents";
import { BOOKS_QUERY } from "@/gql/query.graphql";
import { useRouter } from "next/router";
import SEO from "@/components/Seo";

export default function Home({fullUrl}){ 
  const { isError, errorMsg, setError } = useError();

  const { data, loading } = useQuery(BOOKS_QUERY, {
    onError: (error) => {
      setError(error.message);
    }
  });

  if(loading){
    return(
      <Flex w="full" h="100vh" align="center" justify="center">
        <Spinner size="lg" color="blue.600" thickness="2px"/>
      </Flex>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  
  const books = data?.books;
  
  return(
    <Layout>
      <SEO title="Jays Library" description="Here is a collection of all the books that I am reading, read or would read also the ones that I found interesting and are worth paying attention to." url={fullUrl}/>
      <Head>
        <title>Jay's Library</title>
        
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex align="center" justify="center" py="16" textAlign="center">
        <Box maxW="2xl" px="4" >
          { isError && (
            <Alert status="error" my="4" borderRadius="md" color="red.900">
              <AlertIcon />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>)
          }
          <Heading as="h1"  size="3xl" fontWeight="bold" m="8" mb="6">Jay's Library</Heading>
          <Flex style={{gap: "2ch"}} align="center" justify="center" mb="8" color="blue.400">
            <Link rel="noopener noreferer" href="https://twitter.com/JayMGurav" isExternal>
              Twitter
            </Link>
            <Link rel="noopener noreferer" href="https://github.com/JayMGurav" isExternal>
              GitHub
            </Link>
            <Link rel="noopener noreferer" href="https://linkedin.com/in/JayMGurav" isExternal>
              LinkedIn
            </Link>
          </Flex>
          <Text fontSize="xl" fontWeight="medium" >Here is a collection of all the books that I am reading, read or would read also the ones that I found interesting and are worth paying attention to.</Text>
          <Text>or</Text>
          <NextLink href="/suggestbook" passHref>
            <Link fontSize="lg" color="blue.400" mt="4">
              Suggest me a book
            </Link>
          </NextLink>
        </Box>
      </Flex>
      <MotionFlex 
        // as="main" 
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


export async function getServerSideProps({req}) {
  let fullUrl
  if (req) {
     // Server side rendering
     fullUrl = req.headers.referer
   } else {
     // Client side rendering
     fullUrl = window.location.href;
   }
  return {
    props: {
      fullUrl
    },
  };
}