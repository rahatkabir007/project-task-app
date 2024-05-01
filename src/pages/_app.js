import { QueryClientProvider, Hydrate } from 'react-query'
import queryClient from './react-query-config'
import "@/styles/globals.css";


export default function App({
  Component,
  pageProps: { ...pageProps },
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>

    </>
  );
}
