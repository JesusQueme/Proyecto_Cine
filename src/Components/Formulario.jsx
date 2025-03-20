import { useState } from "react"
import "./Formulario.css"
export function Formulario({setuser}){
    const [nombre, setnombre] = useState("")
    const [contraseña, setcontraseña] = useState("")
    const [error, seterror] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(nombre ==="" || contraseña===""){
            seterror(true)
            return
        }
        seterror(false)
        setuser([nombre])
    }
    return(
        <section>
            <h1>Login</h1>

            <form className="formulario" onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={e => setnombre(e.target.value)}></input>
                <input type="password" value={contraseña} onChange={e => setcontraseña(e.target.value)}></input>
                <button>Iniciar Sesión</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    )
}