import { AuthSession } from '@/auth'

interface ClientToWorkersMessageType {
  files: File[]
  shareTime: number
  session: AuthSession | null
}

export type { ClientToWorkersMessageType }
