// src/pages/signup.tsx
import MainLayout from '../components/layout/MainLayout';
import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <MainLayout title="Sign Up - FUN(TIME)">
      <SignupForm />
    </MainLayout>
  );
}
