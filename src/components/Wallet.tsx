import '../styles/Wallet.css';
import { Button } from 'react-bootstrap';

const Wallet: React.FC = () => {
    return(
        <div >
            <h1 className = 'h'>Wallet</h1>
            <div className= 'event'> 
           
            <Button className = 'wbutton'>Create Wallet</Button>
        </div>
        </div>
    )
    }
    
    export default Wallet;