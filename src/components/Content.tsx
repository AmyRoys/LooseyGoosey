import '../styles/Content.css'; 
import plant from '../assets/plant.png';

const Content = () => {
    return (
        <div className='content'>
            <div className= 'text-content'>
                <h1 className="line1">Your Garden,</h1>
                <h1 className="line2">Your Food,</h1>
                <h1 className="line3">Our Help.</h1>
            </div>
            <div className= 'image-content'>
                <img src={plant} alt='plant' className= 'plant'/>
            </div>
        </div>
    );

}
export default Content;