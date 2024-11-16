import { IconPhone } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-[#1c1c1c] h-[105vh]">
      <div className="w-full h-2/5 flex justify-center items-center flex-col text-white md:flex  md:flex-row md:h-2/6 md:p-2">
        <div>
          <Image
            src={"/taxiLogo.jpg"}
            alt="not found"
            width={200}
            height={80}
            className="lg:w-[13rem]"
          ></Image>
          <p>Travel Securely With US!</p>
        </div>
        <div className="w-full md:w-4/5 md:ml-3 flex justify-center items-center bg-primary ">
          <IconPhone size="2rem" className="text-white" stroke={1.5} />
          <p>Call for Tax!</p>
          <p className="text-black">5267-214-392</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between md:justify-around">
          <div className="text p-2 ">
            <h3 className="text-primary">Links</h3>
            <div className="flex flex-col ">
              <Link href={""} className="no-underline text-white text-lg">
                Home
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                Services
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                About
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                Contact
              </Link>
            </div>
          </div>
          <div className="text p-2 hidden md:inline-block">
            <h3 className="text-primary">Contact US</h3>
            <div className="flex flex-col ">
              <Link href={""} className="no-underline text-white text-lg">
                Home
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                Services
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                About
              </Link>
              <Link href={""} className="no-underline text-white text-lg">
                Contact
              </Link>
            </div>
          </div>
          <div className="payment p-2">
            <h3 className="text-primary">Online Payment</h3>
            <Image
              src={"/payments.webp"}
              alt="not found"
              width={149}
              height={50}
            ></Image>
          </div>
        </div>
      </div>
      <div className="bg-[url('/skyLine.png')] bg-cover bg-center w-full h-1/4"></div>

      <p className="block text-white text-center">
        &copy; 2023 All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
