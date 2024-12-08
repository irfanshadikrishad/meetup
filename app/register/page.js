"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedRole, setSelectedRole] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        c_password: "",
        role: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };



    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!user.name.trim()) {
            newErrors.name = "Name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(user.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!user.password) {
            newErrors.password = "Password is required.";
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!user.c_password) {
            newErrors.c_password = "Please confirm your password.";
        } else if (user.password !== user.c_password) {
            newErrors.c_password = "Passwords do not match.";
        }

        if (!selectedRole) {
            newErrors.role = "Please select a role.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlerSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if(user.password !== user.c_password){
                toast.error(`Password did not match.`)
            }else{
            const request = await fetch(`/api/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: selectedRole,
                }),
            });
            const response = await request.json();
            console.log(response);
            
            if(request.status === 200){
                toast.success(`Registration success.`)
            }else{
                console.log(error);
                toast.error(response.error)
            }
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-[#ffffff] mt-5">
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                        <p className="text-sm text-gray-400">Sign up to access your account</p>
                    </div>
                    <form onSubmit={handlerSignUp} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm">
                                    Name<span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    value={user.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">
                                    Email address<span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    value={user.email}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm mb-2">
                                    Password<span className="text-red-600">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        onChange={handleInputChange}
                                        value={user.password}
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="*******"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>


                            {/* confirm password setup */}

                            <div>
                                <label htmlFor="c_password" className="text-sm mb-2">
                                    Confirm Password<span className="text-red-600">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        onChange={handleInputChange}
                                        value={user.c_password}
                                        name="c_password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="c_password"
                                        placeholder="*******"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                                    />
                                    <span
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {errors.c_password && <p className="text-red-600 text-sm mt-1">{errors.c_password}</p>}
                            </div>




                            {/* Role setup */}

                            <div>
                                <p className="text-sm">Select your role:</p>
                                <div className="flex space-x-6 mt-2">
                                    <div className="flex justify-center items-center">
                                        <input
                                            type="radio"
                                            id="host"
                                            name="role"
                                            value="host"
                                            checked={selectedRole === "host"}
                                            onChange={handleRoleChange}
                                            className="mr-2 rounded-full border-gray-300 text-[#41a6d4] focus:ring-[#cb6ce6]"
                                        />
                                        <label htmlFor="host" className="text-sm">
                                            Host
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="radio"
                                            id="guest"
                                            name="role"
                                            value="guest"
                                            checked={selectedRole === "guest"}
                                            onChange={handleRoleChange}
                                            className="mr-2 rounded-full border-gray-300 text-[#41a6d4] focus:ring-[#cb6ce6]"
                                        />
                                        <label htmlFor="guest" className="text-sm">
                                            Guest
                                        </label>
                                    </div>
                                </div>
                                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-[#41a6d4] hover:bg-[#4185a4] font-bold w-full rounded-[25px] py-2 text-white"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="space-y-1">
                        <button className="text-xs hover:underline hover:text-[#4185a4] text-gray-400">
                            <Link href="/forgetPassword">Forgot password?</Link>
                        </button>
                    </div>

                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        <p className="px-3 text-sm dark:text-gray-400">
                            Sign up with social accounts
                        </p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    </div>

                    <div className="flex justify-center md:rounded-[25px] hover:text-white hover:bg-[#adadad] items-center space-x-2 border border-gray-300 p-2 my-[10px] cursor-pointer">
                        <FcGoogle size={32} />
                        <p>Continue with Google</p>
                    </div>

                    <p className="px-6 text-sm text-center text-gray-400">
                        Already have an account? {" "}
                        <Link href="/login">
                            <span className="hover:underline hover:text-[#4185a4] text-gray-600">
                                Log in
                            </span>
                        </Link>
                    </p>

                    <Link href="/">
                        <div className="flex justify-center mx-auto mt-[10px]">
                            <button className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:rotate-180 text-rose-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                                </svg>
                                <span>Go back</span>
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;