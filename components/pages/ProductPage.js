import Head from 'next/head'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Link from 'next/link'
import ChosenProduct from '@/components/ChosenProduct'
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useEffect, useRef, useState } from 'react'

const ProductPage = ({onNextStep, start, pose}) => {
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);
    useEffect(() => {
        start();
        pose();
    })

    
    return (
        <>
        <div className="h-screen w-screen pointer-events-none justify-between items-center p-7 hidden md:flex relative z-10">
            <ChosenProduct handleClick={onNextStep} pose={pose}/>
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
                <ChosenProduct handleClick={onNextStep} pose={pose}/>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        </>
    )
}

export default ProductPage