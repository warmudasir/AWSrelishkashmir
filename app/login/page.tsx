"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUserToken } from "../../utility/authtoken";

interface IFormInput {
  email: string;
  password: string;
}

type decodedType = string | JwtPayload;

const validateLogin = async (data: IFormInput, router: any, setError: (message: string) => void) => {
  
  const SECRET_KEY = 'hello123';
  try {
    const response = await fetch('/api/validateLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Invalid login credentials');
    }

    const result = await response.json();
    const { token } = result;
    const decoded: decodedType = jwt.verify(token, SECRET_KEY);

    if (typeof decoded !== 'string' && decoded.role) {
      localStorage.setItem('token', token);
      if (decoded.role === 'admin') {
        router.push('/admin');
      } else if (decoded.role === 'user') {
        router.push('/');
      } else if (decoded.role === 'deliveryagent') {
        router.push('/deliveryagent');
      }
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    setError('Invalid login credentials');
    console.error('Error:', error);
  }
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Check if the user is already logged in
  useEffect(() => {
    const userData = getUserToken();
    if (userData) {
      router.push('/');
    }
  }, [router]);

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setError(null); // Clear previous error messages
    validateLogin(data, router, setError);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="login" style={{ width: '300px', backgroundColor: '#FBE9D0', padding: '10px', borderRadius: '2px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input type="email" style={{ width: '100%' }} {...register('email', { required: true })} />
            <label htmlFor="password">Password</label>
            <input type="password" style={{ width: '100%' }} {...register('password', { required: true })} />
            <button style={{ backgroundColor: 'black', padding: '5px', color: 'white', width: '100%' }} className="my-2" type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Don&apos;t have an account? <Link href="/signup" style={{ color: 'blue' }}>Signup</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
