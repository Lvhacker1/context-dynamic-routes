'use client'
import { useUser } from "@/context/UserContext"
import { loginFormData } from "@/data/data";
import { users } from "@/lib/users";
import Image from "next/image";
import { FormEvent, useState } from "react";


const LoginForm = () => {
    const {login} = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) login(foundUser);
        else setError(loginFormData.errorMessage)
    }


    return (
        <div className="flex flex-col justify-center items-center"
        style={{
            backgroundImage: 'url(/food55.png)',
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'overlay'
            }}>
            <div className="flex flex-col gap-6 justify-center items-center w-full h-screen p-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">{loginFormData.pageTitle}</h1>
                <div className="p-6 sm:p-10 bg-zinc-900/80 backdrop-blur-md w-full max-w-xl rounded-xl border border-zinc-800 shadow-2xl shadow-black/50">
                    <p className="text-xl sm:text-2xl text-white mb-8">{loginFormData.subTitle}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-300 font-semibold">{loginFormData.email}</label>
                        <input className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-300 font-semibold">{loginFormData.password}</label>
                        <input className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">{error}</p>}
                    <button className="py-3 px-6 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold mt-4 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105" type="submit">{loginFormData.submitButton}</button>
                </form>
                </div>
                <div className="flex gap-2 text-gray-300">
                    <p>{loginFormData.signUpText}</p>
                    <a href="/" className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-300">{loginFormData.signUpLink}</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
