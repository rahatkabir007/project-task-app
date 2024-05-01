import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
const Logout = () => {
    const router = useRouter();

    const logout = () => {
        Cookies.remove('token');
        router.push('/login');
    };

    return <button onClick={logout}>Logout</button>;
};

export default Logout