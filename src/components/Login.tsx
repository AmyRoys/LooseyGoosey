import React, { useState } from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
        alert('You are logged in!');
    } else {
        setMessage('Please enter email and password');
    }
}

return(
    <div className='container'>
        <div className='login-box'>
            <div className = 'container-input'>
                <h1 className='text-login'>Login</h1> 
        
                <form onSubmit={handleSubmit}>
                    <div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className='text-box'/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className='text-box' />
                    </div>
                    <div>
                    <button type="submit">Submit</button>
                    </div>
                    <div>
                    <p>Don't have an account? <a href='/login/signup'>Sign Up Here!</a></p>
                    </div>                
                </form>
            <p className='message'>{message}</p>
            </div>
        </div>
        
    </div>
)
}

export default Login;