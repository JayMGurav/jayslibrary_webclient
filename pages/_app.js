import "@/styles/global.css"

import { ChakraProvider } from "@chakra-ui/react"
import { useApollo } from "@/hooks/useApollo";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion"

import theme from "@/styles/theme";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </ChakraProvider>
    </ApolloProvider>
  )
}
export default MyApp