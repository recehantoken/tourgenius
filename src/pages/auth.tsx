
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/auth-form';
import { Link } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10 dark:from-gray-900 dark:to-gray-950"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float dark:bg-blue-800 dark:opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000 dark:bg-purple-800 dark:opacity-20"></div>
      
      <header className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            TourGenius
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 animate-fade-in">
        <AuthForm />
      </main>

      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TourGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
