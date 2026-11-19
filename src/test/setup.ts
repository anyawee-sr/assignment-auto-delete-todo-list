import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

/**
 * Make React warn when a state update in a test is not wrapped in `act()`
 * RTL only sets this when globals are enabled
 *
 * Object.assign is used because `typeof globalThis` does not declare this property (TS7017)
 */
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

afterEach(() => {
  cleanup()
})
