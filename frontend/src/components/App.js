import '../styles/App.css';
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from './Login';
import Question from './Question';
import Score from './Score';

// Routes 
const app_router=createBrowserRouter([
  {
    path:'/',
    element:<Login></Login>
  },
  {
    path:'/quiz',
    element:<Question></Question>
  },
  {
    path:'/score',
    element:<Score></Score>
  },
])

function App() {
  return (
<>
      <RouterProvider router={app_router}></RouterProvider>
      </>
    
  );
}

export default App;
