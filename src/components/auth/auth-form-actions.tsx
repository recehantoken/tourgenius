
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
        className="w-full bg-gradient-to-r from-batik-gold to-primary hover:opacity-90 text-batik-dark font-semibold" 
        disabled={loading}
      >
        {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Log In'}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="ml-1 text-batik-gold hover:underline focus:outline-none"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </>
  );
};

export default AuthFormActions;
