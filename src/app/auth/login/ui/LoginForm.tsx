"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        placeholder="Email"
        name="email"
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        placeholder="password"
        name="password"
        type="password"
      />
      <div className='flex h-8 items-end space-x-1' aria-live="polite" aria-atomic>
        {state === "CredentialsSignin" && 
        <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500"/>
            <p className="text-sm text-red-500">Wrong credentials</p>
            </div>}
        </div>

        <LoginButton/>
      {/* <button type="submit" className="btn-primary">
        Login
      </button> */}

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create new account
      </Link>
    </form>
  );
};

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <button 
        type="submit" 
        className={
            clsx({
                'btn-primary': !pending,
                'btn-disabled': pending,
            })}
        disabled={pending}    
        >
        Login
      </button>
    )
}