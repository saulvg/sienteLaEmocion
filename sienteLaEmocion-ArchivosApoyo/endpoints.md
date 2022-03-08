# Sinte la emocion

- Se trata de una web donde las empresas pueden enviar aal admmin publicaciones y los usuarios pueden reservar dichas actividades

- Cada actividad tiene un formulario que debera rellenar y enviar la empresa para que el admin la suba

- Cada actividad una vez realizada puede ser votada por lo susuarios que la han hecho de 1 a 5

## Endpoints del usuario

- POST - [/users] - Crea un usuario pendiente de activar. ✅✅✅
- GET - [/users/validate/:registrationCode] - Valida un usuario recién registrado. ✅✅✅
- GET - [/users/:idUser] - Retorna información de un usuario concreto. ✅✅✅
- POST - [/users/login] - Logea a un usuario retornando un token. ✅ (bajar la caducidad del token, que lo ponemos a 1 dia ? )

- PUT - [/users/:idUser] - Edita informacion del usuario. ✅✅✅
- PUT - [/users/:idUser/avatar] - Edita el avatar de un usuario. ✅✅✅
- PUT - [/users/:idUser/password] - Edita la contraseña de un usuario. ✅✅✅
- PUT - [/users/password/recover] - Envia un correo con el código de reseteo de contraseña a un email. ✅✅✅
- PUT - [/users/password/reset] - Cambia la contraseña de un usuario con un código de reseteo.✅✅✅
- DELETE - [/users/:idUser(] - Borra un usuario. ✅(problema al querrer borrar dos usuarios, choca el email que no puede ser repetido y al intentar borrar 2 los dos se llaman deleted)✅

## Endpoints de experiencias

- GET - [/experiences] - Retorna el listado de experiencias. (?city=Vigo&mes=julio) ✅✅✅
- GET - [/experiences/:idExperience] - Retorna una experiencia en concreto. ✅✅✅
- POST - [/experiences] - Crea una experiencia. ✅ (para crear una compania y una categoria de experiencia lo hacemos desde la base de datos o como? : la foto de cabezera deberia ser obligatoria ? : como hago en postman para add files y un body raw ?) ✅
- POST - [/experiences/:idExperience/photos] - Añade una imagen a una experiencia. ✅ (deberiamos tener un bucle como en newExperience de javi para que hiciese el proceso en las 3 fotos?)✅
- POST - [/experiences/:idExperience/votes] - Vota una experiencia. ✅✅✅
- PUT - [/experiences/:idExperience] - Edita la editar campos de una experiencia. ✅✅✅
- DELETE - [/experiences/:idExperience] - Borra una experiencia. ✅✅✅

- POST - [/experiences/:idExperience/reserve] - enviar reserva de una actividad ❌ (este fichero no esta )
- get - [/experiences/:idExperience/reviews] - retornar las valoraciones de una experiencia. ❌ (este fichero no esta )

## Endpoin aparte

- GET - [/search] - Muestra el buscador generico de la web ((?city=Vigo&mes=julio)) ✅✅✅
- GET - [/contact] - Muestra el modal de contactar (JOSE CARLOS)

MEJORAS:

- si en el get user buscamos al admin, que solo devuleva el correo
- Utilizar el token para saber que usuario intenta hacer que en lugar de llamarlo cogerlo de la url
- Quizas podriamos hacer que el admin pueda banear y desbanear gente
- en cambiar la contraseha podriamos poner el dolble escirbe tu nueva contraseha al igual que al recuperarla
- asegurarnos de que el dni sea valido

DUDAS:

- deberiamos tener un endpoint para que el admin registrase las empresas y las categorias?

PENDIENTE:

- tope de capacidad(natalia)
- revisar videos de david al final lo relacionado con los shchemas
- comprobar si el fichero addEntryPhoto sobra o no sobra (combinar con newExperience?)
- corregir en el add PHOTO hace falta u nbucle para subir las 4 fotos
