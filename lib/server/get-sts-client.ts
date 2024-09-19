import { STSClient } from '@aws-sdk/client-sts'

export default function getSTSClient() {
  return new STSClient({
    region: 'auto',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY!,
      secretAccessKey: process.env.R2_SECRET_KEY!,
    },
  })
}
