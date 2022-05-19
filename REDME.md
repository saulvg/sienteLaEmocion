# Sinte la emocion

- Se trata de una web donde las empresas pueden enviar al admin experiencias que van a realizar y los usuarios pueden reservar dichas experiencias

- Cada actividad tiene un formulario que debera rellenar y enviar la empresa para que el admin la suba

- Cada experiencia puede ser reseravda y una vez realizada puede ser votada por los usuarios que la han realizado de 1 a 5

- Los usuarios anonimos pueden:
  Buscar las experiencias que les interesen:
  Filtrando por precio, categoria, fecha y voto
  Buscando por palabras clave que se encuentre en alguna de las descripciones, nombre de la compañía o cuidad.
  Saber cuantos usuarios han resrvado una experiencia.
  Contactar con los admin de la Web  
   Registrarse

- Los usuarios registrados pueden:
  Hacer todo lo que los usuarios anonimos ademas de...
  Logearse
  Editar sus perfiles.
  Reservar experiencias y votarlas una vez haya pasado la fecha limite de la experiencia.
  Ver las biografias de otros usuarios.
  Saber que usuarios han reservado la experiencia que pretenden reservar.

- Los admin pueden:
  Hacer todo lo que los usuarios registrados ademas de...
  Crear, editar y eliminar experiencias
  Ha excepcion de votar las experiencias que ellos mismos crean

# Iniciar App

- Clonamos el repositorio para tenerlo de forma local, copiando el code HTTPS, abrimos una terminal donde queramos clonar el repositorio y realizando un "git clone 'el codigo copiado'"
- En mySQL deberemos crear una conexion nueva si no la tenemos y/o un esquema o tablas nuevas.
- En 'https://app.sendgrid.com/', deberemos crear una cuenta y a continuacion una API Key (se encuantras en menu/settings/API Key).
- Una vez clonado, apuntamos la terminal hacia sienlaLaEmocion-Back y ejecutamos "npm i" para intalar las dependencias necesarias
- A continuacion ejecutamos el comando, nano ".env.exaple" y rellanamos los datos: (tambien puedes realizar estos cambios desde VisualStudioCode o desde donde quieras)

  PORT= 'puerto en el que va ha escuchar nuestro servidor, ej:4000'
  MYSQL_HOST= 'Direccion host que le hayamos puesto en MySQL, ej:localhost'
  MYSQL_USER= 'Nombre de usuario que le hayamos puesto en MySQL'
  MYSQL_PASSWORD= 'Contraseña que le hayamso puesto en MySQL'
  MYSQL_DATABASE= 'Nombre que le hayamos puesto al esquema o tabla en MySQL ej:sienteLaEmocion'
  SENDGRID_API_KEY= 'Clave que nos proporcionara Sengrid'
  SENDGRID_FROM= 'Correo que le hayamos proporcionado a Sengrid'
  PUBLIC_HOST= 'Ruta en la que se va a mover nuestra App ej:http://localhost:4000'
  SECRET= 'Clave alfanumerica aleatoria de unos cuentos digitos (click teclas sin sentido ;))'
  UPLOADS_DIRECTORY= 'Carpeta que se creara cuando se suban archivos ej:uploads/directori'
  ADMIN_EMAIL= 'Direccion de correo del admin pricipal'
  ADMIN_PASS= 'Contraseña del admin pricipal'

Guarda los cambios y antes de cerrar acuerdate de cambiar el nombre del archivo a .env (si te has olvodado no pasa nada puedes hacerlo ahora).

- A continuacion ejecuta "npm run initDB" para crear las tablas necesarias en la base de datos y algunos datos de prueba, si todo a ido bien te apareceran el nombre de lo que se a ido creando.
- Hemos acabado con esta carpeta.
- Abre una nueva terminal en sente-la-emocion-front y ejecuta "npm i", para intalar todas las dependencias necesarias.
- Para finalizar ejecuta "npm start".

## Ya puedes investigar por la Web, si quieres saber un poco mejor que opciones existen no dejes de leer el analisis funcional

## Endpoints del usuario

- POST - [/users] - Crea un usuario pendiente de activar.
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado.
- GET - [/users/:idUser] - Retorna información de un usuario concreto.
- POST - [/users/login] - Logea a un usuario retornando un token.
- PUT - [/users/:idUser] - Edita informacion del usuario.
- PUT - [/users/:idUser/avatar] - Edita el avatar de un usuario.
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario.
- PUT - [/users/password/recover] - Envia un correo con el código de reseteo de contraseña a un email.
- PUT - [/users/password/reset] - Cambia la contraseña de un usuario con un código de reseteo.
- DELETE - [/users/:idUser] - Borra un usuario.

## Endpoints de experiencias

- GET - [/experiences] - Retorna el listado de experiencias.
- GET - [/experiences/:idExperience] - Retorna una experiencia en concreto.
- POST - [/experiences] - Crea una experiencia.
- POST - [/experiences/:idExperience/photos] - Añade una imagen a una experiencia.
- POST - [/experiences/:idExperience/votes] - Vota una experiencia.
- PUT - [/experiences/:idExperience] - Edita la editar campos de una experiencia.
- DELETE - [/experiences/:idExperience] - Borra una experiencia.
- get - [/experiences/:idExperience/reviews] - retornar las valoraciones de una experiencia.

## Endpoin aparte

- GET - [/search] - Muestra el buscador generico de la web
- GET - [/contact] - Muestra el modal de contactar
