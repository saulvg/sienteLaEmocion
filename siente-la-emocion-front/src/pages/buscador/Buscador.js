import { useSearchParams } from 'react-router-dom';
import useFilterActivities from '../../hooks/useFilterActivities';

function Buscador() {
  const [params] = useSearchParams();

  const term = params.get('search');

  const { activities, error } = useFilterActivities(term);

  if (error) return <p>hubo un error</p>;

  console.log(activities);
  return <div>resultados busqueda para {params.get('search')}</div>;
}

export default Buscador;
