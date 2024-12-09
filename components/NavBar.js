"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../app/Image/logo.png";
import Container from "../components/Container";
import { getCurrentTime, getFormattedDateTime } from "../utils/helpers"; // Import the function
import Link from "next/link";
import { useAuth } from "../store/auth";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [time, setTime] = useState(getFormattedDateTime);
  const { user, authenticate, deleteTokenInLS } = useAuth();
  const router = useRouter()

  useEffect(() => {
    // Update time every minute
    // const interval = setInterval(() => {
    //     setTime(getCurrentTime());
    // }, 0);
    // return () => clearInterval(interval);
  }, []);


  const [open, setOpen] = useState(false);

  return (
    <div className="bg-primary p-2">
      <Container>
        <div className="flex justify-between">
          <Link href="/">
            <div className="flex items-center">
              <Image src={logo} alt="Logo" width={45} height={50} />
              <h3 className="text-lg -ml-[5px] font-semibold">eet Up</h3>
            </div>
          </Link>

          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center  space-x-2 text-sm">
              {/* <p>{`${time.hours}:${time.minutes}`}</p>
                            <span className='w-1'>•</span>
                            <p>{time.dayOfWeek}</p>
                            <p>{time.day}</p>
                            <p>{time.month}</p> */}
              <p className="text-[18px] hidden sm:block font-bold mr-2">
                {getFormattedDateTime()}
              </p>
            </div>

            {
              user ? <>



                <div className="hidden sm:flex gap-3">
                  <div>
                    <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                      <Link className="" href="/">
                        {user.name}

                      </Link>
                    </button>
                  </div>
                  <div>
                    <button onClick={() => {
                      deleteTokenInLS()
                      router.push('/login')
                    }} className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                      <Link className="" href="/login">
                        Log out
                      </Link>
                    </button>
                  </div>
                </div>
              </> : <>


                <div className="hidden sm:flex gap-3">

                  <div >
                    <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                      <Link className="" href="/register">
                        Register
                      </Link>
                    </button>
                  </div>
                  <div>
                    <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                      <Link className="" href="/login">
                        Log in
                      </Link>
                    </button>
                  </div>



                </div>


              </>
            }
          </div>



          {/* Mobile responsive */}

          <div className={`block lg:hidden  bg-[#b5b3b3] lg:col-span-3  absolute lg:static lg:w-auto top-0 left-0 overflow-hidden h-full lg:h-auto duration-500 lg:bg-[transparent] lg:p-0 z-30 ${open ? "w-[85%]  p-5" : "w-0"}`}>

            <div className='flex  justify-between'>
              <ul className='flex  flex-col pl-[30px] pt-[20px] '>

                {
                  user ? <>



                    <div>
                      <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                        <Link className="" href="/">
                          {user.name}

                        </Link>
                      </button>
                    </div>
                    <div>
                      <button onClick={() => {
                        deleteTokenInLS()
                        router.push('/login')
                      }} className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                        <Link className="" href="/login">
                          Log out
                        </Link>
                      </button>
                    </div>






                  </> : <>
                    <div>
                      <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                        <Link className="" href="/register">
                          Register
                        </Link>
                      </button>
                    </div>
                    <div>
                      <button className="p-[8px] bg-[#A594F9] font-bold text-white rounded-[10px]">
                        <Link className="" href="/login">
                          Log in
                        </Link>
                      </button>
                    </div>


                  </>
                }


              </ul>

              <FaTimes onClick={() => setOpen(!open)} className='w-[24px] h-[24px] text-amber-200' />
            </div>
          </div>



          <button onClick={() => setOpen(!open)} className='block lg:hidden'>{open ? <> </> : <FaBars className='w-[24px] h-[24px] text-amber-200' />}</button>
        </div>




      </Container>
    </div>
  );
};

export default NavBar;
