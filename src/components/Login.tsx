import React, { useState } from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
        setMessage('You are logged in');
    } else {
        setMessage('Please enter email and password');
    }
}

return(
    <div className='container'>
        <h2 className='text-content'>Login Page</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className='text-box'/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className='text-box' />
            <button type="submit">Login</button>
        </form>
        <p className='text-content'>{message}</p>
    </div>
)
}

export default Login;