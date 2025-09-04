import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">ecotrend</h3>
                    <p className="footer-description">
                        Moda sustentável para um futuro melhor
                    </p>
                </div>
                
                <div className="footer-section">
                    <h4 className="footer-subtitle">Contato</h4>
                    <p className="footer-email">contato@ecotrend.com</p>
                </div>
                
                <div className="footer-section">
                    <h4 className="footer-subtitle">Sobre</h4>
                    <p className="footer-text">
                        Comprometidos com a sustentabilidade e moda consciente
                    </p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p className="footer-copyright">
                    © 2025 ecotrend. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
