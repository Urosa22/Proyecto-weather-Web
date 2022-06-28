"use strict";
//Seleccionamos aquello que necesitamos para interactuar a traves del DOM
const button = document.querySelector("button");

//Creamos una funcion de click para detectar la localización actual.
const solicitarUbicacion = () => {
  try {
    if (!"geolocation" in navigator) {
      throw new Error("Geolocalización no está disponible en este navegador");
    }
    //creamos constante de ubicacion concedida para obterner las coordenadas
    const ubicacionConcedida = (ubicacion) => {
      const coordenadas = ubicacion.coords;
      const latitud = coordenadas.latitude;
      const longitud = coordenadas.longitude;

      //Realizamos una solicitud de conexion a la API meteorologica
      const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=5ffdd94b246c5f9b6793fdd573a8563e`;
      async function getData(url) {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        return data;
      }
      //Tras la respuesta, recogemos un array en una constante para luego sacar los datos que necesitamos en mas constantes.
      //Realizamos una funcion async para poder procesar los dartos de la función getData.
      async function printData(url) {
        const elTiempoData = await getData(url);
        // extraemos city para poder obtener luego el pais y la ciudad
        const { city } = elTiempoData;
        const { country, name } = city;
        const ciudad = document.querySelector(".ciudad");
        const pais = document.querySelector(".pais");
        ciudad.textContent = name;
        pais.textContent = country;

        // Extraemos list que es donde viene el tiempo, la hora que necesitamos para ver si llueve
        const { list } = elTiempoData;

        //Uso el metodo Slice para quedarme con la parte del array que me interesa
        const trozoList = list.slice(0, 1);
        const trozoList1 = list.slice(1, 2);
        const trozoList2 = list.slice(2, 3);
        const trozoList3 = list.slice(3, 4);
        const trozoList4 = list.slice(4, 5);
        const trozoList5 = list.slice(5, 6);
        const trozoList6 = list.slice(6, 7);
        const trozoList7 = list.slice(7, 8);
        const trozoList8 = list.slice(8, 9);
        //utilizamos for of para recorrer el array y asi poder extraer los datos necesarios
        /* console.log(typeof trozoList); */
        for (const horarios of trozoList) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const Hora = document.querySelector(".Hora").textContent = hora;
          //En esta parte lo que quiero es agregarle una imagen según el tiempo que haga
          for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo").textContent = elTiempo1;
            }
          }
        // Realizamos lo mismo que arriba para que cada li
        // nos muestre las predicciones de las siguientes horas
        for (const horarios of trozoList1) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora1").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo1").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList2) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora2").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo2").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList3) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora3").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo3").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList4) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora4").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo4").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList5) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora5").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo5").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList6) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora6").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo6").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList7) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora7").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo7").textContent = elTiempo1;
          }
        }
        for (const horarios of trozoList8) {
          const weather = horarios.weather;
          const hora = horarios.dt_txt;
          const hora1 = document.querySelector(".hora8").textContent = hora;
        for (const elTiempo of weather) {
            const elTiempo1 = elTiempo.main;
            document.querySelector(".tiempo8").textContent = elTiempo1;
          }
        }
      }
      printData(apiURL);
    };
    //creamos const con error ya que getcurrentPosition
    // nos pide 3 parametros y uno de ellos es de eror.
    const errorDeUbicacion = (error) => {
      switch (error.code) {
        case error.TIMEOUT:
          throw new Error("Excedido tiempo de espera para obtener ubicación");
        case error.PERMISSION_DENIED:
          throw new Error(
            "El usuario ha denegado el permiso para la geolocalización"
          );
        case error.POSITION_UNAVAILABLE:
          throw new Error("Ubicación no disponible");
      }
    };
    const opcionesDeSolicitud = {
      enableHighAccuracy: true, // Alta precisión. Busca con la mayor precision posible
      maximumAge: 0, // No queremos caché. Busca valores antiguos positivos para valerse de ellos y dar respuesta a la busqueda
      timeout: 5000, // Esperar solo 5 segundos
    };
    // Solicitar Ubicación
    navigator.geolocation.getCurrentPosition(
      ubicacionConcedida,
      errorDeUbicacion,
      opcionesDeSolicitud
    );
  } catch (error) {
    alert(error.message);
  }
};
//Creamos una funcion para añadir imagen según el tiempo que haga
function ponerImagen() {
  setTimeout(() => {
    // Para tiempo
    if(document.querySelector(".tiempo").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".primera").append(img);
    }
    if(document.querySelector(".tiempo").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".primera").append(img);
    }if(document.querySelector(".tiempo").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".primera").append(img);
    }
    // Para tiempo1
    if(document.querySelector(".tiempo1").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container1").append(img);
    }
    if(document.querySelector(".tiempo1").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container1").append(img);
    }if(document.querySelector(".tiempo1").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container1").append(img);
    }
     // Para tiempo2
     if(document.querySelector(".tiempo2").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container2").append(img);
    }
    if(document.querySelector(".tiempo2").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container2").append(img);
    }if(document.querySelector(".tiempo2").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container2").append(img);
    }
     // Para tiempo3
     if(document.querySelector(".tiempo3").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container3").append(img);
    }
    if(document.querySelector(".tiempo3").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container3").append(img);
    }if(document.querySelector(".tiempo3").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container3").append(img);
    }
     // Para tiempo4
     if(document.querySelector(".tiempo4").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container4").append(img);
    }
    if(document.querySelector(".tiempo4").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container4").append(img);
    }if(document.querySelector(".tiempo4").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container4").append(img);
    }
     // Para tiempo5
     if(document.querySelector(".tiempo5").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container5").append(img);
    }
    if(document.querySelector(".tiempo5").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container5").append(img);
    }if(document.querySelector(".tiempo5").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container5").append(img);
    }
     // Para tiempo6
     if(document.querySelector(".tiempo6").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container6").append(img);
    }
    if(document.querySelector(".tiempo6").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container6").append(img);
    }if(document.querySelector(".tiempo6").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container6").append(img);
    }
     // Para tiempo7
     if(document.querySelector(".tiempo7").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container7").append(img);
    }
    if(document.querySelector(".tiempo7").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container7").append(img);
    }if(document.querySelector(".tiempo7").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container7").append(img);
    }
     // Para tiempo8
     if(document.querySelector(".tiempo8").textContent === "Clouds"){
      const img = document.createElement("img")
      img.src = "/weather-image/nublado.png"
      img.alt = "Cloud"
      document.querySelector(".container8").append(img);
    }
    if(document.querySelector(".tiempo8").textContent === "Clear"){
      const img = document.createElement("img")
      img.src = "/weather-image/sol.png"
      img.alt = "Cloud"
      document.querySelector(".container8").append(img);
    }if(document.querySelector(".tiempo8").textContent === "Rain"){
      const img = document.createElement("img")
      img.src = "/weather-image/lluvia.png"
      img.alt = "Cloud"
      document.querySelector(".container8").append(img);
    }
    //Seleccionamos el botón y lo hacemos desaparecer
    document.querySelector("button").remove() 
  }, 1000); 
}
//Tengo que ver porque no me está ejecutando esta función
function llovera() {
  setTimeout(() => {
    if (document.querySelector(".tiempo").textContent === "Rain" || document.querySelector(".tiempo1").textContent === "Rain"
    || document.querySelector(".tiempo2").textContent === "Rain" || document.querySelector(".tiempo3").textContent === "Rain"
     || document.querySelector(".tiempo4").textContent === "Rain" || document.querySelector(".tiempo5").textContent === "Rain" 
     || document.querySelector(".tiempo6").textContent === "Rain" || document.querySelector(".tiempo7").textContent === "Rain"
     || document.querySelector(".tiempo8").textContent === "Rain"){
      document.querySelector(".prevision").textContent = "Se preveen lluvias en los próximos dias"
      document.querySelector("body").classList.add("activarLluvia");
    }else	{
      document.querySelector(".prevision").textContent = "No hay previsión de lluvias. Disfrute del buen tiempo."
    }
  }, 2000);
}
button.addEventListener("click", solicitarUbicacion);
button.addEventListener("click", ponerImagen);
button.addEventListener("click", llovera);
