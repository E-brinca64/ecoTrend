import { useEffect, useState } from 'react';
import Banner from '../assets/banner.png';
import produtosData from '../data/produtos.json';
import "../styles/Body.css";
import Card from './Card';
import Sidebar from './Sidebar';
import VerMais from './VerMais';

function Body({ onVerMais, onProductClick }){
    const [roupas, setRoupas] = useState([]);
    const [produtosDeBeleza, setProdutosDeBeleza] = useState([]);
    const [itensParaCasa, setItenParaCasa] = useState([]);

    useEffect(() => {
        setRoupas(produtosData.roupas);
        setProdutosDeBeleza(produtosData.produtosDeBeleza);
        setItenParaCasa(produtosData.itensParaCasa);
    }, []);

    return(
        <main>
            <Sidebar/>
            <img src={Banner} alt="banner" className='banner'/>
            <div className="divisoria-verde"></div>
            
            <section className="section">
                <h1 className='body-title'>Nossas Roupas</h1>
                <p className='body-text'>Descubra nossa coleção de roupas sustentáveis e eco-friendly.</p>
                <div className='body-cards'>
                    <div className='row'>
                        {roupas.slice(0, 3).map((roupa) => (
                            <Card 
                                key={roupa.id}
                                id={roupa.id}
                                nome={roupa.nome}
                                preco={roupa.preco}
                                img={roupa.img}
                                categoria={roupa.categoria}
                                cor={roupa.cor}
                                onProductClick={onProductClick}
                            />
                        ))}
                        {roupas.length > 3 && (
                            <VerMais 
                                onClick={() => onVerMais('roupas')}
                                totalProdutos={roupas.length}
                                produtosMostrados={3}
                            />
                        )}
                    </div>
                </div>
            </section>
            
            <section className="section">
                <h1 className='body-title'>Nossos Produtos de Beleza</h1>
                <p className='body-text'>Produtos de beleza naturais e sustentáveis para sua rotina.</p>
                <div className='body-cards'>
                    <div className='row'>
                        {produtosDeBeleza.slice(0, 3).map((beleza) => (
                            <Card
                                key={beleza.id}
                                id={beleza.id}
                                nome={beleza.nome}
                                preco={beleza.preco}
                                img={beleza.img}
                                categoria={beleza.categoria}
                                cor={beleza.cor}
                                onProductClick={onProductClick}
                            />
                        ))}
                        {produtosDeBeleza.length > 3 && (
                            <VerMais 
                                onClick={() => onVerMais('beleza')}
                                totalProdutos={produtosDeBeleza.length}
                                produtosMostrados={3}
                            />
                        )}
                    </div>
                </div>
            </section>
            
            <section className="section">
                <h1 className='body-title'>Itens para Casa</h1>
                <p className='body-text'>Transforme sua casa com produtos sustentáveis e eco-friendly.</p>
                <div className='body-cards'>
                    <div className='row'>
                        {itensParaCasa.slice(0, 3).map((casa) => (
                            <Card
                                key={casa.id}
                                id={casa.id}
                                nome={casa.nome}
                                preco={casa.preco}
                                img={casa.img}
                                categoria={casa.categoria}
                                cor={casa.cor}
                                onProductClick={onProductClick}
                            />
                        ))}
                        {itensParaCasa.length > 3 && (
                            <VerMais 
                                onClick={() => onVerMais('casa')}
                                totalProdutos={itensParaCasa.length}
                                produtosMostrados={3}
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Body;
