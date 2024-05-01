import { Controller, useForm } from 'react-hook-form';
import {  Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { registerUser } from '@/ReactQueryApis/api';

const RegistrationForm = () => {
  const { handleSubmit, formState: { errors },control } = useForm();

  const router = useRouter();
  
  const registerMutation = useMutation(registerUser, {
    onSuccess: () => {
      message.success('Registration successful. Please log in.');
      router.push('/login');
    },
    onError: (error) => {
      console.error('Registration error:', error);
      message.error('Registration failed. Please try again.');
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };


  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/');
    }
  }, [])
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your name" />
            )}/>
        {errors.name && <span style={{ color: 'red', fontSize: "12px" }}>Name is required</span>}
        </div>
        <div className='flex flex-col gap-2' >
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your Email" />
            )}/>
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
            )}/>
          {errors.password && <span style={{ color: 'red',fontSize: "12px" }}>Password is required</span>}
        </div>
        <div>
          <Button type="primary" htmlType="submit">Register</Button>
        </div>
     
   </form>
  );
};

export default RegistrationForm;