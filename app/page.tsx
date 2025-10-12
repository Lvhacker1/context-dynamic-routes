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
      <main>
        <h1>{homePageContent.title} {user.name}</h1>
        <p>{homePageContent.subTitle}</p>
        <div>
          {homePageContent.links.map((link) => (
            <Link
            key={link.href}
            href={link.href}>
              <p>{link.description}</p>
            </Link>
          ))}
        </div>
        {user.favoriteCategory && (
          <div>
            <p>{homePageContent.favoriteCategory} <strong>{user.favoriteCategory}</strong></p>
          </div>
        )}
      </main>
    </div>
  );
}
