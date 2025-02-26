import { IconPhone } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-[#1c1c1c] h-[105vh]">
      <div className="w-full h-2/5 flex justify-center items-center flex-col text-white md:flex  md:flex-row md:h-2/6 md:p-2">
        <div className="flex items-center justify-center flex-col">
          <Image
            src={"/navbarLogo.jpg"}
            alt="not found"
            width={100}
            height={80}
            className="lg:w-[10rem] rounded-md"
          ></Image>
          <p>Travel Securely With US!</p>
      </div>
        <div className="w-full md:w-4/5 md:ml-3 flex justify-center items-center gap-1 bg-primary rounded-md ">
          <IconPhone size="2rem" className="text-white" stroke={1.5} />
          <p>Call for Ride </p>
          <p className="text-black font-bold text-lg"> +49 6142499601</p>
        </div>
        <div className="w-4/5 md:w-4/5 md:ml-3 flex justify-center items-center gap-1 bg-primary rounded-b-md md:rounded-md">
        <p className="font-bold text-lg">flughafentransfer123@hotmail.com</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between md:justify-around">
          <div className="text p-2 ">
            <h3 className="text-primary text-center">Links</h3>
            <div className="flex flex-col ">
            <ul className="m-0">
              <li className="text-white">
              <Link href={"#home"} className="no-underline text-white text-lg">
                Home
              </Link>
              </li>
              <li className="text-white">
              <Link href={"#services"} className="no-underline text-white text-lg">
                Services
              </Link>
              </li>
              <li className="text-white">
              <Link href={"#about"} className="no-underline text-white text-lg">
                About
              </Link>
              </li >
            </ul>
            </div>
          </div>
          <div className="text p-2 hidden md:inline-block">
            <h3 className="text-primary text-start ml-6">Contact US</h3>
            <div className="flex flex-col ">
            <ul className="m-0">
              <li className="text-white">
              <Link href={""} className="no-underline text-white text-lg">
              flughafentransfer123@hotmail.com
              </Link>
              </li>
              <li className="text-white">
              <Link href={""} className="no-underline text-white text-lg">
              +49 6142499601
              </Link>
              </li>
            </ul>
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
      <div className="bg-[url('/SkyLine.jpg')] bg-cover bg-center w-full h-1/4"></div>
      <p className="block text-white text-center">
        &copy; 2025 All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
