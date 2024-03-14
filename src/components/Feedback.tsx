import '../styles/Feedback.css';        
import React, { useState } from 'react';
import plant6 from '../assets/plant6.png';
import plant7 from '../assets/plant7.png';

const Feedback: React.FC = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle the form submission here
    console.log(name, email, message);

    if (name && email && message) {
        alert('Your feedback has been submitted successfully!');
      }
    else {
        setSuccessMessage('Please fill in all the fields');
    }
    };

return (
    <div className='f-container'>
        <div className='feedback-box'>
            <div className = 'f-container-input'>
                <h1 className='text-feedback'>Feedback</h1> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className='text-box'/>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className='text-box' />
                        <input type="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required className='text-box' />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form> 
                <p className='success-message'>{successMessage}</p>
            </div>
        </div> 
        <div>
            <img src={plant6} alt='plant6' className='plant6'/>
        </div>
        <div>
            <img src={plant7} alt='plant7' className='plant7'/>
        </div>
    </div>
  );
};
export default Feedback;