# Sinte la emocion

- Se trata de una web donde las empresas pueden enviar aal admmin publicaciones y los usuarios pueden reservar dichas actividades

- Cada actividad tiene un formulario que debera rellenar y enviar la empresa para que el admin la suba

- Cada actividad una vez realizada puede ser votada por lo susuarios que la han hecho de 1 a 5

## Endpoints del usuario

- POST - [/users] - Crea un usuario pendiente de activar. (CHECKED)
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado. (CHECKED)
- GET - [/users/:idUser] - Retorna información de un usuario concreto. (CHECKED)
- POST - [/users/login] - Logea a un usuario retornando un token. (JAVIER)

- PUT - [/users/:idUser] - Edita informacion del usuario. (SAUL)
- PUT - [/users/:idUser/avatar] - Edita el avatar de un usuario. (JOSE CARLOS)
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario. (NATALIA)
- PUT - [/users/password/recover] - Envia un correo con el código de reseteo de contraseña a un email. (NATALIA)
- PUT - [/users/password/reset] - Cambia la contraseña de un usuario con un código de reseteo.(NATALIA)
- DELETE - [/users/:idUser] - Borra un usuario. (JAVIER)

## Endpoints de actividades

- GET - [/activity] - Retorna el listado de entradas. (?city=Vigo&mes=julio) (JOSE CARLOS)
- GET - [/activity/:idActivity] - Retorna una entrada en concreto. (SAUL)
- POST - [/activity] - Crea una entrada. (JAVIER)
- POST - [/activity/:idActivity/photos] - Añade una imagen a una entrada. (JOSE CARLOS)
- GET - [/activity/:idActivity/ratings] - Abre las valoraciones de esa actividad (JAVIER)
- PUT - [/activity/:idActivity] - Edita la descripción o el título de una entrada. (SAUL)
- DELETE - [/activity/:idActivity] - Borra una entrada. (JOSE CARLOS)

- POST - [/activity/:idActivity/reserve] - enviar reserva de una actividad (NATALIA)
- POST - [/activity/:idActivity/votes] - Vota una entrada. (JAVIER)

## Endpoin aparte

- GET - [/search] - Muestra el buscador generico de la web ((?city=Vigo&mes=julio)) (SAUL)
- GET - [/contact] - Muestra el modal de contactar (JOSE CARLOS)

REUNION MARTES 13:30
