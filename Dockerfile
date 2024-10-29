# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package.json package-lock.json ./

# Instala las dependencias
RUN pnpm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Genera el Prisma client
RUN npx prisma generate

# Compila la aplicación TypeScript y copia los archivos de vistas
RUN pnpm run build && pnpm run copyfiles

# Elimina las dependencias de desarrollo para reducir el tamaño de la imagen
RUN pnpm prune --production && pnpm cache clean --force

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "dist/main.js"]