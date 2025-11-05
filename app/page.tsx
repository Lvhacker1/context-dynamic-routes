'use client'
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";
import { homePageContent } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { PiHandWaving } from "react-icons/pi";

export default function Home() {
  const {user} = useUser();
  if (!user) return <LoginForm />

  return (
    <div className="bg-black">
      <Navbar />
      <main className=" text-white flex flex-col-reverse justify-end items-center min-h-screen md:flex-row md:items-center">
        <div className="flex flex-col justify-center items-start text-left p-4 w-full md:w-1/2 lg:p-16">
          <h1 className="flex items-center gap-4 text-3xl font-bold lg:text-5xl">{homePageContent.title} {user.name} <PiHandWaving size={32} className="w-8 h-8 lg:w-12 lg:h-12" /></h1>
          <p className="text-lg mb-16 mt-2 md:text-xl text-gray-300">{homePageContent.subTitle}</p>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {homePageContent.links.map((link, index) => (
              <Link className={index === 0 ? "bg-red-500 border-2 border-red-500 text-white hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300 text-base md:text-lg" : "bg-transparent border-2 border-red-500 text-red-500 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md shadow-red-500/20 transition-all duration-300 text-base md:text-lg"}
              key={link.href}
              href={link.href}>
                <p>{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-90 relative md:w-1/2 md:h-screen"> 
          <Image 
            src="/food55.png"
            alt="food image"
            fill
            />
        </div>
      </main>
    </div>
  );
}
