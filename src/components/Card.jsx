import { useState } from "react";
import roupa from "../assets/teste.jpg";
import "../styles/Card.css";

function Card(props){
    const [showAlert, setShowAlert] = useState(false);

    const handleAdicionarAoCarrinho = () => {
        const produto = {
            id: props.id,
            nome: props.nome,
            preco: props.preco,
            img: props.img,
            categoria: props.categoria,
            cor: props.cor
        };
        
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);
        
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            produto.quantidade = 1;
            carrinhoAtual.push(produto);
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
        window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
        
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    return(
        <div className="card">
            <img className="card-img" src={props.img || roupa} alt={props.nome}/>
            <h2 className="card-nome">{props.nome}</h2>
            
            <p className="card-price">R$ {props.preco?.toFixed(2)}</p>

            <button className="card-button" onClick={handleAdicionarAoCarrinho}>
                Adicionar ao carrinho
            </button>
            
            {showAlert && (
                <div className="alert-bonito">
                    <div className="alert-content">
                        <span className="alert-icon">✓</span>
                        <span className="alert-text">Adicionado ao carrinho!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Card