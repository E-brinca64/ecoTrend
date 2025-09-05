FROM node:18-alpine

WORKDIR /app

# Instala dependências necessárias para o health check
RUN apk add --no-cache curl

# Copia dependências
COPY package*.json ./

# Instala todas as dependências, inclusive devDependencies
RUN npm ci

# Copia o código fonte
COPY . .

# Build da aplicação Vite
RUN npm run build

# Copia o script de health check
COPY healthcheck.sh /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

# Expõe a porta padrão do Vite
EXPOSE 3000

# Configura o health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD /usr/local/bin/healthcheck.sh

# Comando para rodar a aplicação em produção (Vite preview)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]