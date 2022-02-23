//pendiente de haccer bien
/* const token = false;

const MainMenu = () => {
  return (
    <nav>
      <Link to='/search'>Buscador</Link> <Link to='/contact'>Contactanos</Link>{' '}
      {token ? (
        <Link to='/perfil'>Perfil</Link>
      ) : (
        <Link to='/register-login'>Unete</Link>
      )}
    </nav>
  );
}; */

const HomePage = () => {
  return (
    <>
      <header>
        <img
          src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
          alt='logo'
          width={'80px'}
        />
        <menu>{/*   <MainMenu /> */}</menu>
        <h1>Siente la emocion</h1>
        <p>Disfruta el momento</p>
        <button>Atrevete</button>
      </header>
      <main>
        <section id='we'>
          <div id='routeDeQueVaEsto' class='route'>
            <a href='#deQueVaEsto'>De que trata esto</a>
          </div>
          <div id='routeComents' class='route'>
            <a href='#coments'>Comentarios</a>
          </div>
          <div id='routeNuestrosPrincipios' class='route'>
            <a href='#nuestrosPrincipios'>Nuestros principios</a>
          </div>
          <div id='routeQueTeEstaEsperando' class='route'>
            <a href='#queTeEstaEsperando'>Que te esta esperando</a>
          </div>
        </section>
        <section id='deQueVaEsto'>
          <div>
            <img />
            <h2>De que va esto</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </p>
          </div>
        </section>
        <section id='socialNetworks'>
          <div id='instagram' class='networks'>
            <a
              href='https://www.instagram.com/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
              instagram
            </a>
          </div>
          <div id='gmail' class='networks'>
            <a
              href='https://www.google.com/intl/es/gmail/about/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
              gmail
            </a>
          </div>
          <div id='facebook' class='networks'>
            <a
              href='https://es-es.facebook.com/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
              facebook
            </a>
          </div>
        </section>
        <section id='nuestrosPrincipios'>
          <div>
            <img />
            <h2>Nuestros principios</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </p>
          </div>
        </section>
        <section id='coments'>
          <div id='coment1' class='coments'>
            {/* <a
              href='https://www.instagram.com/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
            </a> */}
            comentario 1
          </div>
          <div id='coment2' class='coments'>
            {/* <a
              href='https://www.google.com/intl/es/gmail/about/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
            </a> */}
            comentario 2
          </div>
          <div id='coment3' class='coments'>
            {/* <a
              href='https://es-es.facebook.com/'
              target={'_blank'}
              rel='noopener noreferrer'
            >
            </a> */}
            comentario 3
          </div>
        </section>
        <section id='queTeEstaEsperando'>
          <div>
            <img />
            <h2>Que te esta esperando</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <h2>Experiencia diferente</h2>
        <section id='visitanos'>
          <h3>Visitanos</h3>
          <p>calle XXXXXX pascual manual</p>
        </section>
        <section id='llamanos'>
          <h3>Llamanos</h3>
          <p>123456789</p>
        </section>
        <section id='llamanos'>
          <h3>Cookies</h3>
          <p>
            <a href='cookies'>Enlace de cookies</a>
          </p>
        </section>
        <p>todos los derechos estan reservados a bla bla</p>
      </footer>
    </>
  );
};
export default HomePage;
