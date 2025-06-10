import { describe, expect, it } from 'vitest'
import fivePlusFive from './testFunction'

describe('five plus five should be ten', () => {
  it('returns 10', () => {
    expect(fivePlusFive()).toBe(10)
  })
})
