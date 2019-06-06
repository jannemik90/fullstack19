import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { setContext } from 'apollo-link-context'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const cache = new InMemoryCache();


const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: { reconnect: true }
  })

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('app-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    }
})

const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink),
  )

const client = new ApolloClient({
    cache,
    link
})

ReactDOM.render(
<ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
        <App />
    </ApolloHooksProvider>
</ApolloProvider>
, document.getElementById('root'))