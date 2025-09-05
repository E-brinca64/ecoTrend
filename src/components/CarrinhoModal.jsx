import { useEffect, useState } from 'react';
import { BsDash, BsPlus, BsX } from 'react-icons/bs';
import '../styles/CarrinhoModal.css';

function CarrinhoModal({ isOpen, onClose, onFinalizarCompra }) {
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho') || '[]');
        setCarrinho(carrinhoSalvo);
    }, [isOpen]);

    const removerDoCarrinho = (produtoId) => {
        const novoCarrinho = carrinho.filter(item => item.id !== produtoId);
        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
    };

    const atualizarQuantidade = (produtoId, novaQuantidade) => {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
            return;
        }

        const novoCarrinho = carrinho.map(item =>
            item.id === produtoId
                ? { ...item, quantidade: novaQuantidade }
                : item
        );
        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
    };

    const limparCarrinho = () => {
        setCarrinho([]);
        localStorage.setItem('carrinho', JSON.stringify([]));
        window.dispatchEvent(new CustomEvent('carrinhoAtualizado'));
    };

    const valorTotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);

    if (!isOpen) return null;

    return (
        <div className="carrinho-modal-overlay" onClick={onClose}>
            <div className="carrinho-modal" onClick={(e) => e.stopPropagation()}>
                <div className="carrinho-modal-header">
                    <h2>Carrinho de Compras</h2>
                    <button className="carrinho-close-btn" onClick={onClose}>
                        <BsX size={24} />
                    </button>
                </div>

                <div className="carrinho-modal-content">
                    {carrinho.length === 0 ? (
                        <div className="carrinho-vazio">
                            <p>Seu carrinho está vazio</p>
                            <p>Adicione alguns produtos para começar!</p>
                        </div>
                    ) : (
                        <>
                            <div className="carrinho-itens">
                                {carrinho.map((item) => (
                                    <div key={item.id} className="carrinho-item">
                                        <img 
                                            src={item.img} 
                                            alt={item.nome} 
                                            className="carrinho-item-img"
                                        />
                                        <div className="carrinho-item-info">
                                            <h3>{item.nome}</h3>
                                            <p className="carrinho-item-cor">{item.cor}</p>
                                            <p className="carrinho-item-preco">
                                                R$ {item.preco.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="carrinho-item-controls">
                                            <button 
                                                onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                                                className="carrinho-btn-quantidade"
                                            >
                                                <BsDash size={16} />
                                            </button>
                                            <span className="carrinho-quantidade">{item.quantidade}</span>
                                            <button 
                                                onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                                                className="carrinho-btn-quantidade"
                                            >
                                                <BsPlus size={16} />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removerDoCarrinho(item.id)}
                                            className="carrinho-btn-remover"
                                        >
                                            <BsX size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="carrinho-footer">
                                <div className="carrinho-total">
                                    <h3>Total: R$ {valorTotal.toFixed(2)}</h3>
                                </div>
                                <div className="carrinho-actions">
                                    <button 
                                        onClick={limparCarrinho}
                                        className="carrinho-btn-limpar"
                                    >
                                        Limpar Carrinho
                                    </button>
                                    <button 
                                        className="carrinho-btn-finalizar"
                                        onClick={() => {
                                            onClose();
                                            if (onFinalizarCompra) {
                                                onFinalizarCompra(carrinho);
                                            }
                                        }}
                                    >
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CarrinhoModal;
