import { BalanceScore } from './object-value/balance-score'
import { Identifier } from './object-value/identifier'

export type CustomerSuccess = {
  id: Identifier
  score: BalanceScore
}
