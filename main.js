// ── 1. DATOS ─────────────────────────────────────────────────

// Array con los nombres internos de las 4 secciones
const secciones = ['cartelera', 'estrenos', 'horarios', 'reserva'];

// Map: nombre interno -> etiqueta visible en el nav
const titulosNav = new Map([
    ['cartelera', 'Cartelera'],
    ['estrenos',  'Proximos Estrenos'],
    ['horarios',  'Horarios'],
    ['reserva',   'Reservar Entradas'],
]);

// Set de generos disponibles (no admite duplicados)
const generosDisponibles = new Set([
    'Accion', 'Drama', 'Comedia', 'Terror', 'Ciencia Ficcion', 'Animacion'
]);

// Array de objetos con los datos de cada pelicula en cartelera
const datosPeliculas = [
    {
        titulo: 'Never Gonna Give You Up',
        genero: 'Comedia',
        duracion: 120,
        clasificacion: 'PG',
        imagen: 'https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg',
        descripcion: 'La historia epica de un hombre que nunca te va a decepcionar.',
    },
    {
        titulo: 'Pago Ella',
        genero: 'Drama',
        duracion: 105,
        clasificacion: 'PG-13',
        imagen: 'https://pbs.twimg.com/media/GFvh0DbW8AAZh2H.jpg',
        descripcion: 'Un relato emotivo sobre una experiencia que probablemente no paso.',
    },
    {
        titulo: 'Spider-Man: Brand New Day',
        genero: 'Ciencia Ficcion',
        duracion: 135,
        clasificacion: 'PG-13',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTon8XExGUwL6t0RFJNgU1di9F7nx8gauGsbg&s',
        descripcion: 'Tras el Dia del Juicio Final, Peter Parker intenta centrarse en la universidad y abandonar a Spider-Man. Cuando una nueva amenaza pone en peligro a sus amigos, debe romper su promesa y volver al traje.',
    },
];

// Array de proximos estrenos
const proximosEstrenos = [
    { titulo: 'El Ultimo Horizonte',   fecha: '2026-04-10', genero: 'Accion' },
    { titulo: 'Pequeños Gigantes',     fecha: '2026-04-18', genero: 'Animacion' },
    { titulo: 'Miedo en la Oscuridad', fecha: '2026-05-02', genero: 'Terror' },
    { titulo: 'Codigo Rojo',           fecha: '2026-05-15', genero: 'Accion' },
];

// Array de horarios de hoy por sala
const horarios = [
    { sala: 'Sala 1 (2D)',   idioma: 'Subtitulada', hora: '15:00', fin: '17:00' },
    { sala: 'Sala 2 (3D)',   idioma: 'Doblada',     hora: '17:30', fin: '19:30' },
    { sala: 'Sala 3 (4DX)',  idioma: 'Subtitulada', hora: '19:00', fin: '21:15' },
    { sala: 'Sala 4 (IMAX)', idioma: 'Doblada',     hora: '20:00', fin: '22:30' },
];

// Map de precios por tipo de entrada (en pesos colombianos)
const precios = new Map([
    ['adulto',   12000],
    ['menor',     8000],
    ['jubilado',  7000],
]);


// ── 2. CLASE Pelicula ─────────────────────────────────────────

class Pelicula {
    constructor(titulo, genero, duracion, clasificacion, imagen, descripcion) {
        this.titulo        = titulo;
        this.genero        = genero;
        this.duracion      = duracion;       // en minutos
        this.clasificacion = clasificacion;
        this.imagen        = imagen;
        this.descripcion   = descripcion;
    }

    // Convierte los minutos en formato legible "Xh Ymin"
    getDuracionFormateada() {
        const horas   = Math.floor(this.duracion / 60);
        const minutos = this.duracion % 60;
        if (horas === 0) {
            return minutos + ' min';
        } else {
            return horas + 'h ' + minutos + 'min';
        }
    }

    // Devuelve un color segun la clasificacion usando switch
    getColorClasificacion() {
        switch (this.clasificacion) {
            case 'G':     return 'green';
            case 'PG':    return 'steelblue';
            case 'PG-13': return 'darkorange';
            case 'R':     return 'crimson';
            default:      return 'gray';
        }
    }
}


// ── 3. INSTANCIAR PELICULAS con bucle for ─────────────────────

const listaPeliculas = [];

for (let i = 0; i < datosPeliculas.length; i++) {
    const d = datosPeliculas[i];
    listaPeliculas.push(
        new Pelicula(d.titulo, d.genero, d.duracion, d.clasificacion, d.imagen, d.descripcion)
    );
}


// ── 4. FUNCIONES DE RENDERIZADO ───────────────────────────────

// Funcion flecha: genera el HTML de una tarjeta de pelicula
const crearTarjetaPelicula = (pelicula) => {
    const color = pelicula.getColorClasificacion();
    return (
        '<div class="card-pelicula">' +
        '<img src="' + pelicula.imagen + '" alt="' + pelicula.titulo + '">' +
        '<div class="card-info">' +
        '<span style="background:' + color + '; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem;">' + pelicula.clasificacion + '</span>' +
        '<h3>' + pelicula.titulo + '</h3>' +
        '<p>' + pelicula.genero + '</p>' +
        '<p>' + pelicula.getDuracionFormateada() + '</p>' +
        '<p>' + pelicula.descripcion + '</p>' +
        '<button onclick="mostrarSeccion(\'reserva\')">Reservar</button>' +
        '</div>' +
        '</div>'
    );
};

// Seccion CARTELERA
function renderCartelera() {
    let html = '<h2>Cartelera</h2><div class="grid-peliculas">';

    // forEach sobre el array de instancias de Pelicula
    listaPeliculas.forEach(function(pelicula) {
        html += crearTarjetaPelicula(pelicula);
    });

    html += '</div>';
    return html;
}

// Seccion PROXIMOS ESTRENOS
function renderEstrenos() {
    let html = '<h2>Proximos Estrenos</h2>';

    // Bucle while para recorrer el array de estrenos
    let i = 0;
    while (i < proximosEstrenos.length) {
        const e        = proximosEstrenos[i];
        const fecha    = new Date(e.fecha + 'T00:00:00');
        const fechaStr = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

        html += (
            '<div class="card-estreno">' +
            '<strong>' + fechaStr + '</strong> — ' + e.titulo +
            ' <em>(' + e.genero + ')</em>' +
            '</div>'
        );
        i++;
    }

    // Mostrar generos disponibles usando el Set
    html += '<h3 style="margin-top:24px;">Generos disponibles:</h3><p>';
    generosDisponibles.forEach(function(genero) {
        html += '<span class="genero-chip">' + genero + '</span>';
    });
    html += '</p>';

    return html;
}

// Seccion HORARIOS
function renderHorarios() {
    let html = '<h2>Horarios de Hoy</h2>';
    html += '<table><thead><tr><th>Sala</th><th>Idioma</th><th>Entrada</th><th>Salida</th><th>Estado</th></tr></thead><tbody>';

    // for..of para recorrer el array de horarios
    for (const h of horarios) {
        const ahora     = new Date();
        const minActual = ahora.getHours() * 60 + ahora.getMinutes();
        const partes    = h.hora.split(':');
        const minInicio = parseInt(partes[0], 10) * 60 + parseInt(partes[1], 10);

        // if-else para determinar el estado de cada sala
        let estado;
        if (minActual < minInicio - 30) {
            estado = 'Proximamente';
        } else if (minActual < minInicio) {
            estado = 'Abriendo pronto';
        } else {
            estado = 'En curso';
        }

        html += '<tr><td>' + h.sala + '</td><td>' + h.idioma + '</td><td>' + h.hora + '</td><td>' + h.fin + '</td><td>' + estado + '</td></tr>';
    }

    html += '</tbody></table>';
    return html;
}

// Seccion RESERVAR ENTRADAS
function renderReserva() {
    let html = '<h2>Reservar Entradas</h2><div class="form-reserva">';

    // Opciones de pelicula con bucle for
    let optPeliculas = '';
    for (let i = 0; i < listaPeliculas.length; i++) {
        optPeliculas += '<option value="' + i + '">' + listaPeliculas[i].titulo + '</option>';
    }

    // Opciones de tipo de entrada recorriendo el Map de precios
    let optTipos = '';
    precios.forEach(function(precio, tipo) {
        const label = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        optTipos += '<option value="' + tipo + '">' + label + ' — $' + precio.toLocaleString('es-CO') + '</option>';
    });

    html += (
        '<p><label>Nombre completo:<br>' +
        '<input type="text" id="cliente" placeholder="Tu nombre">' +
        '</label></p>' +
        '<p><label>Pelicula:<br>' +
        '<select id="pelicula-sel">' + optPeliculas + '</select>' +
        '</label></p>' +
        '<p><label>Tipo de entrada:<br>' +
        '<select id="tipo-entrada" onchange="actualizarTotal()">' + optTipos + '</select>' +
        '</label></p>' +
        '<p><label>Cantidad de boletos:<br>' +
        '<input type="number" id="cantidad" min="1" max="10" value="1" oninput="actualizarTotal()">' +
        '</label></p>' +
        '<p>Total estimado: <strong id="total-precio">$12.000</strong></p>' +
        '<button onclick="confirmarReserva()">Confirmar Reserva</button>' +
        '</div>'
    );

    return html;
}


// ── 5. MOSTRAR SECCION (cambia el contenido sin recargar) ─────

function mostrarSeccion(nombreSeccion) {
    const app = document.getElementById('app');

    // switch para decidir que seccion renderizar
    let contenido = '';
    switch (nombreSeccion) {
        case 'cartelera':
            contenido = renderCartelera();
            break;
        case 'estrenos':
            contenido = renderEstrenos();
            break;
        case 'horarios':
            contenido = renderHorarios();
            break;
        case 'reserva':
            contenido = renderReserva();
            break;
        default:
            contenido = '<p>Seccion no encontrada.</p>';
    }

    // Inyectar el contenido generado en el DOM
    app.innerHTML = contenido;

    // Marcar el enlace activo en el nav
    document.querySelectorAll('.nav-link').forEach(function(link) {
        if (link.dataset.seccion === nombreSeccion) {
            link.style.fontWeight = 'bold';
            link.style.color = '#fff';
        } else {
            link.style.fontWeight = 'normal';
            link.style.color = '#ccc';
        }
    });

    // Si es la seccion reserva, inicializar el total
    if (nombreSeccion === 'reserva') {
        actualizarTotal();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ── 6. CALCULAR TOTAL EN TIEMPO REAL ─────────────────────────

function actualizarTotal() {
    // try..catch por si los elementos aun no existen en el DOM
    try {
        const tipo     = document.getElementById('tipo-entrada').value;
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);
        const precio   = precios.get(tipo) || 0;
        const total    = precio * cantidad;
        document.getElementById('total-precio').textContent = '$' + total.toLocaleString('es-CO');
    } catch (error) {
        console.error('Error al calcular el total:', error);
    }
}


// ── 7. CONFIRMAR RESERVA ──────────────────────────────────────

function confirmarReserva() {
    const clienteEl = document.getElementById('cliente');
    const pelEl     = document.getElementById('pelicula-sel');
    const tipoEl    = document.getElementById('tipo-entrada');
    const cantEl    = document.getElementById('cantidad');

    // Validacion con if-else
    if (!clienteEl || clienteEl.value.trim() === '') {
        window.alert('Por favor ingresa tu nombre completo.');
        return;
    }

    const nombre   = clienteEl.value.trim();
    const pelicula = listaPeliculas[parseInt(pelEl.value, 10)];
    const tipo     = tipoEl.value;
    const cantidad = parseInt(cantEl.value, 10);
    const total    = (precios.get(tipo) || 0) * cantidad;

    window.alert(
        'Reserva confirmada!\n\n' +
        'Cliente: ' + nombre + '\n' +
        'Pelicula: ' + pelicula.titulo + '\n' +
        'Entradas: ' + cantidad + ' x ' + tipo + '\n' +
        'Total: $' + total.toLocaleString('es-CO') + '\n\n' +
        'Disfruta tu pelicula en Cine Digital!'
    );
}


// ── 8. CONSTRUIR HEADER Y FOOTER ──────────────────────────────

function construirHeader() {
    const header = document.getElementById('header');

    // Construir enlaces del nav recorriendo el Map con for..of
    let linksHtml = '';
    for (const [seccion, titulo] of titulosNav) {
        linksHtml += (
            '<li>' +
            '<a href="#" class="nav-link" data-seccion="' + seccion + '" ' +
            'onclick="mostrarSeccion(\'' + seccion + '\'); return false;">' +
            titulo +
            '</a>' +
            '</li>'
        );
    }

    header.innerHTML = (
        '<h1>Cine Digital</h1>' +
        '<nav><ul>' + linksHtml + '</ul></nav>'
    );
}

function construirFooter() {
    const footer = document.getElementById('footer');
    const anio   = new Date().getFullYear();
    footer.innerHTML = '<p>&copy; ' + anio + ' Cine Digital S.A. — Todos los derechos reservados.</p>';
}


// ── 9. INICIALIZACION ─────────────────────────────────────────

construirHeader();
construirFooter();
mostrarSeccion('cartelera');   // Seccion por defecto al cargar