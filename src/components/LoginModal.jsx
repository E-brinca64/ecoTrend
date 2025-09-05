import { useState } from 'react';
import { BsEye, BsEyeSlash, BsX } from 'react-icons/bs';
import '../styles/LoginModal.css';

function LoginModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Lógica de login
            console.log('Login:', { email: formData.email, senha: formData.senha });
            alert('Login realizado com sucesso!');
            onClose();
        } else {
            // Lógica de registro
            if (formData.senha !== formData.confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            console.log('Registro:', formData);
            alert('Conta criada com sucesso!');
            onClose();
        }
        
        // Limpar formulário
        setFormData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (!isOpen) return null;

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <div className="login-modal-header">
                    <h2>{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
                    <button className="login-close-btn" onClick={onClose}>
                        <BsX size={24} />
                    </button>
                </div>

                <div className="login-modal-content">
                    <form onSubmit={handleSubmit} className="login-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="nome">Nome completo</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    placeholder="Digite seu nome completo"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Digite seu e-mail"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="senha"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Digite sua senha"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="confirmarSenha">Confirmar senha</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        value={formData.confirmarSenha}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                        placeholder="Confirme sua senha"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button type="submit" className="login-submit-btn">
                            {isLogin ? 'Entrar' : 'Criar Conta'}
                        </button>
                    </form>

                    <div className="login-modal-footer">
                        <p>
                            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                            <button 
                                type="button" 
                                className="login-toggle-btn"
                                onClick={toggleMode}
                            >
                                {isLogin ? 'Criar conta' : 'Fazer login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
