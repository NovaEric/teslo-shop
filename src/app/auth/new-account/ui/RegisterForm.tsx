'use client'

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
    name: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { name, email, password } = data;
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            {
                errors.name?.type === 'required' && (
                    <span className="text-red-500">Name is required!</span>
                )

            }
            <label htmlFor="email">Full Name</label>
            <input
                placeholder="Full Name"
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Email</label>
            <input
                placeholder="Email"
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />


            <label htmlFor="password">Password</label>
            <input
                placeholder="Password"
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                {...register('password', { required: true })}
            />

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
