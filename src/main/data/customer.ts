import { BalanceScore } from './object-value/balance-score'
import { Identifier } from './object-value/identifier'

export type Customer = {
  id: Identifier
  score: BalanceScore
}
