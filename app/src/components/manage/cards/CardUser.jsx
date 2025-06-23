
export default function CardUser({matricula, nome, tipo}){
    return(
        <div>
            <h2>{matricula}</h2>
            <p>{nome}</p>
            <p>{tipo}</p>
            <button>Editar</button>
            <button>Remover</button>
        </div>
    );
}