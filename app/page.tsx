'use client'
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";
import { homePageContent } from "@/data/data";
import Link from "next/link";

export default function Home() {
  const {user} = useUser();
  if (!user) return <LoginForm />

  return (
    <div>
      <Navbar />
      <main className=" text-black flex flex-col justify-center min-h-screen w-full bg-center sm:bg-top bg-no-repeat bg-cover "
            style={{backgroundImage: 'url(/rec6.png)'}}
      >
        <div className="flex flex-col gap-2 mx-auto px-6 py-10" style={{backgroundImage: 'url(/note4.png)'}}>
          <h1 className="text-2xl text-center">{homePageContent.title} {user.name}</h1>
          <p className="text-center">{homePageContent.subTitle}</p>
          <div className="flex gap-2 mt-4 justify-center">
            {homePageContent.links.map((link) => (
              <Link className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded transition-colors duration-200"
              key={link.href}
              href={link.href}>
                <p>{link.description} <span className="ml-1">➜</span></p>
              </Link>
            ))}
          </div>
          {user.favoriteCategory && (
            <div>
              <p>{homePageContent.favoriteCategory} <strong>{user.favoriteCategory}</strong></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
