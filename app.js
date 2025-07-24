//fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`))
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`
    );

    console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

            document.getElementById('contenedor').innerHTML = peliculas
            console.log(datos.results);

        }else if(respuesta.statur === 401){
            console.log('has escrito')
        } else if(respuesta.status === 404){
            console.log('La peli no existe')
        } else {
            console.log('error desconocido')
        }

  } catch (error) {
    console.log(error);
  }
};
cargarPeliculas();



/***
 * 
 * let pagina = 1;
const MAX_PAGINA = 1000;
const API_KEY = '192e0b9821564f26f52949758ea3c473';
const BASE_URL = 'https://api.themoviedb.org/3';
const contenedor = document.getElementById('contenedor');
const buscarInput = document.getElementById('buscar');
const generosSelect = document.getElementById('generos');
const loader = document.getElementById('loader');
let cargando = false;
let generos = [];

const mostrarLoader = () => loader.classList.remove('oculto');
const ocultarLoader = () => loader.classList.add('oculto');

const obtenerGeneros = async () => {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-MX`);
    const data = await res.json();
    generos = data.genres;
    generosSelect.innerHTML = '<option value="">Todos los géneros</option>' +
      generos.map(g => `<option value="${g.id}">${g.name}</option>`).join('');
  } catch (err) {
    console.warn('No se pudo cargar géneros:', err);
  }
};

const cargarPeliculas = async () => {
  if (cargando || pagina > MAX_PAGINA) return;
  cargando = true;
  mostrarLoader();

  const query = buscarInput.value.trim();
  const generoSeleccionado = generosSelect.value;

  let endpoint = '';
  if (query) {
    endpoint = `/search/movie?query=${encodeURIComponent(query)}`;
  } else {
    endpoint = '/movie/popular';
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=es-MX&page=${pagina}`);
    if (response.status === 200) {
      const datos = await response.json();
      let resultados = datos.results;

      if (generoSeleccionado) {
        resultados = resultados.filter(p => p.genre_ids.includes(parseInt(generoSeleccionado)));
      }

      renderizarPeliculas(resultados);
      pagina++;
    } else {
      manejarErrores(response.status);
    }
  } catch (error) {
    console.error('Error al cargar películas:', error);
  } finally {
    ocultarLoader();
    cargando = false;
  }
};

const renderizarPeliculas = (peliculas) => {
  peliculas.forEach(pelicula => {
    const div = document.createElement('div');
    div.classList.add('pelicula');
    div.innerHTML = `
      <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
      <h3 class="titulo">${pelicula.title}</h3>
    `;
    contenedor.appendChild(div);
  });
};

const manejarErrores = (status) => {
  switch (status) {
    case 401: console.warn('API Key inválida'); break;
    case 404: console.warn('Película no encontrada'); break;
    default: console.warn('Error desconocido'); break;
  }
};

// Scroll infinito
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
    cargarPeliculas();
  }
});

// Reiniciar resultados al cambiar búsqueda o género
buscarInput.addEventListener('input', () => {
  pagina = 1;
  contenedor.innerHTML = '';
  cargarPeliculas();
});

generosSelect.addEventListener('change', () => {
  pagina = 1;
  contenedor.innerHTML = '';
  cargarPeliculas();
});

// Inicializar
obtenerGeneros();
cargarPeliculas();

 */
