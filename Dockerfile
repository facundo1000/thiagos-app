# Usa una imagen base oficial de Node.js
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de la aplicación
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias de la aplicación
RUN pnpm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Compile the TypeScript application and copy view files
RUN pnpm run build && pnpm run copyfiles

# Use a smaller base image for the final stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN pnpm prune --production && pnpm cache clean --force

# Expose the port the application runs on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/main.js"]