import { afterEach, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

expect.extend(matchers) // extend 'expect' with additional matchers from jest-dom,
//  like 'toBeInTheDocument()' etc.
afterEach(() => {
  // after each test ..
  cleanup() // .. clean up the DOM
})
