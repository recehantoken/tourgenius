
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  email: string;
  password: string;
  name: string;
}

interface AuthFormFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignUp: boolean;
  loading: boolean;
}

const AuthFormFields = ({ 
  formData, 
  handleChange, 
  isSignUp, 
  loading 
}: AuthFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default AuthFormFields;
