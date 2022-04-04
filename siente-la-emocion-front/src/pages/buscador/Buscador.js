import { Link, useSearchParams } from 'react-router-dom';
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import CircleHomePage from '../../components/CircleHomePage/CircleHomePage';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';
import useFilterActivities from '../../hooks/useFilterActivities';

function Buscador() {
  const [params] = useSearchParams();

  const term = params.get('search');

  const { activities, error } = useFilterActivities(term);

  if (error) return <p>hubo un error</p>;

  console.log(activities);
  //return <div>resultados busqueda para {params.get('search')}</div>;
  return (
    <>
      <Header
        to={`/experiences/:idExperience`}
        button={'Atrevete'}
        body={<BodyExperiencesList />}
      />
      <ActividadLista activities={activities} error={error} />
    </>
  );
}

export default Buscador;
