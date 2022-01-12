# Tabla de actividades(solo lo puede hacer el admin)

    id
    idUser *
    company *
    activitieType *
    place *
    description_queIncuye *
    description_queNecesita *
    description_CuantoDyR *
    description_Consiste *
    description_primeraVez *
    description_infoExtra *
    price *
    date *
    hour *
    createdAt
    modifiedAt
    capacity *
    cordenada gps? (numero con decimales ? qu etipologia es)

# Tabla de fotos de una actividad(solo lo puede hacer el admin)//las fotos las conectamos a company-activietype-place

    id
    bannerPhotos *
    photo_Consiste *
    photo_primeraVez *
    photo_infoExtra *
    fk_idActividad *
    createdAt

# Tabla de votos de una actividad

    id
    voteStars *
    voteComment
    fk_idActividad * (seria fk de empresa tipo de actividad y lugar?)
    fk_idUser *
    createdAt

# Tabla de usuarios

    pk_id
    email *
    password *
    name *
    CifoNif
    avatar
    role(ENUM)
    active
    deleted
    registrationCode
    recoverCode
    createdAt
    modifiedAt
    telefono
    bio(sobremi)

# Tabla de reserva de actividades

    id
    fk_idActividad *
    fk_idUser *
    createdAt

# Tipologia

# empresa

    ponemos nif de la empresa?

# meter:

    claves foraneas?






    esto va a serun select no tiene columna  (debe existir un reguistro de las actividades echas) (enpoind con todas las actividades hasta la fecha de hoy ) (todas las reservas del usurio qeu la fecha y ahaya vencido )
    (numero de asistentes concretos con fecha y hora...)(debemos comprobar si cave...)
