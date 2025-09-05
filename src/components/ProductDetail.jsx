import { useEffect, useState } from 'react';
import produtosData from '../data/produtos.json';
import '../styles/ProductDetail.css';
import { processProducts } from '../utils/imageResolver';
import SimilarProducts from './SimilarProducts';

function ProductDetail({ productId, onVoltar }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        let foundProduct = null;
        for (const category in produtosData) {
          foundProduct = produtosData[category].find(item => item.id === parseInt(productId));
          if (foundProduct) break;
        }
        
        if (foundProduct) {
          const processedProduct = processProducts([foundProduct])[0];
          setProduct(processedProduct);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar produto');
        console.error('Erro ao buscar produto:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAdicionarAoCarrinho = () => {
    if (!product) return;

    const produto = {
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      img: product.img,
      categoria: product.categoria,
      cor: product.cor,
      quantidade: 1
    };
    
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);
    
    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinhoAtual.push(produto);
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>Produto não encontrado</h2>
        <p>{error || 'O produto solicitado não existe.'}</p>
        <button onClick={onVoltar} className="btn-voltar">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <button onClick={onVoltar} className="btn-voltar">
            ← Voltar
          </button>
        </div>
        
        <div className="product-detail-content">
          <div className="product-image">
            <img src={product.img} alt={product.nome} />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.nome}</h1>
            <p className="product-category">{product.categoria}</p>
            {product.cor && (
              <p className="product-color">Cor: {product.cor}</p>
            )}
            <p className="product-price">R$ {product.preco.toFixed(2)}</p>
            
            <button 
              className="btn-adicionar-carrinho"
              onClick={handleAdicionarAoCarrinho}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
        
        <SimilarProducts 
          currentProduct={product}
          onProductClick={(id) => {
            window.location.href = `#/produto/${id}`;
          }}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
