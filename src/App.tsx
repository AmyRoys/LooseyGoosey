import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About'; 
import Login from './components/Login'; 
import Content from './components/Content';
import Form from './components/Form';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/about" element={<About />} />
            <Route path="/about/form" element={<Form/>} />
            <Route path="/about/feedback" element={<Feedback/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Content />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;