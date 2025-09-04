import { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import "../styles/Header.css";
import CarrinhoModal from "./CarrinhoModal";

function Header(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);
    const [totalItens, setTotalItens] = useState(0);

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        setTotalItens(total);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return(
        <header>
            <div className="header-row">
                <div className="header-logo-container">
                    <h1 className="header-logo">ecotrend</h1>
                    <img src="/planta.png" alt="planta" className="header-plant" />
                </div>

                <div className="header-actions">
                    <div className="header-cart" onClick={() => setIsCarrinhoOpen(true)}>
                        <BsCart2 size={24} color="#000" /> 
                        <p className="header-cart-text">Carrinho ({totalItens})</p>
                    </div>

                    <div className="header-user">
                        <GoPerson size={24} color="#000"/>
                        <p className="header-user-text">Entrar</p>
                    </div>

                    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            
            <div className="divisoria-verde"></div>
            
            <CarrinhoModal 
                isOpen={isCarrinhoOpen} 
                onClose={() => setIsCarrinhoOpen(false)} 
            />
        </header>
    );
}

export default Header