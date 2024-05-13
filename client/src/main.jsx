import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <RouterProvider router={router} />

  </div>
)
