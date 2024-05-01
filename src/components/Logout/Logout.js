import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import useUserStore from '@/store/user';
const Logout = () => {
    const router = useRouter();
    const {setUser} = useUserStore()
    const logout = () => {
        Cookies.remove('token');
        setUser(null)
        router.push('/login');
    };

    return <button onClick={logout} className='text-sm bg-customDarkGrey text-white px-3 py-1 rounded-lg outline-none hover:text-black hover:bg-white transition-all duration-100'>Logout</button>;
};

export default Logout