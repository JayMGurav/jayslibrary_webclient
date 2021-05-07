import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from 'apollo-link-ws';
// https://jayslibrary-server.herokuapp.com/

const LIBRARY_SERVER_HTTP_URL = `http://localhost:4000`;
const LIBRARY_SERVER_ws_URL = `ws://localhost:4000/graphql`;

let apolloClient;
const cache = new InMemoryCache();

const libraryServerHttpLink = new HttpLink({
  uri: LIBRARY_SERVER_HTTP_URL,
  credentials: 'include',
});

const libraryServerWsLink = new WebSocketLink({
  uri: LIBRARY_SERVER_ws_URL,
  options: {
    lazy: true,
    reconnect: true,
    minTimeout: 9000,
  },
  webSocketImpl: require('websocket').w3cwebsocket
});

const splitLink = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);    
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  libraryServerWsLink,
  libraryServerHttpLink
);



function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,
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