import { Customer } from './data/customer'
import { CustomerSuccess } from './data/customer-success'
import { CustomerSuccessBalancingMap } from './data/customer-success-balancing-map'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exception } from './data/object-value/exception'
import { Identifier } from './data/object-value/identifier'

export class CustomerSuccessBalancing {
  public constructor(
    private _customerSuccessCollection: CustomerSuccess[],
    private _customers: Customer[],
    private _identifiersOfUnavailableCustomerSuccessIds: Identifier[]
  ) {}

  public execute(): Identifier {
    const availableCustomerSuccessCollection = this._customerSuccessCollection
      .filter(
        (customerSuccess) =>
          !this._identifiersOfUnavailableCustomerSuccessIds.includes(
            customerSuccess.id
          )
      )
      .sort((a, b) => (a.score > b.score ? 1 : -1))

    const availableCustomers = [...this._customers] as [Customer | null]

    const customerSuccessBalancingMaps = availableCustomerSuccessCollection.map(
      (availableCustomerSuccess) => {
        return {
          id: availableCustomerSuccess.id,
          customers: availableCustomers.filter((customer) => {
            if (customer && availableCustomerSuccess.score >= customer.score) {
              const index = availableCustomers.indexOf(customer)
              availableCustomers[index] = null
              return true
            }
            return false
          })
        } as CustomerSuccessBalancingMap
      }
    )

    try {
      const customerSuccessBalancingMapWithMoreCustomers =
        customerSuccessBalancingMaps
          .sort((a, b) => (a.customers.length < b.customers.length ? 1 : -1))
          .reduce((accumulator, currentCustomerSuccessBalancingMaps) => {
            if (
              currentCustomerSuccessBalancingMaps.id !== accumulator.id &&
              currentCustomerSuccessBalancingMaps.customers.length ===
                accumulator.customers.length
            ) {
              throw new Error('Break Even')
            }
            return accumulator
          }, customerSuccessBalancingMaps[0])

      return customerSuccessBalancingMapWithMoreCustomers.id
    } catch (error: Exception) {
      if (error.message === 'Break Even') {
        return 0
      }

      throw error
    }
  }
}
