import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import {useSelector} from 'react-redux';

import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const {loading}=useSelector((state)=>state.alerts);
  return (
    
    <div>
     
      <BrowserRouter>

      {
        loading && (
        <div className='spinner-parent'>
          <div className="spinner-border" role="status">
        </div>
        </div>
        )
      }
 

    
       <Toaster position='top-center'reverseOrder={false}/>
       <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={
         <Home/>  
          }/>
       </Routes>
      
      </BrowserRouter>
   
     </div>

  
  
 
  );
}

export default App;
