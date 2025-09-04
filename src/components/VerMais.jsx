import "../styles/VerMais.css";

function VerMais({ onClick, totalProdutos, produtosMostrados }) {
    const produtosRestantes = totalProdutos - produtosMostrados;
    
    return (
        <div className="ver-mais-card" onClick={onClick}>
            <div className="ver-mais-content">
                <div className="ver-mais-icon">
                    <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                    >
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                </div>
                <h3 className="ver-mais-title">Ver Mais</h3>
                <p className="ver-mais-subtitle">
                    +{produtosRestantes} produtos
                </p>
            </div>
        </div>
    );
}

export default VerMais;
