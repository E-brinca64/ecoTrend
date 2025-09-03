import roupa from "../assets/teste.jpg";
import "../styles/Card.css";

function Card(props){

    return(
        <div className="card">
            <img className="card-img" src={props.img || roupa} alt={props.nome}/>
            <h2 className="card-nome">{props.nome}</h2>
            
            <p className="card-price">R$ {props.preco?.toFixed(2)}</p>

            <button className="card-button">Adicionar ao carrinho</button>
        </div>
    );
}
export default Card