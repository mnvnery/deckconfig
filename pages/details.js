import Head from 'next/head'
import Image from 'next/image'
import Button from '@/components/Button'
import Header from '@/components/Header'
import YourDetails from '@/components/YourDetails'
import RefineProportions from '@/components/RefineProportions'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
// import UnityBuild from '@/components/UnityBuild'
import Sheet, { SheetRef } from 'react-modal-sheet';
import Loader from '@/components/Loader'
import MeasurementsCalc from '@/components/MeasurementsCalc'
import dynamic from 'next/dynamic'


const UnityBuild = dynamic(
    () => import('@/components/UnityBuild'),
    { ssr: false }
)


export default function Details() {
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);

    return (
        <>
        <Head>
            <title>The Deck Configurator</title>
            <meta name="description" content="The Deck Configurator" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header fill='#2F2727'/>
        <MeasurementsCalc/>
        <UnityBuild/>

        <div className="absolute top-0 left-0 z-10 h-screen w-screen flex justify-between items-center md:p-7 hidden md:flex pointer-events-none">
            <YourDetails/>
            <RefineProportions/>
        </div>
        
        <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => snapTo(1)}
        snapPoints={[600, 200, 0]}
        initialSnap={1}
        className='md:hidden'
        onSnap={snapIndex =>
          console.log('> Current snap point index:', snapIndex)
        }
      >
            <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
                <YourDetails/>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        <div className='flex justify-between items-center mr-14 absolute bottom-0 pt-2 pb-2 md:pb-7 w-full px-3 md:px-7 z-[99999999] bg-charcoal text-beige md:text-charcoal md:bg-transparent'>
            <Link href='/base-info'>
            <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 w-7 rotate-180 stroke-beige md:stroke-charcoal">
                <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M50 18.5L0 18.5" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
            </Link>
            <Button href='/measurements' mainColour='text-beige md:text-charcoal' text='Next step' icon='#2F2727' />
        </div>
        </>
    )
}
