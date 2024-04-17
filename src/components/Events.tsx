import '../styles/Events.css';
import Goose from '../assets/images/sillygeese.png';
import { Button } from 'react-bootstrap';

function Events() {
  
  
  return (
    <div>
        <h1 className = 'h'> Upcoming Events</h1>
        <div className= 'event'> 
            <h2>Silly Goose Convention</h2>
            <h3 className = 'datetime'>2nd March</h3>
            <h3 className='datetime'>10:00 AM</h3>
            <img className= 'geese' src ={Goose} ></img>
            <Button className = 'button'>Tickets</Button>
        </div>
    </div>

  );
}

export default Events;