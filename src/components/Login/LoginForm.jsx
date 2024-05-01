import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import useUserStore from '@/store/user';
import Cookies from 'js-cookie';
import { loginUser, getUserByEmail } from '@/ReactQueryApis/api';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import LoginImg from "@/assets/svg/login.svg"

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const queryClient = useQueryClient();
    const setUser = useUserStore(state => state.setUser);

    const loginMutation = useMutation(loginUser, {
        onSuccess: async (token, variables) => {
            if (!token) {
                message.error('User not found. Please Login.');
                router.push('/Login');
            } else {
                const userData = await getUserByEmail(variables.email);
                Cookies.set('user', JSON.stringify(userData));
                setUser(userData);
                queryClient.invalidateQueries('user');
                Cookies.set('token', token);
                router.push('/');
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            message.error('Login failed. Please check your credentials and try again.');
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    useEffect(() => {
        if (Cookies.get('token')) {
            router.push('/');
        }
    }, [])

    return (
        <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10 order-2">
                        <Image
                            src={LoginImg}
                            alt="Login"
                            width={1000}
                            height={1000}
                            objectFit='cover'
                        />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10 order-1">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                            <p>Enter your information to Login</p>
                            <div>Not Registered? <Link className='text-blue-600 underline' href={'/register'}>Register Now</Link></div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} >

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><MailOutlined /></div>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="Enter your Email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                            )} />

                                    </div>
                                    {errors.email && <span style={{ color: 'red', fontSize: "12px" }}>Email is required</span>}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><LockOutlined /></div>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Input.Password {...field} placeholder="Enter your password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                            )} />
                                    </div>
                                    {errors.password && <span style={{ color: 'red', fontSize: "12px" }}>Password is required</span>}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button type='submit' className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;