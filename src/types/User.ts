import { StoreShort } from "./Store";

export type Tariff = "free"

export type User = {
  login: string,
  password: string,
  stores: StoreShort[],
  tariff: Tariff
}
