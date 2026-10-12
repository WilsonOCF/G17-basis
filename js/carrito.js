// Actividad I1 diapos clase 08
import {IGV, ENVIO_GRATIS_DESDE, sumar} from "./tienda.js";
// Actividad I1 diapos clase 08
import { costoDeEnvio } from "./envio.js";
export const CLAVE_CARRITO = "techcart_carrito";

// Actividad D2 diapos clase 09
export const agregarAlCarrito = (carrito, producto) => {
    const yaEsta = carrito.find((item) => item.id === producto.id);
    if (yaEsta) {
        return carrito.map((item) => item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item);
    }
    return [...carrito, {...producto, cantidad: 1}];
};
// Actividad D2 diapos clase 09
export const quitarDelCarrito = (carrito, id) => carrito.filter((producto) => producto.id !== id);

export const resumenCarrito = (carrito) => {
    // Actividad D2 diapos clase 09
    const unidades = sumar(...carrito.map(({cantidad}) => cantidad));
    // Actividad D2 diapos clase 09
    const subTotal = sumar(...carrito.map(({precio, cantidad}) => precio * cantidad)); // 100
    const igv = subTotal * IGV; // 100 * 0.18 = 18 soles
    const envio = unidades === 0 ? 0 : costoDeEnvio(subTotal); // 9.90
    return {unidades, subTotal, igv, envio,  total : subTotal + igv + envio}; // 127.90
};

export const faltaParaEnvioGratis = (subTotal) => Math.max(ENVIO_GRATIS_DESDE - subTotal,0);

export const guardarCarrito = (carrito) => {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch(error) {
        console.warn("No se pudo guardar el carrito:", error.message);
    }
}
export const leerCarrito = () => {
    try {
        const crudo = localStorage.getItem(CLAVE_CARRITO);
        return crudo ? JSON.parse(crudo) : [];
    } catch (error) {
        console.warn("El carrito guardado no se pudo leer, empiece desde uno vacio", error.message);
        return [];
    }
}

export const olvidarCarrito = () => {
    try {
        localStorage.removeItem(CLAVE_CARRITO);
    } catch (error) {
        console.warn("No se pudo borrar el carrito guardado:", error.message);
    }
}