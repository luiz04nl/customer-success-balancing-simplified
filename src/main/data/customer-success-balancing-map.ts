import { Customer } from './customer'
import { Identifier } from './object-value/identifier'

export type CustomerSuccessBalancingMap = {
  id: Identifier
  customers: Customer[]
}
