export interface Hoja {
    idhojaRecepcion: number,
    observaciones: JSON,
    citas_idcitas: number,
    states_idstates: number,
    usuario: {
        idusuario: number,
        nombre: string,
        apPat: string,
        apMat: string
    },
    cita: {
        idcitas: number,
        confirmacion: string,
        fecha: string
    },
    automovil: {
        idautomovil: number,
        nombre: string,
        modelo: string,
        version: string,
        numserie: string
    }
}