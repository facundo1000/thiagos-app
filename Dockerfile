# Use an official Node.js base image for the build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the application configuration files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application files
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
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN pnpm prune --prod && pnpm cache clean --force

# Expose the port the application runs on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/main.js"]