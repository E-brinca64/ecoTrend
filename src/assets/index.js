// Importar todas as imagens para garantir que sejam incluídas no build
import bannereco from './bannereco.png';
import base from './base.jpg';
import batom from './batom.png';
import calca from './calca.png';
import camisaVerde from './camisaVerde.png';
import jaqueta from './jaqueta.jpg';
import maquina from './maquina.jpg';
import planta from './planta.png';
import sabonete from './sabonete.png';
import shampoo from './shampoo.png';
import vestido from './vestido.jpg';

// Exportar as imagens para uso nos componentes
export {
    bannereco, base, batom, calca, camisaVerde, jaqueta, maquina, planta, sabonete, shampoo, vestido
};

// Mapear as imagens para facilitar o uso
export const imageMap = {
  'camisaVerde.png': camisaVerde,
  'calca.png': calca,
  'vestido.jpg': vestido,
  'jaqueta.jpg': jaqueta,
  'batom.png': batom,
  'base.jpg': base,
  'shampoo.png': shampoo,
  'sabonete.png': sabonete,
  'planta.png': planta,
  'maquina.jpg': maquina,
  'bannereco.png': bannereco
};
