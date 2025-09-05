import { useEffect, useState } from 'react';
import "../styles/SearchResults.css";
import Card from './Card';

function SearchResults({ searchTerm, searchResults, onVoltar, onProductClick }) {
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [filtroPreco, setFiltroPreco] = useState({ min: '', max: '' });
    const [filtroCor, setFiltroCor] = useState('');
    const [ordem, setOrdem] = useState('nome');

    useEffect(() => {
        setProdutosFiltrados(searchResults);
    }, [searchResults]);

    const aplicarFiltros = () => {
        let produtosFiltrados = [...searchResults];

        if (filtroPreco.min !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.preco >= parseFloat(filtroPreco.min));
        }
        if (filtroPreco.max !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.preco <= parseFloat(filtroPreco.max));
        }

        if (filtroCor !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => 
                produto.cor.toLowerCase().includes(filtroCor.toLowerCase())
            );
        }

        produtosFiltrados.sort((a, b) => {
            switch(ordem) {
                case 'preco-menor':
                    return a.preco - b.preco;
                case 'preco-maior':
                    return b.preco - a.preco;
                case 'nome':
                default:
                    return a.nome.localeCompare(b.nome);
            }
        });

        setProdutosFiltrados(produtosFiltrados);
    };

    useEffect(() => {
        aplicarFiltros();
    }, [searchResults, filtroPreco, filtroCor, ordem]);

    const limparFiltros = () => {
        setFiltroPreco({ min: '', max: '' });
        setFiltroCor('');
        setOrdem('nome');
    };

    const coresUnicas = [...new Set(searchResults.map(produto => produto.cor).filter(cor => cor !== ''))];

    return (
        <div className="search-results-container">
            <div className="search-results-header">
                <button className="voltar-btn" onClick={onVoltar}>
                    ← Voltar
                </button>
                <h1 className="search-results-title">
                    Resultados para "{searchTerm}"
                </h1>
                <p className="search-results-description">
                    {searchResults.length} produto(s) encontrado(s)
                </p>
            </div>
            
            <div className="filtros-container">
                <div className="filtros-row">
                    <div className="filtro-group">
                        <label>Preço:</label>
                        <div className="preco-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filtroPreco.min}
                                onChange={(e) => setFiltroPreco({...filtroPreco, min: e.target.value})}
                            />
                            <span>até</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filtroPreco.max}
                                onChange={(e) => setFiltroPreco({...filtroPreco, max: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="filtro-group">
                        <label>Cor:</label>
                        <select
                            value={filtroCor}
                            onChange={(e) => setFiltroCor(e.target.value)}
                        >
                            <option value="">Todas as cores</option>
                            {coresUnicas.map(cor => (
                                <option key={cor} value={cor}>{cor}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filtro-group">
                        <label>Ordenar por:</label>
                        <select
                            value={ordem}
                            onChange={(e) => setOrdem(e.target.value)}
                        >
                            <option value="nome">Nome (A-Z)</option>
                            <option value="preco-menor">Menor preço</option>
                            <option value="preco-maior">Maior preço</option>
                        </select>
                    </div>

                    <button className="limpar-filtros-btn" onClick={limparFiltros}>
                        Limpar Filtros
                    </button>
                </div>
                
                <div className="resultados-info">
                    <p>{produtosFiltrados.length} produto(s) encontrado(s)</p>
                </div>
            </div>
            
            {produtosFiltrados.length > 0 ? (
                <div className="search-results-grid">
                    {produtosFiltrados.map((produto) => (
                        <Card 
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            preco={produto.preco}
                            img={produto.img}
                            categoria={produto.categoria}
                            cor={produto.cor}
                            onProductClick={onProductClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <h2>Nenhum produto encontrado</h2>
                    <p>Tente ajustar os filtros ou fazer uma nova pesquisa.</p>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
