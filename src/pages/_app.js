import { QueryClientProvider, Hydrate } from 'react-query'
import queryClient from './react-query-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useLoginStore from '@/store/login';
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
