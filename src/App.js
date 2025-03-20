import { useState } from 'react'
import { Home } from './Components/Home'
import { Formulario } from './Components/Formulario'
import './App.css'

function App() {
  const [user, setuser] = useState([])


  return (
      <div className='App'>
        {
          !user.length > 0 
          ?<Formulario setuser={setuser}/>
          :<Home user={user} setuser={setuser}/>
        }
       
        
      </div>
  )
}

export default App