
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Type definition for formData
export interface AuthFormData {
  email: string;
  password: string;
  name: string;
}

// Sign up function
export const signUpUser = async (formData: AuthFormData) => {
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
  return { error: null };
};

// Sign in function
export const signInUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  toast.success('Logged in successfully!');
  return { error: null };
};

// Test account function
export const createAndSignInTestAccount = async () => {
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
    return { error: null };
  } catch (error: any) {
    console.error('Test account error:', error);
    toast.error(error.message || 'Test account login failed. Please try again.');
    return { error };
  }
};
