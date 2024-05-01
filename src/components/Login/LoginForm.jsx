import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {  Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import useUserStore from '@/store/user';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const queryClient = useQueryClient();
    const setUser = useUserStore(state => state.setUser);

    const loginMutation = useMutation(
        async (data) => {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const { token } = await response.json();
            return token;
        },
        {
            onSuccess: async (token, variables) => {
                if (!token) {
                    message.error('User not found. Please register.');
                    router.push('/register');
                } else {
                    Cookies.set('token', token);
                    const userResponse = await fetch(`/api/user?email=${variables.email}`);
                    const userData = await userResponse.json();
                    Cookies.set('user', JSON.stringify(userData));

                    setUser(userData);
                    queryClient.invalidateQueries('user');
                    router.push('/');
                }
            },
            onError: (error) => {
                console.error('Login error:', error);
                message.error('Login failed. Please check your credentials and try again.');
            },
        }
    );

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    useEffect(() => {
        if (Cookies.get('token')) {
            router.push('/');
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2' >
                <label>Email</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input {...field} placeholder="Enter your Email" />
                    )} />
                {errors.email && <span style={{ color: 'red', fontSize: "12px" }}>Email is required</span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label>Password</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input.Password {...field} placeholder="Enter your password" />
                    )} />
                {errors.password && <span style={{ color: 'red', fontSize: "12px" }}>Password is required</span>}
            </div>
            <div>
                <Button type="primary" htmlType="submit">Register</Button>
            </div>

        </form>
    );
};

export default LoginForm;