# Utilitzem una imatge lleugera d'Nginx basada en Alpine Linux
FROM nginx:alpine

# Copiem tot el contingut del projecte a la carpeta on Nginx serveix els fitxers estàtics
COPY . /usr/share/nginx/html

# Exposem el port 80
EXPOSE 80

# El servidor Nginx s'inicia automàticament
CMD ["nginx", "-g", "daemon off;"]
