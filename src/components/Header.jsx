import { useEffect, useState } from "react";
import { BsCart2, BsHeart, BsSearch } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { useFavorites } from "../contexts/FavoritesContext";
import produtosData from '../data/produtos.json';
import "../styles/Header.css";
import LoginModal from "./LoginModal";

function Header({ onSearch, onHome, onSidebarToggle, isSidebarOpen, onFavoritesClick, onCarrinhoClick }){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [totalItens, setTotalItens] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const { favoritesCount } = useFavorites();

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        setTotalItens(total);
        
        const historico = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(historico);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
            const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
            setTotalItens(total);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('carrinhoAtualizado', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('carrinhoAtualizado', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchContainer = document.querySelector('.header-search');
            if (searchContainer && !searchContainer.contains(event.target)) {
                setShowHistory(false);
            }
        };

        if (showHistory) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHistory]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (onSidebarToggle) {
            onSidebarToggle();
        }
    };

    const handleSearch = async (termo) => {
        if (!termo.trim()) return;
        
        try {
            const todosProdutos = [
                ...produtosData.roupas,
                ...produtosData.produtosDeBeleza,
                ...produtosData.itensParaCasa
            ];
            
            const resultados = todosProdutos.filter(produto => {
                const nomeMatch = produto.nome.toLowerCase().includes(termo.toLowerCase());
                const corMatch = produto.cor && produto.cor.toLowerCase().includes(termo.toLowerCase());
                return nomeMatch || corMatch;
            });
            
            const novoHistorico = [termo, ...searchHistory.filter(item => item !== termo)].slice(0, 3);
            setSearchHistory(novoHistorico);
            localStorage.setItem('searchHistory', JSON.stringify(novoHistorico));
            
            if (onSearch) {
                onSearch(termo, resultados);
            }
            
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
        setShowHistory(false);
    };

    const handleHistoryClick = (termo) => {
        setSearchTerm(termo);
        handleSearch(termo);
        setShowHistory(false);
    };

    const handleSearchInputFocus = () => {
        if (searchHistory.length > 0) {
            setShowHistory(true);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value && searchHistory.length > 0) {
            setShowHistory(true);
        } else {
            setShowHistory(false);
        }
    };

    const handleLogoClick = () => {
        if (onHome) {
            onHome();
        }
    };

    return(
        <header>
            <div className="header-row">
                <div className="header-logo-container" onClick={handleLogoClick}>
                    <h1 className="header-logo">ecotrend</h1>
                    <img src="/planta.png" alt="planta" className="header-plant" />
                </div>

                <div className="header-search">
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onFocus={handleSearchInputFocus}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <BsSearch size={20} color="#000" />
                            </button>
                        </div>
                        {showHistory && searchHistory.length > 0 && (
                            <div className="search-history">
                                <p className="search-history-title">Pesquisas recentes:</p>
                                <div className="search-history-items">
                                    {searchHistory.map((termo, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleHistoryClick(termo)}
                                            className="search-history-item"
                                        >
                                            {termo}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="header-actions">
                    <div className="header-favorites" onClick={onFavoritesClick}>
                        <BsHeart size={24} color="#000" /> 
                        <p className="header-favorites-text">Favoritos ({favoritesCount || 0})</p>
                    </div>

                    <div className="header-cart" onClick={onCarrinhoClick}>
                        <BsCart2 size={24} color="#000" /> 
                        <p className="header-cart-text">Carrinho ({totalItens})</p>
                    </div>

                    <div className="header-user" onClick={() => setIsLoginOpen(true)}>
                        <GoPerson size={24} color="#000"/>
                        <p className="header-user-text">Entrar</p>
                    </div>

                    <div className={`mobile-menu-toggle ${isSidebarOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            
            <div className="divisoria-verde"></div>
            
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
        </header>
    );
}

export default Header