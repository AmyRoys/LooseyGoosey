import '../styles/Content.css'; 
import Goose from '../assets/goose.png';


const Content = () => {
    return (
        <div className='content'>
            <div className= 'text-content'>
                <h1 className="heading">Loosey Goosey</h1>
            </div>
        <img className = 'goose' src ={Goose} >
        </img>
        </div>
    );

}
export default Content;