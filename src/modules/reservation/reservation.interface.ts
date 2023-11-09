export interface Reservation {
  id?: number
  concertId: number
  quantity: number
  status: boolean
  createAt?: string
  updatedAt?: string
}
