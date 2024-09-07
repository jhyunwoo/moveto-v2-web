const planShareTime = {
  Free: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
  ],
  Basic: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
    { value: 60, text: '1시간' },
    { value: 180, text: '3시간' },
    { value: 360, text: '6시간' },
    { value: 720, text: '12시간' },
  ],
  Pro: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
    { value: 60, text: '1시간' },
    { value: 180, text: '3시간' },
    { value: 360, text: '6시간' },
    { value: 720, text: '12시간' },
    { value: 1440, text: '1일' },
  ],
  Unauthorized: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
  ],
}

export default function getShareTimeOptionsForPlan(userPlan: string | null | undefined) {
  switch (userPlan) {
    case 'Free':
      return planShareTime.Free
    case 'Basic':
      return planShareTime.Basic
    case 'Pro':
      return planShareTime.Pro
    default:
      return planShareTime.Unauthorized
  }
}
