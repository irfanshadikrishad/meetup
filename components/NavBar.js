"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../app/Image/logo.png";
import Container from "../components/Container";
import { getCurrentTime, getFormattedDateTime } from "../utils/helpers"; // Import the function
import Link from "next/link";

const NavBar = () => {
  const [time, setTime] = useState(getFormattedDateTime);

  useEffect(() => {
    // Update time every minute
    // const interval = setInterval(() => {
    //     setTime(getCurrentTime());
    // }, 0);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary p-2">
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" width={45} height={50} />
            <h3 className="text-lg -ml-[5px] font-semibold">Meet Up</h3>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center  space-x-2 text-sm">
              {/* <p>{`${time.hours}:${time.minutes}`}</p>
                            <span className='w-1'>•</span>
                            <p>{time.dayOfWeek}</p>
                            <p>{time.day}</p>
                            <p>{time.month}</p> */}
              <p>{getFormattedDateTime()}</p>
            </div>

            <div>
              <button className="p-[8px] bg-[#220256] text-white rounded-[10px]">
                <Link className="" href="/register">
                  Register
                </Link>
              </button>
            </div>

            <div>
              <button className="p-[8px]  bg-[#220256] text-white rounded-[10px]">
                <Link className="" href="/login">
                  Log in
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
