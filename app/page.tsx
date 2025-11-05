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
          <div className="flex flex-wrap gap-4">
            {homePageContent.links.map((link) => (
              <Link className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 md:text-lg"
              key={link.href}
              href={link.href}>
                <p>{link.description} <span className="ml-1">➜</span></p>
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
