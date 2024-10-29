import {Routes,Route} from 'react-router-dom'
import TodoHome from './Pages/TodoHome'

export default function App() {
  return (
    <div>
     <Routes>
        <Route path='/' element={<TodoHome/>} />
      </Routes>     
    </div>
  )
}
