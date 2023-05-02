import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import ButtonLarger from '@/components/ButtonLarger'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>The Deck Configurator</title>
        <meta name="description" content="The Deck Configurator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header fill='white'/>
      <div className="bg-[url('/bg-img.webp')] bg-[68%_0%] bg-cover text-beige h-screen w-screen px-7">
        <div className="flex flex-col h-screen justify-between py-7">
          <div className='h-1/3'></div>
          <div className='text-[11vw] md:text-[5.5vw] leading-tight md:w-[60%] font-editorial mb-10'>The choice is yours. <br/>
          This is the space to design your own <span className='text-6xl font-shameless md:text-[6.5vw] mr-4 md:mt-[-20px]'>signature</span> look.
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-end h-1/3 md:mr-14'>
            <div className='md:self-end ml-24 text-xs md:text-xs md:ml-32 md:w-1/5 mb-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper bibendum dui ullamcorper.</div>
            <ButtonLarger href='/base-info' mainColour='text-beige' text='Start designing' icon='white'/>
          </div>
        </div>
      </div>
    </>
  )
}
