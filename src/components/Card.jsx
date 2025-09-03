import "../styles/Card.css"
import roupa from "../assets/teste.jpg"

function Card(props){

    return(
        <div className="card">
            <img className="card-img" src={roupa} alt="lorem"/>
            <h2 className="card-nome">{props.nome}</h2>
    
            {/* <p className="card-texto">{props.descricao}</p> */}
            
            <p className="card-price">R${props.preco}</p>

            <button className="card-button">Adicionar ao carrinho</button>
        </div>
    );
}
export default Card