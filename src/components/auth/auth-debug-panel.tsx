
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthDebugPanelProps {
  debugMode: boolean;
  setDebugMode: (value: boolean) => void;
  loading: boolean;
  isSignUp: boolean;
  handleTestAccount: () => Promise<void>;
}

const AuthDebugPanel = ({ 
  debugMode, 
  setDebugMode, 
  loading, 
  isSignUp, 
  handleTestAccount 
}: AuthDebugPanelProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-batik-gray/30">
      <div className="flex justify-between items-center mb-4">
        <button 
          type="button" 
          onClick={() => setDebugMode(!debugMode)}
          className="text-xs text-gray-300 hover:text-white"
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
          <p className="font-mono mt-1 text-yellow-400">Tip: Use the "Create & Login with Test Account" button to sign in immediately</p>
        </div>
      )}
    </div>
  );
};

export default AuthDebugPanel;
