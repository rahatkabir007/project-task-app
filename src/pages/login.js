import LoginForm from '@/components/Login/LoginForm';
import React from 'react'

const login = () => {

  return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
          <h1>Login</h1>
          <LoginForm />
      </div>
  )
}

export default login