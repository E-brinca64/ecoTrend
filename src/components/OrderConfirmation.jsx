import { useEffect, useState } from 'react';
import '../styles/OrderConfirmation.css';

function OrderConfirmation({ onVoltar, pedido }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="order-confirmation-loading">
        <div className="loading-spinner"></div>
        <h2>Processando seu pedido...</h2>
        <p>Aguarde enquanto confirmamos os detalhes da sua compra.</p>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="order-confirmation-error">
        <h2>Erro no pedido</h2>
        <p>Não foi possível carregar os detalhes do pedido.</p>
        <button onClick={onVoltar} className="btn-voltar">
          Voltar ao início
        </button>
      </div>
    );
  }

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado':
        return '#10B981';
      case 'processando':
        return '#F59E0B';
      case 'enviado':
        return '#3B82F6';
      case 'entregue':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmado':
        return 'Pedido Confirmado';
      case 'processando':
        return 'Processando';
      case 'enviado':
        return 'Enviado';
      case 'entregue':
        return 'Entregue';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="order-confirmation">
      <div className="order-confirmation-container">
        <div className="order-confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Compra Realizada com Sucesso!</h1>
          <p className="order-number">Pedido #{pedido.id}</p>
        </div>

        <div className="order-status">
          <div className="status-info">
            <div 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(pedido.status) }}
            >
              {getStatusText(pedido.status)}
            </div>
            <p className="status-date">
              Realizado em {formatarData(pedido.data)}
            </p>
          </div>
        </div>

        <div className="order-details">
          <div className="order-items-section">
            <h2>Itens do Pedido</h2>
            <div className="order-items">
              {pedido.itens.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.img} alt={item.nome} />
                  <div className="item-details">
                    <h3>{item.nome}</h3>
                    <p className="item-category">{item.categoria}</p>
                    <p className="item-color">Cor: {item.cor}</p>
                    <div className="item-quantity">
                      <span>Quantidade: {item.quantidade}</span>
                      <span className="item-price">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h2>Resumo do Pedido</h2>
            <div className="summary-details">
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>R$ {pedido.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Frete ({pedido.freteSelecionado?.nome || 'PAC'}):</span>
                <span>R$ {pedido.frete.toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Total:</span>
                <span>R$ {pedido.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="delivery-info">
          <h2>Informações de Entrega</h2>
          <div className="delivery-details">
            <div className="delivery-address">
              <h3>Endereço de Entrega</h3>
              <p>
                {pedido.cliente.endereco}, {pedido.cliente.numero}
                {pedido.cliente.complemento && `, ${pedido.cliente.complemento}`}
              </p>
              <p>
                {pedido.cliente.bairro} - {pedido.cliente.cidade}/{pedido.cliente.estado}
              </p>
              <p>CEP: {pedido.cliente.cep}</p>
            </div>
            <div className="delivery-contact">
              <h3>Contato</h3>
              <p>{pedido.cliente.nome}</p>
              <p>{pedido.cliente.email}</p>
              <p>{pedido.cliente.telefone}</p>
            </div>
          </div>
          
          <div className="delivery-shipping">
            <h3>Informações de Envio</h3>
            <div className="shipping-details">
              <div className="shipping-method">
                <strong>Método:</strong> {pedido.freteSelecionado?.nome || 'PAC'}
              </div>
              <div className="shipping-time">
                <strong>Prazo:</strong> {pedido.freteSelecionado?.prazo || '5-7 dias úteis'}
              </div>
              <div className="shipping-cost">
                <strong>Valor:</strong> R$ {pedido.frete.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="payment-info">
          <h2>Forma de Pagamento</h2>
          <div className="payment-details">
            <span className="payment-method">
              {pedido.cliente.formaPagamento === 'pix' && 'PIX'}
              {pedido.cliente.formaPagamento === 'cartao' && 'Cartão de Crédito'}
              {pedido.cliente.formaPagamento === 'boleto' && 'Boleto Bancário'}
            </span>
            {pedido.cliente.formaPagamento === 'pix' && (
              <p className="payment-note">
                Você receberá as instruções de pagamento por email.
              </p>
            )}
          </div>
        </div>

        <div className="next-steps">
          <h2>Próximos Passos</h2>
          <div className="steps-list">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Confirmação</h3>
                <p>Seu pedido foi confirmado e está sendo processado.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Preparação</h3>
                <p>Nossa equipe está preparando seus produtos com cuidado.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Envio</h3>
                <p>Você receberá o código de rastreamento por email.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Entrega</h3>
                <p>Seus produtos chegarão em até 5 dias úteis.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-actions">
          <button onClick={onVoltar} className="btn-continue">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
