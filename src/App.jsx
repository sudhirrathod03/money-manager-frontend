import React, { Suspense, lazy } from "react"; 
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() => import("./pages/HomePage")); 

function App() {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
              <HomePage />
            </Suspense>
          } 
        />
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