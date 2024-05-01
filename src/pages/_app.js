import { QueryClientProvider, Hydrate } from 'react-query'
import queryClient from './react-query-config'
import "@/styles/globals.css";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({
  Component,
  pageProps: { ...pageProps },
}) {

  const router = useRouter()

  const checkToken = () => {
    const token = Cookies.get('token');
    if (!token && router.pathname !== '/register') {
      router.push('/login');
    }
  }

  useEffect(() => {
    checkToken()
  },[])

  
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
