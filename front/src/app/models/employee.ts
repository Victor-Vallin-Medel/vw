export interface Employee {
    ref: string,
    email: string,
    name: string,
    apPat: string,
    apMat?: string,
    domicile: string,
    phone: number,
    dateUp: Date,
    dateDown?: Date,
    role: string
}
