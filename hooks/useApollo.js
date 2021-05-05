import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';


let apolloClient;
const cache = new InMemoryCache();

const libraryServerLink = new HttpLink({
  uri: "http://localhost:4000/",
  credentials: 'include',
});


function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: libraryServerLink,
    cache,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if(initialState){
    _apolloClient.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}