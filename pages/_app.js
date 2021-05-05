import "@/styles/global.css"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/styles/theme";
import { useApollo } from "@/hooks/useApollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log(pageProps);
  
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}
export default MyApp