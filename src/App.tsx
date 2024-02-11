import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Header';
import Footer from './components/Footer';
import About from './components/About'; 
import Login from './components/Login'; 
import Content from './components/Content';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Content />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;