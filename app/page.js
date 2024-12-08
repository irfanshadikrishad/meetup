'use client'; // Explicitly mark this as a client component for Next.js

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../app/Image/logo.png';
import Container from '@/components/Container';
import { getCurrentTime } from '@/utils/helpers'; // Import the function

const Page = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-primary p-2">
      <Container>
        <div>
          {/* Header Section */}
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={45}
              height={50}
            />
            <h3 className="text-lg -ml-[5px] font-semibold">Meet Up</h3>
          </div>

          {/* Time Section */}
          <div className="flex items-center mt-2 space-x-2 text-sm">
            <p>{`${time.hours}:${time.minutes}`}</p>
            <span>•</span>
            <p>{time.dayOfWeek}</p>
            <p>{time.day}</p>
            <p>{time.month}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
