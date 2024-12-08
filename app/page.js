import React from 'react';
import Image from 'next/image';
import logo from '../app/Image/logo.png';

const Page = () => {
  return (

    <div className='bg-[#DDFFAB]'>

      <div>
        <div className="flex items-center ">
          <Image
            src={logo}
            alt="Logo"
            width={45}
            height={50}
          />
          <h3 className="text-lg font-semibold">eet Up</h3>
        </div>



        <div>

        </div>




      </div>







    </div>
  );
};

export default Page;
