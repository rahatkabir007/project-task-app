import { QueryClientProvider, Hydrate } from 'react-query'
import queryClient from './react-query-config'
import "@/styles/globals.css";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserStore from '@/store/user';

export default function App({
  Component,
  pageProps: { ...pageProps },
}) {

  const router = useRouter()
  const setUser = useUserStore(state => state.setUser);

  const checkToken = () => {
    const token = Cookies.get('token');
    if (!token && router.pathname !== '/register') {
      router.push('/login');
    }
  }

  useEffect(() => {
    checkToken()
  }, [])


  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log("🚀 ~ useEffect ~ user:", user)
      queryClient.setQueryData('user', user);
      setUser(user)
    }
  }, [])


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
