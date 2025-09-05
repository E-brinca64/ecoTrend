FROM node:18-alpine

WORKDIR /app

# Copia dependências
COPY package*.json ./

# Instala todas as dependências, inclusive devDependencies
RUN npm ci

# Copia o código fonte
COPY . .

# Build da aplicação Next.js
RUN npm run build

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar a aplicação em produção (Next.js standalone)
CMD ["npm", "start"]