"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../store/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { storeTokenInLS, deleteTokenInLS } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const router = useRouter(); // Initialize the router

  async function submitLogin(e) {
    e.preventDefault();
    try {
      deleteTokenInLS();
      const request = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      const response = await request.json();

      if (request.status === 200) {
        toast.success(`Login successfull.`);
        storeTokenInLS(response.token);
        router.push("/home");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#ffffff] ">
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign up</h1>
            <p className="text-sm text-gray-400">
              Sign up to access your account
            </p>
          </div>
          <form
            onSubmit={(e) => {
              submitLogin(e);
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block  mb-2 text-sm">
                  Email address
                </label>
                <input
                  value={user.email}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  name="email"
                  type="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm mb-2">
                  Password<span className="text-red-600 ">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="*******"
                    className="w-full px-3 mt-[2px] py-2 border rounded-md border-gray-300 focus:outline-[#cb6ce6] bg-gray-200 text-gray-900"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#41a6d4] hover:bg-[#4185a4] font-bold  w-full rounded-[25px] py-2 text-white"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-[#4185a4] text-gray-400">
              <Link href="/forgetPassword">Forgot password?</Link>
            </button>
          </div>

          {error && <p className="text-red-600 mt-[8px]"> {error}</p>}

          {/* Login with social account */}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>

          <div className="flex justify-center md:rounded-[25px] hover:text-white hover:bg-[#adadad] items-center space-x-2 border border-gray-300 p-2 my-[10px] cursor-pointer">
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </div>

          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link href='register'>
              <span className="hover:underline hover:text-[#4185a4] text-gray-600">
                Sign up
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
      <ToastContainer />
    </div>
  );
};

export default Login;
