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
