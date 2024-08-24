import { Session } from 'next-auth'

interface ClientToWorkersMessageType {
  files: File[]
  shareTime: number
  session: Session | null
}

export type { ClientToWorkersMessageType }
