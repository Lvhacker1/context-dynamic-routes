'use client'
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";
import { homePageContent } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {user} = useUser();
  if (!user) return <LoginForm />

  return (
    <div>
      <Navbar />
      <main className=" text-white flex flex-col justify-center">
        <div className="flex flex-col gap-2 mx-auto px-6 py-10">
          <h1 className="text-2xl text-center">{homePageContent.title} {user.name}</h1>
          <p className="text-center">{homePageContent.subTitle}</p>
          <p>{homePageContent.linkText}</p>
          <div className="flex gap-2 mt-4 justify-center">
            {homePageContent.links.map((link) => (
              <Link className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded transition-colors duration-200"
              key={link.href}
              href={link.href}>
                <p>{link.description} <span className="ml-1">➜</span></p>
              </Link>
            ))}
          </div>
          <div className="w-full h-100 relative md:w-1/2 md:h.screen"> 
            <Image 
              src="/food55.png"
              alt="food image"
              fill
              />
          </div>
        </div>
      </main>
    </div>
  );
}
