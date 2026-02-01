import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ToastContainer, Slide } from "react-toastify"; // Import Slide for smoother animation
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      
      {/* Global Notification Container */}
      <ToastContainer 
        position="top-center"      // Position: Top Middle
        transition={Slide}         // Animation: Smooth Slide
        autoClose={2000}           // Closes faster (2 seconds)
        hideProgressBar={true}     // Hides the bar for a cleaner look
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        limit={3}                  // Prevents screen clutter
      />
    </>
  );
}

export default App;