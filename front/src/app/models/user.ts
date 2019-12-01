export interface User {
    idusuario?: number,
    email: string,
    nombre: string,
    apPat: string,
    apMat?: string,

    roles_idroles: number,

    direcciones_iddirecciones: number
    calle?: string,
    colonia?: string,
    cp?: number

    ciudades_idciudades: number,
    ciudad?: string,
}