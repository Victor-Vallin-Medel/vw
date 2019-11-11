export interface Order {
  dateReception: Date,
  dateDelivery?: Date,
  time: number,
  observations: string,
  fk_client: string,
  fk_plates_car: string,
  status: number,
  ref?: string
}
