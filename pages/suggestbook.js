// import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { 
  Spinner, 
  Heading,
  Box, 
  Flex,
  Text, 
  Link,
  Input,
  FormControl,
  Button,
  Alert,
  AlertDescription,
  FormErrorMessage,
  AlertIcon,
} from "@chakra-ui/react";
import Head from 'next/head'
import NextLink from "next/link";


import { useForm } from 'react-hook-form';
import useError from "@/hooks/useError";
import Layout from "@/components/Layout";
import { SUGGESTED_BOOKS } from "@/gql/query.graphql";
import { useState } from "react";
import { SUGGEST_BOOK } from "@/gql/mutations.query";

export default function SuggestedBooks(){
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const { isError, errorMsg, setError } = useError();
  const { register, formState: { errors }, handleSubmit, reset  } = useForm();
  const { data: queryResult, loading: queryLoading } = useQuery(SUGGESTED_BOOKS, {
    onError: (error) => {
      setError(error.message);
    }
  });

  
  const [suggestBook] = useMutation(SUGGEST_BOOK, {
    update: (cache, { data: { suggestBook } }) => {
      cache.modify({
        fields: {
          suggestedBooks(existingSuggestedBooks = []) {
            const newSuggestionRef = cache.writeFragment({
              data: suggestBook,
              fragment: gql`
                fragment NewSuggestBook on SuggestedBook {
                  id
                  title
                  author
                }
              `
            });
            
            return [newSuggestionRef, ...existingSuggestedBooks ];
          }
        }
      });
    },

    
    onCompleted: () => {
      reset({title:"", author:"" });
      setLoading(() => {
        setLoadingMsg("");
        return false
      });
    },
    onError: (error) => {
      setError(error.message);
      setLoading(() => {
        setLoadingMsg("");
        return false
      });
    }
  }); 


  if(queryLoading){
    return(
      <Flex w="full" h="100vh" align="center" justify="center">
        <Spinner size="lg" color="blue.600" thickness="2px"/>
      </Flex>
    )
  }


  
  const onSubmit = ({title, author}) => {
    setLoading(() => {
      setLoadingMsg("Suggesting...")
      return true;
    });
    suggestBook({
      variables: {title, author}
    });
  }
  
  const suggestedBooks = queryResult?.suggestedBooks;  

  return(
    <Layout>
      <Head>
        <title>Jay's Library | Suggest Book</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex align="center" justify="center" py="16" textAlign="center">
        <Box maxW="2xl" px="4">
          <Heading as="h1"  size="xl" fontWeight="bold" m="2">Suggest me a book📖</Heading>
          <Text fontSize="lg" fontWeight="medium">Tell me some of your precious good reads of any genre, that you found interesting!</Text>
          <Text>or</Text>
          <NextLink href="/" passHref>
            <Link fontSize="lg" color="blue.400" mt="4">
              Go back to Library
            </Link>
          </NextLink>
        </Box>
      </Flex>
      <Flex  direction="column">
        { isError && (
          <Alert status="error" my="4" borderRadius="md" color="red.900">
            <AlertIcon />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>)
        }
        <Flex as="form" wrap="wrap" style={{gap:"2ch"}} onSubmit={handleSubmit(onSubmit)}>
            <FormControl  
            id="title" 
            isInvalid={errors.title && errors.title?.message} flex="2 1 10ch">
            <Input 
              name="title" 
              type="text" 
              bg="black.400" 
              borderRadius="md" 
              border="none" 
              flex="2 2 30ch"
              boxShadow="sm"
              errorBorderColor="red.600"
              placeholder="Book title"
              {...register('title', { required: "Book title is required", maxLength: { value: 50, message:"Max length 50"}})}
            />
             <FormErrorMessage color="red.600">{errors?.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl  
            id="author" 
            isInvalid={errors.author && errors.author?.message} flex="3 1 20ch">
            <Input 
              name="author" 
              type="text" 
              bg="black.400" 
              borderRadius="md" 
              border="none" 
              flex="2 2 30ch"
              boxShadow="sm"
              errorBorderColor="red.600"
              placeholder="Book author"
              {...register('author', { required: "Book author is required",  maxLength: { value: 50, message:"Max length 50" }})}
            />
             <FormErrorMessage color="red.600">{errors?.author?.message}</FormErrorMessage>
          </FormControl>
          <Button 
            type="submit" 
            flex="1 1 10ch"
            variant="pushableBlue"
            borderRadius="md"
            px="4"
          >
            {loading ? loadingMsg : "Suggest" } 
          </Button>
        </Flex>
        <Box mt="10" bg="gray.50" p="4" borderRadius="xl">
          {suggestedBooks.length > 0 ? (
            <>
              <Text my="4" fontSize="xl" textAlign="center">📚 Suggested books</Text>
              <Flex align="center" justify="space-between" p="2" px="10" wrap="wrap" style={{gap:"2ch"}}>
                <Text fontWeight="semibold">Book title</Text>
                <Text fontWeight="semibold">Book author</Text>
              </Flex>
              {suggestedBooks?.map((book) => (
                <Flex key={book.id} align="center" justify="space-between" boxShadow="sm" borderRadius="lg" p="2" bg="#fff" px="10" wrap="wrap" style={{gap:"2ch"}} mb="3" >
                  <Text>{book.title}</Text>
                  <Text>{book.author}</Text>
                </Flex>
              ))}
            </>
          ) : (
            <Box my="4" textAlign="center" py="4">
              <Heading>No Suggestions Yet!</Heading>
              <Text>Go ahead and suggest me some nice books</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Layout>
  )
}


// export async function getServerSideProps(context) {
//   const client = initializeApollo()
//   if(client){
//     const { data } = await client.query({
//       query: BOOKS_QUERY,
//       context: {
//         headers: {
//           ...context.req.headers
//         },
//       },
//     });
//     return {
//       props: {
//         books: data.books
//       },
//     };
//   }
//   return {
//     props: {
//       books: []
//     },
//   };
// }