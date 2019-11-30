export interface User {
    idusuario?: number,
    email: string,
    nombre: string,
    apPat: string,
    apMat?: string,

    roles_idroles: number,

    calle?: string,
    colonia?: string,
    ciudad?: string,
    cp?: number
}