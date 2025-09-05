import { useEffect, useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/Favorites.css';
import Card from './Card';

function Favorites({ onVoltar, onProductClick }) {
  const { favorites, removeFromFavorites, clearFavorites, favoritesCount } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular loading para consistência
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFavorite = (productId, event) => {
    event.stopPropagation();
    removeFromFavorites(productId);
  };

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja remover todos os favoritos?')) {
      clearFavorites();
    }
  };

  if (loading) {
    return (
      <div className="favorites-loading">
        <div className="loading-spinner"></div>
        <p>Carregando favoritos...</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <button onClick={onVoltar} className="btn-voltar">
          ← Voltar
        </button>
        <h1 className="favorites-title">Meus Favoritos</h1>
        <p className="favorites-description">
          {favoritesCount} produto(s) favorito(s)
        </p>
        
        {favoritesCount > 0 && (
          <button onClick={handleClearAll} className="btn-limpar-favoritos">
            Limpar Todos
          </button>
        )}
      </div>

      {favoritesCount === 0 ? (
        <div className="favorites-empty">
          <div className="empty-icon">💚</div>
          <h2>Nenhum favorito ainda</h2>
          <p>Adicione produtos aos seus favoritos clicando no coração!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-item">
              <button
                className="btn-remover-favorito"
                onClick={(e) => handleRemoveFavorite(product.id, e)}
                title="Remover dos favoritos"
              >
                ❤️
              </button>
              <Card 
                {...product} 
                onProductClick={onProductClick}
                showFavoriteButton={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
