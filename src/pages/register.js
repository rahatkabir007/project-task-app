import React from 'react'
import RegistrationForm from '@/components/Registration/RegistrationForm'

const register = () => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Register</h1>
      <RegistrationForm />
    </div>
  )
}

export default register