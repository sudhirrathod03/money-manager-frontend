import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ToastContainer, Slide } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      

      <ToastContainer 
        position="top-center"      
        transition={Slide}      
        autoClose={2000}         
        hideProgressBar={true}     
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        limit={3}                 
      />
    </>
  );
}

export default App;