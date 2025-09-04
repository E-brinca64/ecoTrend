import { useState } from 'react';
import Body from './components/Body';
import Catalogo from './components/Catalogo';
import Header from './components/Header';
import SearchResults from './components/SearchResults';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className="app">
      <Header onSearch={handleSearch} onHome={handleHome}/>
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
    </div>
  );
}

export default App
