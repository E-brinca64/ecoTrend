import { useState, useEffect } from 'react';
import Banner from '../assets/banner.jpg';
import "../styles/Body.css";
import Card from './Card';

function Body(){
    const [roupas, setRoupas] = useState([]);
    const [produtosDeBeleza, setProdutosDeBeleza] = useState([]);

    useEffect(() => {
        fetch('/produtos.json')
            .then(res => res.json())
            .then(dados => {
                setRoupas(dados.roupas);
                setProdutosDeBeleza(dados.produtosDeBeleza);
            })
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }, []);

    return(
        <main>
            <img src={Banner} alt="banner" className='pqp'/>
            <h1 className='body-title'>Nossas Roupas</h1>
            <p className='body-text'>Descubra nossa coleção de roupas sustentáveis e eco-friendly.</p>
    <div className='coluna'>
            <div className='body-cards'>
                {roupas.map((roupa) => (
                    <Card 
                        key={roupa.id}
                        nome={roupa.nome}
                        preco={roupa.preco}
                        img={roupa.img}
                    />
                ))}
            <h1 className='body-title'>Nossos Produtos de Beleza</h1>
            <p className='body-text'>Descubra nossa coleção de roupas sustentáveis e eco-friendly.</p>
                {produtosDeBeleza.map((beleza) => (
                    <Card
                        key={beleza.id}
                        nome={beleza.nome}
                        preco={beleza.preco}
                        img={beleza.img}
                    />
                ))}
    </div>
            </div>
        </main>
    );
}

export default Body;
