import ActividadLista from "../../components/ActividadLista/ActividadLista"


import Header from "../../components/Header/Header"

const ListaActividades = () => {
    return(
        <>
            <Header to={'/listaActividades/senderismo/3'} button={'Atrevete'}/>
            <span>Filtrar por ↧</span>
            <ActividadLista 
                nombreEmpresa={'Montañas Felices'} 
                descripcionGeneral={'Lorem impoijsdhfdfsdbchsgdcvbdschjgasdchasdgcvhjdsavcgdsgvjhasgjcsagcjsacgsdgvhbscvhgsdvchsdg'} 
                fecha={'12/06/2023'} 
                plazas={'7/12'}
            />
            <ActividadLista 
                nombreEmpresa={'Montañas Felices'} 
                descripcionGeneral={'Lorem impoijsdhfdfsdbchsgdcvbdschjgasdchasdgcvhjdsavcgdsgvjhasgjcsagcjsacgsdgvhbscvhgsdvchsdg'} 
                fecha={'12/06/2023'} 
                plazas={'7/12'}
            />
            <ActividadLista 
                nombreEmpresa={'Montañas Felices'} 
                descripcionGeneral={'Lorem impoijsdhfdfsdbchsgdcvbdschjgasdchasdgcvhjdsavcgdsgvjhasgjcsagcjsacgsdgvhbscvhgsdvchsdg'} 
                fecha={'12/06/2023'} 
                plazas={'7/12'}
            />
            <ActividadLista 
                nombreEmpresa={'Montañas Felices'} 
                descripcionGeneral={'Lorem impoijsdhfdfsdbchsgdcvbdschjgasdchasdgcvhjdsavcgdsgvjhasgjcsagcjsacgsdgvhbscvhgsdvchsdg'} 
                fecha={'12/06/2023'} 
                plazas={'7/12'}
            />
            <ActividadLista 
                nombreEmpresa={'Montañas Felices'} 
                descripcionGeneral={'Lorem impoijsdhfdfsdbchsgdcvbdschjgasdchasdgcvhjdsavcgdsgvjhasgjcsagcjsacgsdgvhbscvhgsdvchsdg'} 
                fecha={'12/06/2023'} 
                plazas={'7/12'}
            />
        </>
        
    )
}
export default ListaActividades