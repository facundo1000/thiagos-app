# Usa una imagen base oficial de Node.js
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Compile the TypeScript application and copy view files
RUN npm run build && npm run copyfiles

# Use a smaller base image for the final stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm prune --production && npm cache clean --force

# Expose the port the application runs on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/main.js"]