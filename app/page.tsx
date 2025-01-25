import dynamic from 'next/dynamic'

const MainPage = dynamic(() => import('./main'), {
  ssr: false
})

export default function Page() {
  return <MainPage />
} 