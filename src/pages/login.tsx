// src/pages/login.tsx
import type { NextPage } from 'next';
import MainLayout from '../components/layout/MainLayout';
import LoginForm from '../components/auth/LoginForm';

const Login: NextPage = () => {
  return (
    <MainLayout title="Sign In - FUN(TIME)">
      <LoginForm />
    </MainLayout>
  );
};

export default Login;
