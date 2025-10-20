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
      <main className="flex flex-col justify-center min-h-screen w-full bg-center sm:bg-top bg-no-repeat bg-cover "
            style={{backgroundImage: 'url(/rec6.png)'}}
      >
        <div>
          <h1 className="text-2xl text-center">{homePageContent.title} {user.name}</h1>
          <p>{homePageContent.subTitle}</p>
          <div>
            {homePageContent.links.map((link) => (
              <Link 
              key={link.href}
              href={link.href}>
                <p>{link.description} <span className="ml-2">➜</span></p>
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
