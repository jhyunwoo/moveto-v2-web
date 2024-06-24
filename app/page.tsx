import FileUpload from '@/components/file-upload'
import ProfileButton from '@/components/profile-button'

export default function HomePage() {
  return (
    <div className={'w-full min-h-screen flex flex-col items-center justify-center p-4'}>
      <div className={'w-full flex flex-col text-white'}>
        <div className={'flex items-center space-x-2 pb-1'}>
          <div className={'text-3xl font-bold'}>모베토</div>
          <ProfileButton />
        </div>
        <FileUpload />
      </div>
    </div>
  )
}
