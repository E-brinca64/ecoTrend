import { useState } from 'react';
import Body from './components/Body';
import Catalogo from './components/Catalogo';
import Header from './components/Header';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [categoriaAtual, setCategoriaAtual] = useState('');

  const navegarParaCatalogo = (categoria) => {
    setCategoriaAtual(categoria);
    setPaginaAtual('catalogo');
  };

  const voltarParaHome = () => {
    setPaginaAtual('home');
    setCategoriaAtual('');
  };

  return (
    <div className="app">
      <Header/>
      {paginaAtual === 'home' ? (
        <Body onVerMais={navegarParaCatalogo} />
      ) : (
        <Catalogo categoria={categoriaAtual} onVoltar={voltarParaHome} />
      )}
    </div>
  );
}

export default App
