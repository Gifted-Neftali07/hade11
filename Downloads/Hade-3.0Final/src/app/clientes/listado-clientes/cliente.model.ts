export interface Cliente{
    fechaCompra: string;
    horaCompra: string,
    fechaDevolucion: string,
    horaDevolucion:string,
    nombre: string,
    correo: string,
    precio: number,
    tipoVehiculo: string,
    anio: number,
    marca: string,
    id?: string,
}