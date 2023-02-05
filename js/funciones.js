/* CONSTANTES PARA LA NAVEGADOR DE LAS PÁGINAS INTERNAS*/
const navegadorInterna = document.querySelector(".interna nav"); // TOMAMOS EL NAV DEL DOM
const botonesInterna = document.querySelectorAll(".abrir-menu,.cerrar-menu"); // TOMAMOS LOS BOTONES PARA ABRIR Y CERRAR EL MENÚ DESPLEGABLE DEL DOM

/* CONSTANTES PARA LA GALERIA*/
const cuadritos = document.querySelectorAll(".galeria a"); // TOMAMOS LAS IMAGENES MINIATURAS DE LA GALERÍA DEL DOM
const fullScreen = document.querySelector(".modal"); // TOMAMOS EL MODAL DEL DOM
const imgFullScreen = document.querySelector(".modal img"); // TOMAMOS LA IMAGEN GRANDE DENTRO DEL MODAL DEL DOM
const flechas = document.querySelectorAll(".modal button"); // TOMAMOS LAS FLECHAS DEL MODAL DEL DOM
let numImgActual = 0; // CONTADOR PARA SABER EN QUE IMAGEN ESTAMOS ACTUALMENTE
let rutasImg = []; // ARRAY PARA LLENAR CON EL ATRIBUTO HREF DE CADA IMAGEN MINIATURA


/* CONSTANTES PARA LA DISCOGRAFIA */ 
const botonRandom = document.querySelectorAll(".discos button"); // TOMAMOS TODOS EL BOTON RANDOM DE CADA DISCO DEL DOM
const album = document.querySelectorAll(".discos"); // TOMAMOS TODOS LOS CONTENEDORES DEL DISCO INDIVIDUAL

/* FUNCION PARA MENU DESPLEGABLE EN PAGINAS INTERNAS*/
if(navegadorInterna){
	botonesInterna.forEach(boton => boton.addEventListener("click", () => navegadorInterna.classList.toggle("desplegado"))); // ESCONDE Y MUESTRA EL MENU DE LAS INTERNAS
}

/* FUNCION PARA DISCOS ALEATORIOS*/
if(album.length > 0){ //si hay discos
	album[(Math.floor(Math.random() * album.length))].classList.add("verdisco"); // inicia la pagina de discografia con un disco aleatorio.

	botonRandom.forEach(boton => { // boton con funcion para quitar el disco actual y reemplazarlo con un disco aleatorio.
		boton.addEventListener("click", () =>{
			document.querySelector(".verdisco").classList.remove("verdisco"); // Remueve la clase verdisco para que se borre el DISCO anterior.
			album[(Math.floor(Math.random() * album.length))].classList.add("verdisco"); // Elige un DISCO aleatorio y le agrega la clase verdisco para que se muestre.
		});
	});
}


/* FUNCIONES PARA LA GALERIA*/
//ABRIR

const navegacionImagenes = direccion => {
	if(direccion == 0){
		numImgActual = numImgActual > 0 ? numImgActual - 1 : cuadritos.length-1; // Utiliza la variable para saber si se puede navegar hacía atras o volver al final.
	}else{
		numImgActual = numImgActual < cuadritos.length - 1 ? numImgActual + 1 : 0; // Utiliza la variable para saber si se puede navegar hacía adelante o volver al inicio.
	}
	imgFullScreen.setAttribute("src",rutasImg[numImgActual]); // Mostrará la imagen según índice.
}


cuadritos.forEach((fotito,indice) =>{ // Cada miniatura mostrará la propia imagen en FullScreen dentro del MODAL
	rutasImg.push(fotito.getAttribute("href")); // Se le agrega el atributo HREF de cada miniatura al ARRAY
	fotito.addEventListener("click",evento =>{ // Funciona con el click a cada miniatura
		evento.preventDefault();
		numImgActual = indice; // Se asigna el indice de la imagen actual.
		imgFullScreen.setAttribute("src",rutasImg[numImgActual]); // se utiliza el array 
		fullScreen.classList.add("visible"); // Se muestra en el MODAL.
	});
});

//CERRAR
if(fullScreen){ //si existe fullScreen
    fullScreen.addEventListener("click",() => fullScreen.classList.remove("visible")); // Se cierra el MODAL cuando se le hace click en cualquier parte de la pantalla.
}

//NAVEGAR
flechas.forEach((flecha,indice) =>{ // Flechas botón para navegar por el MODAL
	flecha.addEventListener("click",evento =>{
		evento.stopPropagation(); // Previene la función de salir del MODAL
		navegacionImagenes(indice); // Muestra la imagen según índice.
	});
});

window.addEventListener("keyup", evento =>{
	switch(evento.keyCode){
	case 27:
		fullScreen.classList.remove("visible") // Salir del MODAL con la tecla ESC.
	break;
	case 37:
		navegacionImagenes(0); // Navega en el MODAL con la tecla izquierda
	break;
	case 39:
		navegacionImagenes(1); // Navega en el MODAL con la tecla derecha
	break;
	}
});

	