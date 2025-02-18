# Tienda de Comics 📚✨

**Tienda de Comics** es un proyecto web basado en Django y Django REST Framework que permite gestionar y explorar un catálogo de cómics, con funciones de backend diseñadas para una experiencia óptima en el manejo de datos.

**Datos** 

-Equipo 7

-Miembros del equipo:
- Briceño Espinoza Alejandro
- Elguera Lugo José Luis
- Cruz Martínez Giovanny 
- Felipe Ramírez Alondra Navila
- Gómez García Eduardo Biali


---

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Python** (versión 3.8 o superior)
- **pip** (gestor de paquetes de Python)
- Un entorno virtual (opcional pero recomendado)

---

## Instalación

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/J0sLu/Tienda-de-comics.git
   cd Tienda-de-comics
   ```

2. **Crea y activa un entorno virtual** (opcional pero recomendado)  
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias**  
   ```bash
   pip install django
   pip install djangorestframework
   pip install django-cors-headers
   ```
4. **Instala node.js**

   Windows:
   ```bash
   winget install Schniz.fnm
   fnm env --use-on-cd | Out-String | Invoke-Expression
   fnm use --install-if-missing 22
   #Verifica quese hayan instalado
   node -v # should print `v22.11.0`
   npm -v # should print `10.9.0`
   ```

   Linux:
   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
   nvm install 22
   # Checa que se haya instalado
   node -v # should print `v22.11.0`
   npm -v # should print `10.9.0`
   ```
   
4. **Configura la base de datos**  
   Ejecuta las migraciones necesarias:  
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Ejecuta el servidor de desarrollo**  
   ```bash
   python manage.py runserver
   ```
6. **Levanta ell frontend**
   En la carpeta proyecto/frontend ejecuta:
   ```bash
   npm install
   npm start
   ```
---

## Estructura del Proyecto

- **Backend:** Desarrollado con Django y Django REST Framework, proporciona las APIs necesarias para gestionar los datos de los cómics.
- **Gestión de Cors:** Configurado con `django-cors-headers` para permitir el acceso desde aplicaciones externas.

---

## Uso
