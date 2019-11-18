export interface User {
    id: number,
    email: string,
    nombre: string,
    apPat: string,
    apMat?: string,

    // Employee properties
    rol?: string,

    // Client properties
    calle?: string,
    colonia?: string,
    ciudad?: string,
    cp?: number
    activo?: number,

    // User flag (0 = employee, 1 = client)
    type: number
}