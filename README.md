# Moveto V2
**Powered by Moveto Team**

## Description
로그인 과정 없이 빠르게 파일을 다른 컴퓨터로 옮길 수 있는 웹 기반 파일 공유 서비스입니다.
USB 대신 파일을 옮기기위해 사용할 수 있습니다.
대용량 파일도 전송할 수 있습니다.

## Roadmap
- [X] New UI 
- [ ] File Upload Algorithm using WebWorkers
- [ ] File Upload with Encryption and Password
- [ ] File Download time limit

## Tech Stack
### Frontend
- TypeScript
- React
- Next.js 14
- Tailwind CSS
- SWR
- Recoil
- React Hook Form
- Framer Motion

### Backend
- Next.js Route Handler (current version) -> Migration to Hono.js with Cloudflare Workers
- Auth.js (beta) -> Migrate to Lucia Auth with Moveto Auth System
- Drizzle ORM
- PostgreSQL (self host on Coolify)
