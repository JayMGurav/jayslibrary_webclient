import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { 
  Spinner, 
  Box, 
  Flex,
  Icon, 
  Text, 
  VStack,
  Button, 
  IconButton, 
  Textarea,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon
} from "@chakra-ui/react";
import { TriangleUpIcon, ChatIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";

import { MotionBox } from "@/components/motionComponents"
import { BOOK_COMMENTS_QUERY, BOOK_VOTES_QUERY } from "@/gql/query.graphql";
import { ADD_BOOK_COMMENT, UPVOTE_BOOK } from "@/gql/mutations.query";
import { BOOK_UPVOTED_SUBSCRIPTION, COMMENT_CREATED_SUBSCRIPTION } from "@/gql/subscriptions.query";
import useError from "@/hooks/useError";


export default function BookUpvoteAndComment({bookId,title}){ 
  const { register, handleSubmit,  formState: { errors } , reset  } = useForm();
  const { isError, errorMsg, setError } = useError();
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  // Queries
  const { data, loading: commentLoading, subscribeToMore:subscribeToComments } = useQuery(BOOK_COMMENTS_QUERY, {
    variables: { id: bookId },
    onError: (error) => {
      setError(error.message);
    }
  });
  
  const { data:voteData, subscribeToMore:subscribeToVotes  } = useQuery(BOOK_VOTES_QUERY, {
    variables: { id: bookId },
    onError: (error) => {
      setError(error.message);
    }
  });
  
  // Subscriptions
  subscribeToVotes({
    document: BOOK_UPVOTED_SUBSCRIPTION
  })

  subscribeToComments({
    document: COMMENT_CREATED_SUBSCRIPTION
  })


  const [addComment] = useMutation(ADD_BOOK_COMMENT , {    
    onCompleted: () => {
      reset({comment:""});
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
  
  const [upvoteBook] = useMutation(UPVOTE_BOOK , {
    variables:{
      bookId
    },    
    // onCompleted: () => {
      // reset({comment:""});
      // setLoading(() => {
      //   setLoadingMsg("");
      //   return false
      // });
    // },
    onError: (error) => {
      setError(error.message);
    }
  }); 
  

  const onSubmit = data => {
    setLoading(() => {
      setLoadingMsg("One moment!");
      return true;
    });
    addComment({
      variables: {
        comment: data.comment,
        bookId
      }
    })
  };


  if(commentLoading){ 
    return(
      <Spinner color="blue.100" />
    )
  }


  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const book = data?.book;

  return(
    <MotionBox variants={item} w="full" mt="4">
        { isError && (
          <Alert status="error" my="4" borderRadius="md" color="red.900">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>)
        }
      <Flex align="center" justify="space-between" mb="12">
        <Box>
          <IconButton 
              aria-label="Upvote book" 
              mx="2" 
              ml="0" 
              boxShadow="lg"
              variant="pushableBlue"
              isRound
              icon={<TriangleUpIcon />} 
              onClick={upvoteBook}
            />
            {voteData?.book.voteCount} upvotes
        </Box>
        <Box d="inline">
          <Icon as={ChatIcon}/> {book.comments.length} comments
        </Box>
      </Flex>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl 
            id="comment"
            isInvalid={errors.comment && errors.comment?.message}
          >
          <FormLabel>Comment here.</FormLabel>
          <Textarea 
            name="comment" 
            w="100%" 
            resize="vertical"
            errorBorderColor="red.600"
            placeholder={`Share your thoughts on ${title} here.`}
            bg="gray.50"
            {...register('comment', { required: "Comment is required!",  maxLength: { value: 160, message:"Max comment length is 160" } })}
          />
          <FormErrorMessage color="red.600" mt="0" mb="2">{errors?.comment?.message}</FormErrorMessage>
        </FormControl >
        <Button type="submit" disabled={loading || isError } variant="pushableBlue" size="sm" >{loading ? loadingMsg : "Comment"}</Button>
      </Box>
      <VStack spacing="3" align="stretch" py="6"> 
        {book.comments.map((comment) => (
            <Box key={comment.id} bg="gray.50" p="2" borderRadius="md" boxShadow="sm">
              <Text fontSize="xs" color="gray.400">Posted on: {new Date(Number(comment.createdAt)).toLocaleString('en-US')}</Text>
              <Text>{comment.comment}</Text>
            </Box>
          ))}
      </VStack>
    </MotionBox>
  )
}
