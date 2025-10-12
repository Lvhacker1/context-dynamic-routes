import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const {user} = useUser();
  if (!user) return <LoginForm />

  return (
    <div>
      <Navbar />
      <main>
        
      </main>
    </div>
  );
}
