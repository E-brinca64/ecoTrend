import Card from './Card';
import "../styles/Body.css";
import Banner  from '../assets/banner.jpg';

function Body(){
    const objeto = produtos.JSON.parse(localStorage.getItem('roupas'));
    
    return(
        <main>
            <img src={Banner} alt="mcqueen" className='pqp'/>
            <h1 className='body-title'>Lorem Ipsum</h1>
            <p className='body-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint at veniam itaque illum veritatis optio explicabo et cumque fuga ab magnam.</p>
            <div className='body-cards'>
                <Card nome="teste" descricao="lorem ipsum" preco="22"/>
                <Card nome="teste" descricao="lorem ipsum" preco="22"/>
                <Card nome="teste" descricao="lorem ipsum" preco="22"/>
                <Card nome="teste" descricao="lorem ipsum" preco="22"/>
            </div>



        </main>
    );
}

export default Body