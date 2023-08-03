import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { store } from "./store/store"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

export const AvilaApp = () => {

    const client = new ApolloClient({
      uri: "https://avila-tek-backend-service.onrender.com/graphql",
      cache: new InMemoryCache()
    })

  

    return (
      <ApolloProvider client={client}>
        <Provider store={ store }>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
}
