import { useQuery } from "@apollo/client";
import { 
  Skeleton, 
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
  FormControl
} from "@chakra-ui/react";
import { TriangleUpIcon, ChatIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";

import { MotionBox } from "@/components/motionComponents"
import { BOOK_COMMENTS_QUERY } from "@/gql/query.graphql";



export default function BookUpvoteAndComment({bookId}){ 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { loading, error, data } = useQuery(BOOK_COMMENTS_QUERY, {
    variables: { id: bookId },
  });
  
  if(loading){ 
    return(
      <Skeleton height="200px" />
    )
  }
  
  const onSubmit = data => console.log(data);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const book = data?.book;

  return(
    <MotionBox variants={item} w="full" mt="4">
      <Flex align="center" justify="space-between" mb="12">
        <Box>
          <IconButton 
              aria-label="Upvote book" 
              bg="blue.100" 
              color="blue.500" 
              mx="2" 
              ml="0" 
              boxShadow="lg"
              icon={<TriangleUpIcon />} 
              isRound
            />
            32 upvotes
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
            placeholder={`Share your thoughts on ${book.title} here.`}
            bg="gray.50"
            {...register('comment', { required: "Comment is required!",  maxLength: { value: 160, message:"Max comment length is 160" } })}
          />
          <FormErrorMessage color="red.600" mt="0" mb="2">{errors?.comment?.message}</FormErrorMessage>
        </FormControl >
        <Button type="submit" variant="pushableBlue" size="sm" >Comment</Button>
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
