
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/auth/auth-form';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate('/dashboard');
        } else {
          setLoading(false);
        }
      }
    );

    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-batik-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-batik-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-batik-dark bg-auth-pattern">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-batik-dark -z-10"></div>
      
      {/* Animated shapes - subtle gold accents */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-batik-gold rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-batik-accent rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-float animation-delay-2000"></div>
      
      <header className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-batik-gold to-primary">
            TourGenius
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 animate-fade-in">
        <AuthForm />
      </main>

      <footer className="p-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} TourGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
