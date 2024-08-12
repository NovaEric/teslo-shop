'use client';

import { authenticate } from '@/actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export const LoginForm = () => {

    const [state, dispatch] = useFormState(
        authenticate,
        undefined,
    );

    console.log(state)

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                placeholder='Email'
                name='email'
                type="email" />


            <label htmlFor="password">Password</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                placeholder='password'
                name='password'
                type="password" />

            <button
                type='submit'
                className="btn-primary">
                Login
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Create new account
            </Link>

        </form>
    )
}
