
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GlassCard from '../ui/glass-card';
import { supabase } from '@/integrations/supabase/client';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.search.includes('signup=true'));
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up the user
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name || undefined,
            }
          }
        });
        
        if (error) throw error;
        
        toast.success('Account created successfully! Please check your email to verify your account.');
      } else {
        // Log in the user
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  // Quick login with test account
  const handleTestAccount = async () => {
    setLoading(true);
    const testEmail = 'test@example.com';
    const testPassword = 'testpassword123';
    
    try {
      // First try to sign up a test account
      const { error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Test User',
          }
        }
      });
      
      if (signUpError && !signUpError.message.includes('already registered')) {
        throw signUpError;
      }
      
      // Then try to sign in with it
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (signInError) throw signInError;
      
      toast.success('Logged in with test account successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Test account error:', error);
      toast.error(error.message || 'Test account login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="w-full max-w-md mx-auto bg-batik-dark/40 backdrop-blur-xl border-batik-gray/30">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
        <p className="text-gray-300 mt-2">
          {isSignUp
            ? 'Sign up to start planning amazing tours'
            : 'Log in to access your dashboard'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required={isSignUp}
              disabled={loading}
              className="w-full bg-batik-dark/50 border-batik-gray/50 text-white placeholder:text-gray-400"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={loading}
            className="w-full bg-batik-dark/50 border-batik-gray/50 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            {!isSignUp && (
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={loading}
            className="w-full bg-batik-dark/50 border-batik-gray/50 text-white placeholder:text-gray-400"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90" 
          disabled={loading}
        >
          {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Log In'}
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="ml-1 text-primary hover:underline focus:outline-none"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </form>

      {/* Debug tools */}
      <div className="mt-8 pt-6 border-t border-batik-gray/30">
        <div className="flex justify-between items-center mb-4">
          <button 
            type="button" 
            onClick={() => setDebugMode(!debugMode)}
            className="text-xs text-gray-400 hover:text-white"
          >
            {debugMode ? 'Hide Debug' : 'Debug Tools'}
          </button>
          
          {debugMode && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleTestAccount}
              disabled={loading}
              className="text-xs"
            >
              Create & Login with Test Account
            </Button>
          )}
        </div>
        
        {debugMode && (
          <div className="bg-batik-dark/70 p-3 rounded-md text-xs text-gray-300">
            <p className="font-mono">Current auth status: {loading ? 'Loading...' : 'Idle'}</p>
            <p className="font-mono mt-1">Mode: {isSignUp ? 'Sign Up' : 'Login'}</p>
            <p className="font-mono mt-1 text-yellow-400">Tip: Create a test account to sign in immediately</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default AuthForm;
