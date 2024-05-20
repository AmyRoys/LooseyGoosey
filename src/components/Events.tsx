import '../styles/Events.css';
import Goose from '../assets/sillygeese.png';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function Events() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/buyTicket');
  };

  return (
    <div>
        <h1 className = 'h'> Upcoming Events</h1>
        <div className= 'event'> 
            <h2>Silly Goose Convention</h2>
            <h3 className = 'datetime'>March 2nd</h3>
            <h3 className='datetime'>10:00 AM</h3>
            <img className= 'geese' src ={Goose} ></img>
            <Button className='button' onClick={handleButtonClick}>Tickets</Button>
        </div>
    </div>

  );
}

export default Events;