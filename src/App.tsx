import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About'; 
import Login from './components/Login'; 
import Content from './components/Content';
import Form from './components/Form';
import Feedback from './components/Feedback';
import Admin from './components/Admin';
import CMS from './components/CMS';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';

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
            <Route path="/login/signup" element={<SignUp/>} />
            <Route path="/login/alogin" element={<AdminLogin/>} />
            <Route path="/login/admin" element={<Admin/>} />
            <Route path="/login/CMS" element={<CMS/>} />
          <Route path="/" element={<Content />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;