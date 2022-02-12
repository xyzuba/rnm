import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
