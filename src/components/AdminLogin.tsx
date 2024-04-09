import React, { useState } from 'react';
import '../styles/Login.css';

const ALogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
        alert('You are logged in!');
        setIsSubmitted(true);
    } else {
        setMessage('Please enter email and password');
    }
}

return(
    <div className='container'>
        <div className='login-box'>
            <div className = 'container-input'>
                <h1 className='text-login'>Admin Login</h1> 
        
                <form onSubmit={handleSubmit}>
                    <div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className='text-box'/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className='text-box' />
                    </div>
                    <div>
                    <button type="submit">Submit</button>
                    </div>
                    <div>
                    <p>Not an admin? <a href='/login'>Login Here!</a></p>
                    </div>                
                </form>
            <p className='message'>{message}</p>
            {isSubmitted && email && password && <a href="/login/cms">Go to CMS page</a>}
            </div>
        </div>

    </div>
)
}

export default ALogin;