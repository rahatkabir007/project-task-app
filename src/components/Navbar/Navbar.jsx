import React from 'react'
import Logout from '../Logout/Logout'
import Link from 'next/link'
import useUserStore from '@/store/user'
import { UserOutlined } from '@ant-design/icons'

const Navbar = () => {
    const {user} = useUserStore()

    return (
        <div className='bg-indigo-500'>
            <div className='container-x py-5 flex justify-between flex-col md:flex-row gap-y-3 items-center'>
                <Link href={'/'} className='text-lg font-bold text-white'>Project Management App</Link>
                <div className='flex flex-col gap-2 md:flex-row items-center'>
                    <div className='text-white flex items-center gap-1'>
                        <span><UserOutlined /></span>
                        <span>{user?.name}</span>
                   </div>
                    <Logout /></div>
            </div>
        </div>
    )
}

export default Navbar