export interface User {
    id: number,
    email: string,
    nombre: string,
    apPat: string,
    apMat?: string,

    // Employee properties
    rol: string,

    // Client properties
    calle?: string,
    colonia?: string,
    ciudad?: string,
    cp?: number
    activo?: number,
}