import { useState } from 'react';
import '../styles/Checkout.css';

function Checkout({ onVoltar, carrinho, onFinalizarCompra }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    formaPagamento: 'pix'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [frete, setFrete] = useState(0);
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [freteSelecionado, setFreteSelecionado] = useState(null);

  const totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  
  const calcularFrete = (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    const opcoes = [
      {
        nome: 'PAC',
        prazo: '5-7 dias úteis',
        valor: 15.90,
        id: 'pac'
      },
      {
        nome: 'SEDEX',
        prazo: '2-3 dias úteis',
        valor: 25.90,
        id: 'sedex'
      },
      {
        nome: 'SEDEX 10',
        prazo: '1 dia útil',
        valor: 35.90,
        id: 'sedex10'
      }
    ];

    if (cepLimpo.length === 8) {
      setOpcoesFrete(opcoes);
      setFreteSelecionado(opcoes[0]);
      setFrete(opcoes[0].valor);
    } else {
      setOpcoesFrete([]);
      setFreteSelecionado(null);
      setFrete(0);
    }
  };

  const buscarEndereco = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErrors(prev => ({ ...prev, cep: 'CEP não encontrado' }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        cep: cepLimpo
      }));

      setErrors(prev => ({ ...prev, cep: '' }));
      
      calcularFrete(cepLimpo);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setErrors(prev => ({ ...prev, cep: 'Erro ao buscar CEP' }));
    } finally {
      setCepLoading(false);
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) novosErros.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) novosErros.email = 'Email inválido';
    if (!formData.telefone.trim()) novosErros.telefone = 'Telefone é obrigatório';
    else if (formData.telefone.replace(/\D/g, '').length < 10) novosErros.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    if (!formData.cep.trim()) novosErros.cep = 'CEP é obrigatório';
    else if (formData.cep.replace(/\D/g, '').length !== 8) novosErros.cep = 'CEP deve ter 8 dígitos';
    if (!formData.numero.trim()) novosErros.numero = 'Número é obrigatório';
    if (!freteSelecionado) novosErros.frete = 'Selecione uma opção de frete';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const formatarCEP = (value) => {
    const cepLimpo = value.replace(/\D/g, '');
    
    if (cepLimpo.length <= 5) {
      return cepLimpo;
    } else {
      return cepLimpo.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    }
  };

  const formatarTelefone = (value) => {
    const telefoneLimpo = value.replace(/\D/g, '');
    
    if (telefoneLimpo.length <= 2) {
      return telefoneLimpo;
    } else if (telefoneLimpo.length <= 6) {
      return telefoneLimpo.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    } else if (telefoneLimpo.length <= 10) {
      return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const formatarNumero = (value) => {
    return value.replace(/\D/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'cep') {
      valorFormatado = formatarCEP(value);
      const cepLimpo = value.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarEndereco(cepLimpo);
      }
    } else if (name === 'telefone') {
      valorFormatado = formatarTelefone(value);
    } else if (name === 'numero') {
      valorFormatado = formatarNumero(value);
    }

    setFormData(prev => ({ ...prev, [name]: valorFormatado }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyDown = (e) => {
    const { name } = e.target;
    
    if (name === 'numero') {
      if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pedido = {
        id: Date.now(),
        cliente: formData,
        itens: carrinho,
        subtotal: totalCarrinho,
        frete: frete,
        freteSelecionado: freteSelecionado,
        total: totalCarrinho + frete,
        data: new Date().toISOString(),
        status: 'confirmado'
      };

      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      pedidos.push(pedido);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));

      if (onFinalizarCompra) {
        onFinalizarCompra(pedido);
      }

    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (carrinho.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Carrinho vazio</h2>
        <p>Adicione produtos ao carrinho antes de finalizar a compra.</p>
        <button onClick={onVoltar} className="btn-voltar">
          Continuar comprando
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button onClick={onVoltar} className="btn-voltar">
          ← Voltar
        </button>
        <h1>Finalizar Compra</h1>
      </div>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h2>Dados Pessoais</h2>
            
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''}
                placeholder="Digite seu nome completo"
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="seu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={errors.telefone ? 'error' : ''}
                  placeholder="(11) 99999-9999"
                  maxLength="15"
                />
                {errors.telefone && <span className="error-message">{errors.telefone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Endereço de Entrega</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cep">CEP *</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className={errors.cep ? 'error' : ''}
                  placeholder="00000-000"
                  maxLength="9"
                />
                {cepLoading && <span className="loading-text">Buscando...</span>}
                {errors.cep && <span className="error-message">{errors.cep}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número *</label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={errors.numero ? 'error' : ''}
                  placeholder="123"
                  maxLength="10"
                />
                {errors.numero && <span className="error-message">{errors.numero}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Avenida, etc."
                readOnly
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Apartamento, casa, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Cidade"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  placeholder="UF"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Opções de Frete</h2>
            
            {opcoesFrete.length > 0 ? (
              <div className="frete-options">
                {opcoesFrete.map((opcao) => (
                  <label key={opcao.id} className="frete-option">
                    <input
                      type="radio"
                      name="frete"
                      value={opcao.id}
                      checked={freteSelecionado?.id === opcao.id}
                      onChange={() => {
                        setFreteSelecionado(opcao);
                        setFrete(opcao.valor);
                      }}
                    />
                    <div className="frete-info">
                      <div className="frete-nome">{opcao.nome}</div>
                      <div className="frete-prazo">{opcao.prazo}</div>
                      <div className="frete-valor">R$ {opcao.valor.toFixed(2)}</div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="frete-placeholder">
                Digite um CEP válido para ver as opções de frete
              </p>
            )}
            
            {errors.frete && <span className="error-message">{errors.frete}</span>}
          </div>

          <div className="form-section">
            <h2>Forma de Pagamento</h2>
            
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="formaPagamento"
                  value="pix"
                  checked={formData.formaPagamento === 'pix'}
                  onChange={handleChange}
                />
                <span>PIX (5% de desconto)</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="formaPagamento"
                  value="cartao"
                  checked={formData.formaPagamento === 'cartao'}
                  onChange={handleChange}
                />
                <span>Cartão de Crédito</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="formaPagamento"
                  value="boleto"
                  checked={formData.formaPagamento === 'boleto'}
                  onChange={handleChange}
                />
                <span>Boleto Bancário</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-finalizar"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Resumo do Pedido</h2>
          
          <div className="order-items">
            {carrinho.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.img} alt={item.nome} />
                <div className="item-details">
                  <h3>{item.nome}</h3>
                  <p>Qtd: {item.quantidade}</p>
                  <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>R$ {totalCarrinho.toFixed(2)}</span>
            </div>
            
            {freteSelecionado && (
              <div className="total-line">
                <span>Frete ({freteSelecionado.nome}):</span>
                <span>R$ {frete.toFixed(2)}</span>
              </div>
            )}
            
            {formData.formaPagamento === 'pix' && (
              <div className="total-line discount">
                <span>Desconto PIX (5%):</span>
                <span>-R$ {((totalCarrinho + frete) * 0.05).toFixed(2)}</span>
              </div>
            )}
            
            <div className="total-line final">
              <span>Total:</span>
              <span>
                R$ {formData.formaPagamento === 'pix' 
                  ? ((totalCarrinho + frete) * 0.95).toFixed(2)
                  : (totalCarrinho + frete).toFixed(2)
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
