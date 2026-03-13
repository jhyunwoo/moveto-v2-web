import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'alert', {
    writable: true,
    value: vi.fn(),
  })
}
