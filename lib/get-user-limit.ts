import getBytes from '@/lib/get-bytes';

export default function getUserLimit(userPlan: string | null | undefined) {
  switch (userPlan) {
    case 'Free':
      return { time: 30, storage: getBytes(100, 'MB') };
    case 'Basic':
      return { time: 60 * 12, storage: getBytes(10, 'GB') };
    case 'Pro':
      return { time: 60 * 24, storage: getBytes(1, 'TB') };
    default:
      return { time: 10, storage: getBytes(50, 'MB') };
  }
}
