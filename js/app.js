
//variables
const listaCursos = document.getElementById('lista-cursos');
const carrito = document.getElementById('carrito');
const cursos = document.querySelector('#lista-carrito tbody');
const limpiarCarrito = document.getElementById('vaciar-carrito');
//listeners
addEventListeners()

function addEventListeners (){
    //se activa al agregar al carrito "agregar carrito"
    listaCursos.addEventListener('click', comprarCurso);
    //cuando se elimina un curso
    carrito.addEventListener('click', eliminarCurso);
    //cuando se vacia un carrito
    limpiarCarrito.addEventListener('click', cleanCarrito)
    //al recargar obtener la data desde el localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
    };

//functiones

function comprarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
       const curso = e.target.parentElement.parentElement;      
       leerDatosCurso(curso)
    }
};
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        presio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
};

function insertarCarrito(curso){
    //se inserta en el tableBody de lista carrito que esta vacio
    const row = document.createElement('tr');
    row.innerHTML =`
        <td> 
            <img src="${curso.imagen}" width=100 />
        </td>
        <td>${curso.titulo}<td/>
        <td>${curso.presio}<td/>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        <td/>`
    cursos.appendChild(row)
    guardarLocalStorage(curso)
}

//eliminar el curso del carrito
function eliminarCurso(e){
    e.preventDefault()   
    let curso;
    let cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    elimninarCursoLocalStorage(cursoId);
}

//eliminar cursos del carrito en el DOM
function cleanCarrito(){
    while(cursos.firstChild){
        cursos.removeChild(cursos.firstChild)
    }
    //vaciar LocalStorage
    vaciarLocalStorage()
    return false
}
//almacenar localStorage

function guardarLocalStorage(curso){
    let cursosLS;
    //toma el valor de un arreglo con datos en LS O VACIO
    cursosLS = obtenerCursosLocalStorage();
    //el curso seleccionado se agrega al arreglo
    cursosLS.push(curso)
    //almacenar en localStorage
    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}
function obtenerCursosLocalStorage(){
    let cursosLS
    if(localStorage.getItem('cursos')=== null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//imprime los cursos desde localStorage en el carrito

function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        //construir template
        const row = document.createElement('tr');
        row.innerHTML =`
        <td> 
            <img src="${curso.imagen}" width=100 />
        </td>
        <td>${curso.titulo}<td/>
        <td>${curso.presio}<td/>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        <td/>`
        cursos.appendChild(row)
    });
}

//eliminar curso por ID en localStorage
function elimninarCursoLocalStorage(curso){
    let cursosLS;
    //obtener todo el arreglo del curso
    cursosLS = obtenerCursosLocalStorage();
    //iterar comprarando el ID del curso borrado en localStorage
    cursosLS.forEach(cursoLS => {
        if(cursoLS.id=== curso){
            cursosLS.splice(index, 1);
        }
    });
    //add el arreglo actual a storage
   localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

//eliminar todos los cursos de localStorage
function vaciarLocalStorage(){
    localStorage.clear()
}