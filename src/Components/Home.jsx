export function Home({user, setuser}){
    const handleLogout = ()=>{
        setuser([])
    }
    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    )
}