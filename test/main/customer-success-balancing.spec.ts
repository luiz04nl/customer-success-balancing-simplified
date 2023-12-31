import { CustomerSuccessBalancing } from '../../src/main/customer-success-balancing'

describe('CustomerSuccessBalancing', () => {
  test('Scenario 1', () => {
    const css = [
      { id: 1, score: 60 },
      { id: 2, score: 20 },
      { id: 3, score: 95 },
      { id: 4, score: 75 }
    ]
    const customers = [
      { id: 1, score: 90 },
      { id: 2, score: 20 },
      { id: 3, score: 70 },
      { id: 4, score: 40 },
      { id: 5, score: 60 },
      { id: 6, score: 10 }
    ]
    const csAway = [2, 4]

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(1)
  })

  function buildSizeEntities(size: number, score: number) {
    const result = []
    for (let i = 0; i < size; i += 1) {
      result.push({ id: i + 1, score })
    }
    return result
  }

  function mapEntities(arr: any[]) {
    return arr.map((item: any, index: number) => ({
      id: index + 1,
      score: item
    }))
  }

  function arraySeq(count: number, startAt: number) {
    return Array.apply(0, Array(count)).map((it, index) => index + startAt)
  }

  test('Scenario 2', () => {
    const css = mapEntities([11, 21, 31, 3, 4, 5])
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const csAway: number[] = []

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(0)
  })

  test('Scenario 3', () => {
    const testTimeoutInMs = 100
    const testStartTime = new Date().getTime()

    const css = mapEntities(arraySeq(999, 1))
    const customers = buildSizeEntities(10000, 998)
    const csAway = [999]

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(998)

    const executionTime = new Date().getTime() - testStartTime

    console.log('DEBUG executionTime: ', executionTime)

    if (executionTime > testTimeoutInMs) {
      throw new Error(`Test took longer than ${testTimeoutInMs}ms!`)
    }
  })

  test('Scenario 4', () => {
    const css = mapEntities([1, 2, 3, 4, 5, 6])
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const csAway: number[] = []

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(0)
  })

  test('Scenario 5', () => {
    const css = mapEntities([100, 2, 3, 6, 4, 5])
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const csAway: number[] = []

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(1)
  })

  test('Scenario 6', () => {
    const css = mapEntities([100, 99, 88, 3, 4, 5])
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const csAway = [1, 3, 2]

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(0)
  })

  test('Scenario 7', () => {
    const css = mapEntities([100, 99, 88, 3, 4, 5])
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    const csAway = [4, 5, 6]

    const customerSuccessBalancing = new CustomerSuccessBalancing(
      css,
      customers,
      csAway
    )
    const value = customerSuccessBalancing.execute()

    expect(value).toEqual(3)
  })
})
