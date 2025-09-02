import "../styles/Header.css"
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";


function Header(){

    const qtdCart = 0
    return(
        <header>
            <div className="header-row">
                <h1 className="header-logo">ecotrend</h1>

                <div className="header-row">
                    <div className="header-cart">
                        <BsCart2 size={30} color="#000" /> 
                        <p className="header-cart-text">Carrinho {qtdCart}</p>
                    </div>

                    <div className="header-user">
                        <GoPerson size={30} color="#000"/>
                        <p className="header-user-text">Entrar</p>
                    </div>
                </div>
            </div>
        {/* <p className="center"><img src="https://readme-typing-svg.demolab.com?font=Epilogue&weight=600&size=46&pause=5000&color=8ed165&Center=true&vCenter=true&repeat=true&width=800&height=75&lines=Bem+vindo+a+Loja+EcoTrend" alt="Typing SVG" /></p> */}
            
        </header>
    );
}

export default Header