# Sinte la emocion

- Se trata de una web donde las empresas pueden enviar aal admmin publicaciones y los usuarios pueden reservar dichas actividades

- Cada actividad tiene un formulario que debera rellenar y enviar la empresa para que el admin la suba

- Cada actividad una vez realizada puede ser votada por lo susuarios que la han hecho de 1 a 5

## Endpoints del usuario

- POST - [/users] - Crea un usuario pendiente de activar.
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado.
- GET - [/users/:idUser] - Retorna información de un usuario concreto.
- POST - [/users/login] - Logea a un usuario retornando un token.

(este idUser se refiere a perfil?)

- PUT - [/users/:idUser] - Edita informacion del usuario.
- PUT - [/users/:idUser/avatar] - Edita el avatar de un usuario.
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario.
- PUT - [/users/password/recover] - Envia un correo con el código de reseteo de contraseña a un email.
- PUT - [/users/password/reset] - Cambia la contraseña de un usuario con un código de reseteo.
- DELETE - [/users/:idUser] - Borra un usuario.

## Endpoints de actividades

- GET - [/activity] - Retorna el listado de entradas.
- GET - [/activity/:idActivity] - Retorna una entrada en concreto.
- POST - [/activity] - Crea una entrada.
- POST - [/activity/:idActivity/photos] - Añade una imagen a una entrada.
- GET - [/activity/:idActivity/ratings] - Abre las valoraciones de esa actividad
- PUT - [/activity/:idActivity] - Edita la descripción o el título de una entrada.
- DELETE - [/activity/:idActivity] - Borra una entrada.
- DELETE - [/activity/:idActivity/photos/:idPhoto] - Elimina una foto de una entrada.

- (duda) GET - [/activity] (debemos combinar todas las opciones de filtrar por o con el formulario bastaria? )
- (duda) clicar en filtrar por es un nuevo endpoint?
- (duda) POST - [/activity/:idActivity/reserve] - enviar reserva de una actividad
- (duda) GET - [/activity/:idActivity/reserve] - Reservar una actividad
- (duda) POST - [/activity/:idActivity/votes] - Vota una entrada. (deberiamos poner este endpoint dentro de user porque se hace dentro del perfil la votacion?)

## Endpoin aparte

- GET - [/search] - Muestra el buscador generico de la web
- GET - [/contact] - Muestra el modal de contactar
- GET - [/contact/company] - Muestra el modal de enviar formulario para subir una actividad
