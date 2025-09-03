import { useState } from 'react';
import Banner from '../assets/banner.jpg';
import "../styles/Body.css";
import Card from './Card';

function Body(){
    const [roupas, setRoupas] = useState([]);
    
    fetch('/produtos.JSON')
        .then(res => res.json())
        .then(dados => setRoupas(dados.roupas));
    
    return(
        <main>
            <img src={Banner} alt="banner" className='pqp'/>
            <h1 className='body-title'>Nossas Roupas</h1>
            <p className='body-text'>Descubra nossa coleção de roupas sustentáveis e eco-friendly.</p>
            <div className='body-cards'>
                {roupas.map((roupa) => (
                    <Card 
                        key={roupa.id}
                        nome={roupa.nome}
                        preco={roupa.preco}
                        img={roupa.img}
                    />
                ))}
            </div>
        </main>
    );
}

export default Body