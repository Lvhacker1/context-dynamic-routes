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
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            backgroundBlendMode: 'overlay'
            }}>
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen p-4">
                <h1 className="text-2xl sm:text-3xl text-shadow-white">{loginFormData.pageTitle}</h1>
                <div className="p-4 sm:p-10 bg-gray-100 w-full max-w-xl rounded-sm">
                    <p className="text-xl sm:text-2xl  text-gray-700">{loginFormData.subTitle}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-7 bg-gray-100 pt-10 rounded-xs w-full max-w-3xl text-gray-600">
                    <div className="border-b-2 flex flex-col">
                        <label htmlFor="email" >{loginFormData.email}</label>
                        <input className="focus:outline-none" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="border-b-2 flex flex-col">
                        <label htmlFor="password">{loginFormData.password}</label>
                        <input className="focus:outline-none" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p>{error}</p>}
                    <button className="py-2 px-4 bg-red-700 rounded-md text-white w-fit mt-4 font-bold" type="submit">{loginFormData.submitButton}</button>
                </form>
                </div>
                <div className="flex gap-2">
                    <p>{loginFormData.signUpText}</p>
                    <a href="/" className="underline hover:text-blue-500 cursor-pointer">{loginFormData.signUpLink}</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm