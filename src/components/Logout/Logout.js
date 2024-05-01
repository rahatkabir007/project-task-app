import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLoginStore from '@/store/login'

const Logout = () => {
    const logout = useLoginStore(state => state.logout)
    const router = useRouter()

    useEffect(() => {
        logout()
        router.push('/login')
    }, [])

    return null
}

export default Logout