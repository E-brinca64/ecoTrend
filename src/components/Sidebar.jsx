
import "../styles/Sidebar.css";

function Sidebar({ isOpen, onClose, onNavigate }){
    const handleMenuItemClick = (item) => {
        if (onNavigate) {
            onNavigate(item);
        }
        if (onClose) {
            onClose();
        }
    };

    return(
        <>
            {isOpen && (
                <div className="sidebar-overlay active" onClick={onClose}></div>
            )}
            
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <h2 className="sidebar-title">Menu</h2>
                        <button className="sidebar-close" onClick={onClose}>
                            ×
                        </button>
                    </div>
                    
                    <nav className="sidebar-nav">
                        <button 
                            className="sidebar-menu-item"
                            onClick={() => handleMenuItemClick('todos')}
                        >
                            Todos os Itens
                        </button>
                        
                        <button 
                            className="sidebar-menu-item"
                            onClick={() => handleMenuItemClick('favoritos')}
                        >
                            💚 Meus Favoritos
                        </button>
                    </nav>
                </div>
            </aside>
        </>
    );
}
export default Sidebar