import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head'


import BookCoverFallback from "@/components/BookCoverFallback";
import Layout from "@/components/Layout";
import { MotionBox, MotionImage, MotionText, MotionLink, MotionHeading } from "@/components/motionComponents"
import { 
  Box, 
  Flex, 
  Text, 
  Center,
  Alert,
  Spinner,
  AlertDescription,
  AlertIcon,
  Link
} from "@chakra-ui/react";

import { ChevronLeftIcon } from '@chakra-ui/icons'
// import { initializeApollo } from "@/hooks/useApollo";
import { BOOK_DETAILS_QUERY } from "@/gql/query.graphql";
import BookUpvoteAndComment from "@/components/BookUpvoteAndComment";
import useError from "@/hooks/useError";
import SEO from "@/components/Seo";


export default function BookDetailsPage({bookId}){

  // console.log({bookId});
  // const router = useRouter()
  // const { id } = router.query;
  const { isError, errorMsg, setError } = useError();

  const { data, loading } = useQuery(BOOK_DETAILS_QUERY, {
    // skip: book,
    variables:{
      id: bookId
    },
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
        staggerChildren: 0.1,
        delay: 0.35
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }


  const book = data?.book;

  return(
    <Layout>
       <SEO title={`${book.title}`} description={`${book.title} from Jay's Library`} url={window.location.href}/>
      <Head>
        <title>Jay's Library | {book.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      { isError && (
        <Alert status="error" my="4" borderRadius="md" color="red.900">
          <AlertIcon />
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
        )
      }
      <Flex w="100%" wrap="wrap" py="4"  style={{gap: "2ch"}} pos="relative">
        <Center 
          flex="1 1 30ch" 
          bg="#fff" 
          p="4" 
          h="90vh"
          maxH="700px" 
          boxShadow="sm" 
          borderRadius="lg" 
          flexDirection="column" 
          pos={{
            sm:"unset",
            md:"sticky",
          }} 
          top="10"
        >
          <MotionImage
            src={book.cover} 
            // fallback={<BookCoverFallback title={book.title}/>} 
            filter="drop-shadow(2px 25px 10px rgba(0, 0, 0, 0.15));" 
            boxSize="350"
            fit="contain"
            align="center"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            exit={{ x: 60, opacity: 0 }}
          />
        </Center>
        <Box
          flex="2 2 30ch"
          minH="min-content"
        >
          <MotionBox variants={container}
            initial="hidden"
            animate="show" 
            maxW="lg" 
            mx="auto" 
            mt="16">
            <NextLink href="/" passHref >
              <MotionLink 
                fontSize="lg" 
                fontWeight="medium" 
                letterSpacing="wide"
                w="fit-content"
                color="gray.400"
                variants={item}
                colorScheme="blue"
              >
                <ChevronLeftIcon/>  Back to Library
              </MotionLink>
            </NextLink>
            <MotionText variants={item} mt="14" fontSize="md" fontWeight="medium" letterSpacing="wide">
              By {book.author}
            </MotionText>
            <MotionHeading variants={item} as="h1" my="2" fontSize="5xl" color="black">{book.title}</MotionHeading> 
            <MotionText variants={item} letterSpacing="wide" mb="6" fontSize="xl" >{book.caption}</MotionText>
            <MotionText variants={item} letterSpacing="wide" fontSize="md">{book.info}</MotionText>
            <MotionText variants={item} mt="6" fontSize="md" fontWeight="medium" letterSpacing="wide" color="gray.400" >
              WANT TO SHARE? <Link href={`http://twitter.com/share?text=I just now found an interesting book titled "${book.title}" from @JayMGurav library.&url=${window.location.href}&hashtags=GoodReads,Books`} color="gray.800" rel="noopener noreferer" isExternal>Tell Twitter about it.</Link>
            </MotionText>
            <BookUpvoteAndComment bookId={book.id} title={book.title}/>
          </MotionBox>
        </Box>
      </Flex>
    </Layout>
  )
}



export async function getServerSideProps(context) {
  const {id} = context.params;
  // const client = initializeApollo()
  // if(client){
  //   const { data } = await client.query({
  //     query: BOOK_DETAILS_QUERY,
  //     variables:{
  //       id
  //     },
  //     context: {
  //       headers: {
  //         ...context.req.headers
  //       },
  //     },
  //   });
  //   return {
  //     props: {
  //       book: data.book
  //     },
  //   };
  // }
  return {
    props: {
      bookId: id
    },
  };
}

