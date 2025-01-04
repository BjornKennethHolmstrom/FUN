import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useFormValidation, validators } from '@/lib/validation';
import Card from '../common/Card';
import { OrganicButton } from '../common/OrganicButton';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  // Custom validation for login form
  const validateLogin = (data: LoginFormData) => {
    const errors = [];
    
    const emailError = validators.required(data.email, 'Email') || 
                      validators.email(data.email, 'Email');
    const passwordError = validators.required(data.password, 'Password');
    
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const { validate, getFieldError } = {
    validate: () => validateLogin(formData),
    getFieldError: (field: string) => {
      const result = validateLogin(formData);
      const error = result.errors.find(err => err.field === field);
      return error ? error.message : null;
    }
  };

  const updateFormData = (field: keyof LoginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const showError = (field: string) => {
    return touchedFields.has(field) ? getFieldError(field) : null;
  };

  // Get the mutation
  const login = trpc.user.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      router.push('/dashboard');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    
    // Mark all fields as touched on submit attempt
    setTouchedFields(new Set(['email', 'password']));
    
    if (validation.isValid) {
      try {
        await login.mutate({
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        // Error will be handled by mutation's onError
      }
    }
  };

  const renderFieldError = (field: string) => {
    const error = showError(field);
    if (!error) return null;
    return (
      <p className="mt-1 flex items-center text-sm text-red-600">
        <AlertCircle className="mr-1 h-4 w-4" />
        {error}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="mx-auto max-w-md px-4">
        <Card className="overflow-hidden">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="px-6 pt-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to continue your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`w-full rounded-lg border pl-10 pr-4 focus:ring-emerald-500
                      ${showError('email') 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-emerald-500'}`}
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your@email.com"
                  />
                  <Mail className={`absolute left-3 top-2.5 h-5 w-5
                    ${showError('email') ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                {renderFieldError('email')}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className={`w-full rounded-lg border pl-10 pr-4 focus:ring-emerald-500
                      ${showError('password') 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-emerald-500'}`}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="••••••••"
                  />
                  <Lock className={`absolute left-3 top-2.5 h-5 w-5
                    ${showError('password') ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                {renderFieldError('password')}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={formData.rememberMe}
                    onChange={(e) => updateFormData('rememberMe', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </Link>
              </div>

              <OrganicButton
                type="submit"
                variant="butterfly"
                className="w-full justify-center"
                disabled={login.isLoading}
              >
                {login.isLoading ? (
                  <>
                    <span className="animate-spin">⋮</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </OrganicButton>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/signup" 
                    className="font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </div>

          <div className="mt-8 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-center text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="font-medium text-emerald-600 hover:text-emerald-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-emerald-600 hover:text-emerald-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
