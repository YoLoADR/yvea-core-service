# Choisissez une image de base
FROM node:18

# Créez un répertoire pour contenir l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install --legacy-peer-deps

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application
RUN npm run build

# Exposez le port sur lequel votre application s'exécute
EXPOSE 8000

# Définissez la commande pour exécuter votre application
CMD [ "node", "dist/main" ]