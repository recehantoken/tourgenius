
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import GlassCard from '../ui/glass-card';
import AuthFormHeader from './auth-form-header';
import AuthFormFields from './auth-form-fields';
import AuthFormActions from './auth-form-actions';

import { AuthFormData, signUpUser, signInUser, createAndSignInTestAccount } from './auth-utils';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.search.includes('signup=true'));
  
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(true); // Set debug mode to true by default for easier testing

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
        await signUpUser(formData);
      } else {
        // Log in the user
        await signInUser(formData.email, formData.password);
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
    try {
      await createAndSignInTestAccount();
      navigate('/dashboard');
    } catch (error: any) {
      // Error is already handled in the utility function
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="w-full max-w-md mx-auto bg-batik-dark/40 backdrop-blur-xl border-batik-gray/30">
      <AuthFormHeader isSignUp={isSignUp} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthFormFields
          formData={formData}
          handleChange={handleChange}
          isSignUp={isSignUp}
          loading={loading}
        />

        <AuthFormActions 
          isSignUp={isSignUp} 
          loading={loading} 
          toggleAuthMode={toggleAuthMode} 
        />
      </form>


    </GlassCard>
  );
};

export default AuthForm;
