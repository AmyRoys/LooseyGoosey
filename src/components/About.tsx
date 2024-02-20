import '../styles/About.css';

const About: React.FC = () => {
    return (
        <div className='about-container'>
            <div className='about-box'>
                <div className='container-about'>
                    <h1 className='text-about'>About</h1>
                    <h2 className='text-divider'>Broad User Group</h2>
                    <p>The broad user group I chose is..</p>
                    <h2 className='text-divider'>Segmentation Method</h2>
                    <p>The segmentation method I chose is..</p>
                    <h2 className='text-divider'>User Persona</h2>
                    <p>My ideal user is...</p>
                </div>
            </div>
        </div>
    );
}
export default About;