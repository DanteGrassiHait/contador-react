
const Contador = () => {
    const [contador, setContador] = React.useState(0);
    
    const aumentarContador = () => setContador(contador + 1);
    const disminuirContador = () => setContador(contador - 1);
    
    return (
        <div>
            <h1 className={contador < 0 ? "menor" : "mayor"}>Contador: {contador}</h1>
            <hr></hr>
            <button onClick={aumentarContador}>Aumentar</button>
            <button onClick={disminuirContador}>Disminuir</button>
        </div>
    );
}