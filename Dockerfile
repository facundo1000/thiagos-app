# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Copia el resto de los archivos de la aplicación
COPY . .

# Genera el Prisma client
RUN npx prisma generate  

# Compila la aplicación TypeScript y copia los archivos de vistas
RUN yarn run build && yarn run copyfiles

# Elimina las dependencias de desarrollo para reducir el tamaño de la imagen
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para correr la aplicación
CMD ["yarn", "start:prod"]
# CMD ["node", "-r", "esm", "dist/main.js"]