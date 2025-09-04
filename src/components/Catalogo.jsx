import { useEffect, useState } from 'react';
import "../styles/Catalogo.css";
import Card from './Card';

function Catalogo({ categoria, onVoltar }) {
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    
    // Estados dos filtros
    const [filtroPreco, setFiltroPreco] = useState({ min: '', max: '' });
    const [filtroCor, setFiltroCor] = useState('');
    const [ordem, setOrdem] = useState('nome');

    useEffect(() => {
        fetch('/produtos.json')
            .then(res => res.json())
            .then(dados => {
                let produtosCategoria = [];
                let tituloCategoria = '';
                let descricaoCategoria = '';

                switch(categoria) {
                    case 'roupas':
                        produtosCategoria = dados.roupas;
                        tituloCategoria = 'Nossas Roupas';
                        descricaoCategoria = 'Descubra nossa coleção de roupas sustentáveis e eco-friendly.';
                        break;
                    case 'beleza':
                        produtosCategoria = dados.produtosDeBeleza;
                        tituloCategoria = 'Nossos Produtos de Beleza';
                        descricaoCategoria = 'Produtos de beleza naturais e sustentáveis para sua rotina.';
                        break;
                    case 'casa':
                        produtosCategoria = dados.itensParaCasa;
                        tituloCategoria = 'Itens para Casa';
                        descricaoCategoria = 'Transforme sua casa com produtos sustentáveis e eco-friendly.';
                        break;
                    default:
                        produtosCategoria = [];
                }

                setProdutos(produtosCategoria);
                setProdutosFiltrados(produtosCategoria);
                setTitulo(tituloCategoria);
                setDescricao(descricaoCategoria);
            })
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }, [categoria]);

    // Função para aplicar filtros
    const aplicarFiltros = () => {
        let produtosFiltrados = [...produtos];

        // Filtro por preço
        if (filtroPreco.min !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.preco >= parseFloat(filtroPreco.min));
        }
        if (filtroPreco.max !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.preco <= parseFloat(filtroPreco.max));
        }

        // Filtro por cor
        if (filtroCor !== '') {
            produtosFiltrados = produtosFiltrados.filter(produto => 
                produto.cor.toLowerCase().includes(filtroCor.toLowerCase())
            );
        }

        // Ordenação
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

    // Aplicar filtros quando os valores mudarem
    useEffect(() => {
        aplicarFiltros();
    }, [produtos, filtroPreco, filtroCor, ordem]);

    // Função para limpar filtros
    const limparFiltros = () => {
        setFiltroPreco({ min: '', max: '' });
        setFiltroCor('');
        setOrdem('nome');
    };

    // Obter cores únicas dos produtos
    const coresUnicas = [...new Set(produtos.map(produto => produto.cor).filter(cor => cor !== ''))];

    return (
        <div className="catalogo-container">
            <div className="catalogo-header">
                <button className="voltar-btn" onClick={onVoltar}>
                    ← Voltar
                </button>
                <h1 className="catalogo-title">{titulo}</h1>
                <p className="catalogo-description">{descricao}</p>
            </div>
            
            {/* Seção de Filtros */}
            <div className="filtros-container">
                <div className="filtros-row">
                    {/* Filtro por Preço */}
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

                    {/* Filtro por Cor */}
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

                    {/* Ordenação */}
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

                    {/* Botão Limpar */}
                    <button className="limpar-filtros-btn" onClick={limparFiltros}>
                        Limpar Filtros
                    </button>
                </div>
                
                <div className="resultados-info">
                    <p>{produtosFiltrados.length} produto(s) encontrado(s)</p>
                </div>
            </div>
            
            <div className="catalogo-grid">
                {produtosFiltrados.map((produto) => (
                    <Card 
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        preco={produto.preco}
                        img={produto.img}
                        categoria={produto.categoria}
                        cor={produto.cor}
                    />
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
