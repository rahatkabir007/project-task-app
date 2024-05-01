import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import useUserStore from '@/store/user';
import Cookies from 'js-cookie';
import { loginUser, getUserByEmail } from '@/ReactQueryApis/api';
// import { getUserByEmail } from '@/ReactQueryApis/api';

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const queryClient = useQueryClient();
    const setUser = useUserStore(state => state.setUser);

    const loginMutation = useMutation(loginUser, {
        onSuccess: async (token, variables) => {
            if (!token) {
                message.error('User not found. Please register.');
                router.push('/register');
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