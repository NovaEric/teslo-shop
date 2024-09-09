'use client'

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
    name: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { name, email, password } = data;
        
        //Server action
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMsg(resp.message)
            return;
        }

        await login( email.toLowerCase(), password );

        window.location.replace('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Full Name</label>
            {
                errors.name?.type === 'required' && (
                    <span className="text-red-500">Name is required</span>
                )
                
            }
            <input
                placeholder="Full Name"
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Email</label>
            {
                errors.email?.type === 'required' && (
                    <span className="text-red-500">Must be a valid email</span>
                )

            }
            <input
                placeholder="Email"
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />


            <label htmlFor="password">Password</label>
            {
                errors.password?.type === 'required' && (
                    <span className="text-red-500">Password Must be 6 characters minimum </span>
                )
                
            }
            <input
                placeholder="Password"
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />                
            
            <span className="text-red-500">{ errorMsg }</span>
            
            <button
                className="btn-primary">
                Create Account
            </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Login
            </Link>

        </form>
    )
}
