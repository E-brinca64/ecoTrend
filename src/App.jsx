import { useState } from 'react';
import Body from './components/Body';
import Catalogo from './components/Catalogo';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import SearchResults from './components/SearchResults';
import Sidebar from './components/Sidebar';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navegarParaCatalogo = (categoria) => {
    setCategoriaAtual(categoria);
    setPaginaAtual('catalogo');
  };

  const voltarParaHome = () => {
    setPaginaAtual('home');
    setCategoriaAtual('');
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearch = (termo, resultados) => {
    setSearchTerm(termo);
    setSearchResults(resultados);
    setPaginaAtual('search');
  };

  const handleHome = () => {
    setPaginaAtual('home');
    setCategoriaAtual('');
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarNavigate = (item) => {
    if (item === 'todos') {
      setCategoriaAtual('todos');
      setPaginaAtual('catalogo');
    } else if (item === 'favoritos') {
      setPaginaAtual('favoritos');
    } else if (item === 'sobre') {
      console.log('Navegando para sobre nós');
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setPaginaAtual('product');
  };

  const voltarDaPaginaProduto = () => {
    setSelectedProductId(null);
    setPaginaAtual('home');
  };

  const handleFavoritesClick = () => {
    setPaginaAtual('favoritos');
  };

  return (
    <FavoritesProvider>
      <div className="app">
        <Header 
          onSearch={handleSearch} 
          onHome={handleHome}
          onSidebarToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
          onFavoritesClick={handleFavoritesClick}
        />
        {paginaAtual === 'home' ? (
          <Body onVerMais={navegarParaCatalogo} onProductClick={handleProductClick} />
        ) : paginaAtual === 'catalogo' ? (
          <Catalogo categoria={categoriaAtual} onVoltar={voltarParaHome} onProductClick={handleProductClick} />
        ) : paginaAtual === 'product' ? (
          <ProductDetail productId={selectedProductId} onVoltar={voltarDaPaginaProduto} />
        ) : paginaAtual === 'favoritos' ? (
          <Favorites onVoltar={voltarParaHome} onProductClick={handleProductClick} />
        ) : (
          <SearchResults 
            searchTerm={searchTerm} 
            searchResults={searchResults} 
            onVoltar={voltarParaHome}
            onProductClick={handleProductClick}
          />
        )}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          onNavigate={handleSidebarNavigate}
        />
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App
