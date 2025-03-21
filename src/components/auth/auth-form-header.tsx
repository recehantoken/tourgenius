
import React from 'react';

interface AuthFormHeaderProps {
  isSignUp: boolean;
}

const AuthFormHeader = ({ isSignUp }: AuthFormHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
      <p className="text-gray-300 mt-2">
        {isSignUp
          ? 'Sign up to start planning amazing tours'
          : 'Log in to access your dashboard'}
      </p>
    </div>
  );
};

export default AuthFormHeader;
