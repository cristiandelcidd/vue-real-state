import type { PointTuple } from 'leaflet'

export interface PropertyFormValues {
  description: string
  image: File[] | string
  parkingLot: number
  pool: boolean
  price: string
  location: PointTuple
  rooms: number
  title: string
  wc: number
}

export interface LoginFormValues {
  email: string
  password: string
}
