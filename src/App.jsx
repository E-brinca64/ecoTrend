import { useState } from 'react';
import Body from './components/Body';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Sidebar from './components/Sidebar';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    } else if (item === 'sobre') {
      console.log('Navegando para sobre nós');
    }
  };

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch} 
        onHome={handleHome}
        onSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      {paginaAtual === 'home' ? (
        <Body onVerMais={navegarParaCatalogo} />
      ) : paginaAtual === 'catalogo' ? (
        <Catalogo categoria={categoriaAtual} onVoltar={voltarParaHome} />
      ) : (
        <SearchResults 
          searchTerm={searchTerm} 
          searchResults={searchResults} 
          onVoltar={voltarParaHome} 
        />
      )}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        onNavigate={handleSidebarNavigate}
      />
      <Footer />
    </div>
  );
}

export default App
