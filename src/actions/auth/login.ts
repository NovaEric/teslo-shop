'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(Object.fromEntries(formData))
    await signIn('credentials', formData);
  } catch (error) {
    return 'CredentialsSignin';
  }
}