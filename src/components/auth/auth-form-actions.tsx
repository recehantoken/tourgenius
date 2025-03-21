
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthFormActionsProps {
  isSignUp: boolean;
  loading: boolean;
  toggleAuthMode: () => void;
}

const AuthFormActions = ({ isSignUp, loading, toggleAuthMode }: AuthFormActionsProps) => {
  return (
    <>
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
    </>
  );
};

export default AuthFormActions;
