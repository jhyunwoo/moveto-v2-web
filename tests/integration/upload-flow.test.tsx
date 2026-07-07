import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import FileUpload from '@/app/components/file-upload/file-upload'
import { GlobalUploadProvider } from '@/app/components/file-upload/global-upload-provider'
import ThemeProvider from '@/app/components/theme-provider'

// Mock the child components and hooks if necessary, or just mock the Worker and API calls
const mockUpload = vi.fn()
const mockPause = vi.fn()
const mockResume = vi.fn()
const mockCancel = vi.fn()

vi.mock('@/lib/hooks/use-used-storage', () => ({
  default: () => ({
    usedStorage: 0,
    usedStorageError: null,
    usedStorageLoading: false,
    mutateUsedStorage: vi.fn(),
  }),
}))

vi.mock('@/auth', () => ({
  getSession: vi.fn().mockResolvedValue({ user: { id: 'user-1' } }),
}))

// Mock Worker globally for jsdom
class MockWorker {
  url: string;
  onmessage: ((this: any, ev: MessageEvent) => any) | null = null;
  constructor(stringUrl: string) {
    this.url = stringUrl;
  }
  postMessage(msg: any) {
    // Simulate worker responses
    if (msg.files) {
      setTimeout(() => {
        if (this.onmessage) {
          this.onmessage(new MessageEvent('message', {
            data: { status: 'Upload Complete', id: 'share-id' }
          }));
        }
      }, 100);
    }
  }
  terminate() {}
  addEventListener(type: string, listener: any) {
    if (type === 'message') {
      this.onmessage = listener;
    }
  }
  removeEventListener() {}
  dispatchEvent() { return true; }
}

global.Worker = MockWorker as any;

describe('File Upload Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset zustand stores if needed
  })

  it('renders the drag and drop box', () => {
    render(
      <GlobalUploadProvider>
        <FileUpload />
      </GlobalUploadProvider>
    )
    
    expect(screen.getByText(/전송할 파일을 드롭하거나 선택해주세요/i)).toBeInTheDocument()
  })

  it('allows selecting files', async () => {
    const user = userEvent.setup()
    render(
      <GlobalUploadProvider>
        <FileUpload />
      </GlobalUploadProvider>
    )

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    
    await user.upload(input, file)
    
    expect(screen.getByText('hello.png')).toBeInTheDocument()
  })
})
