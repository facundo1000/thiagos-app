# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Instala el Prisma
RUN npm install prisma --save-dev

# Instala el Prisma client
RUN npm install @prisma/client

# Genera el Prisma client
RUN npx prisma generate

# Instala el Prisma Migrate
RUN npx prisma migrate reset

# Compila la aplicación TypeScript y copia los archivos de vistas
RUN npm run build && npm run copyfiles

# Elimina las dependencias de desarrollo para reducir el tamaño de la imagen
RUN npm prune --production && npm cache clean --force

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "dist/main.js"]