import "../styles/Card.css"
import roupa from "../assets/teste.jpg"

function Card(props){
    let contador = 0
    const clickada = () => 
        contador = contador++

    return(
        <div className="card">
            {contador}
            <img className="card-img" src={roupa} alt="lorem"/>
            <h2 className="card-nome">{props.nome}</h2>
    
            <p className="card-texto">{props.descricao}</p>
            
            <p className="card-price">R${props.preco}</p>

            <button className="card-button" onClick={clickada}>Adicionar ao carrinho</button>
        </div>
    );
}
export default Card