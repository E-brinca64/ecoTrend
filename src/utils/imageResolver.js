import { imageMap } from '../assets/index.js';

// Função para resolver o caminho da imagem
export const getImageSrc = (imageName) => {
  if (imageMap[imageName]) {
    return imageMap[imageName];
  }
  
  // Fallback para imagens não encontradas
  console.warn(`Imagem não encontrada: ${imageName}`);
  return '/src/assets/placeholder.png';
};

// Função para processar produtos e resolver suas imagens
export const processProducts = (products) => {
  return products.map(product => ({
    ...product,
    img: getImageSrc(product.img)
  }));
};
