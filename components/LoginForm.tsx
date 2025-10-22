'use client'
import { useUser } from "@/context/UserContext"
import { loginFormData } from "@/data/data";
import { users } from "@/lib/users";
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
        <div className="flex flex-col h-screen justify-center items-center text-gray-600">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h1>{loginFormData.pageTitle}</h1>
                <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 bg-gray-100 p-5 rounded-xs">
                    <p>{loginFormData.subTitle}</p>
                    <div className="border-b-2 flex flex-col">
                        <label htmlFor="email" >{loginFormData.email}</label>
                        <input className="focus:outline-none" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="border-b-2 flex flex-col">
                        <label htmlFor="password">{loginFormData.password}</label>
                        <input className="focus:outline-none" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">{loginFormData.submitButton}</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm