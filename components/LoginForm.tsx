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
        <div>
            <div>
                <h2>{loginFormData.pageTitle}</h2>
                <p>{loginFormData.subTitle}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{loginFormData.email}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>{loginFormData.password}</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">{loginFormData.submitButton}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm