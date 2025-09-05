import { useEffect, useState } from 'react';
import '../styles/SimilarProducts.css';
import Card from './Card';

function SimilarProducts({ currentProduct, onProductClick }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/produtos.JSON');
        const data = await response.json();
        
        let allProducts = [];
        for (const category in data) {
          allProducts = [...allProducts, ...data[category]];
        }
        
        const similar = allProducts
          .filter(product => 
            product.categoria === currentProduct.categoria && 
            product.id !== currentProduct.id
          )
          .slice(0, 4);
        
        setSimilarProducts(similar);
      } catch (err) {
        console.error('Erro ao buscar produtos similares:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct) {
      fetchSimilarProducts();
    }
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="similar-products-loading">
        <p>Carregando produtos similares...</p>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="similar-products">
      <h2 className="similar-products-title">Produtos Similares</h2>
      <div className="similar-products-carousel">
        {similarProducts.map((product) => (
          <div 
            key={product.id} 
            className="similar-product-item"
            onClick={() => onProductClick(product.id)}
          >
            <Card {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
