import { imageMap } from '../assets/index.js';

export const getImageSrc = (imageName) => {
  if (imageMap[imageName]) {
    return imageMap[imageName];
  }
  
  console.warn(`Imagem não encontrada: ${imageName}`);
  return '/src/assets/placeholder.png';
};

export const processProducts = (products) => {
  return products.map(product => ({
    ...product,
    img: getImageSrc(product.img)
  }));
};
