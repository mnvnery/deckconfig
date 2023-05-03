import Head from 'next/head'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Link from 'next/link'
import FabricSelection from '@/components/FabricSelection'
import { useEffect, useState, useRef } from 'react'
import Sheet, { SheetRef } from 'react-modal-sheet';


export default function FabricSelect() {
    const [jacketFabrics, setJacketFabrics] = useState([])
    const [trouserFabrics, setTrouserFabrics] = useState([])
    const [waistcoatFabrics, setWaistcoatFabrics] = useState([])
    const [selected, setSelected] = useState(0)
    const [chosenSet, setChosenSet] = useState(0)
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);

    useEffect(() => {
        const set =  JSON.parse(sessionStorage.getItem("chosenSet"));
        setChosenSet(parseInt(set))
        const storedSizes = JSON.parse(sessionStorage.getItem("sizes"));
        //
          const jacket = JSON.parse(sessionStorage.getItem('jacket'))
        //}
        const trouser = JSON.parse(sessionStorage.getItem('trousers'))
        const fetchData = async () => {
          try {
            const jacketList = await fetch(
              `https://lunar-kindhearted-bun.glitch.me/getfabrics?title=${storedSizes.jacketSize}`
            );
            const jacketData = await jacketList.json();

            if ([0, 1, 2].includes(chosenSet)) {

            const jackets = jacketData.productVariants.edges
              .filter((edge) => edge.node.title.includes(jacket.title.toUpperCase()))
              .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id, 
                description: edge.node.product?.description,
              }));
              setJacketFabrics(jackets);

            }

              const trouserList = await fetch(
                `https://lunar-kindhearted-bun.glitch.me/getfabrics?title=${storedSizes.trouserSize}`
              );
              const trouserData = await trouserList.json();

              console.log(trouserData)

              if ([0, 1, 3].includes(chosenSet)) {
                const trousers = trouserData.productVariants.edges
                  .filter((edge) =>  edge.node.title.includes(trouser.title.toUpperCase()))
                  .map((edge) => ({
                    img: edge.node.image?.url,
                    title: edge.node.product?.title,
                    price: edge.node.price,
                    id: edge.node.id, 
                    description: edge.node.product?.description,
                  }));
                  setTrouserFabrics(trousers);
              }

                const waistcoat = jacketData.productVariants.edges
                .filter((edge) => edge.node.title.includes("WAISTCOAT"))
                .map((edge) => ({
                  img: edge.node.image?.url,
                  title: edge.node.product?.title,
                  price: edge.node.price,
                  id: edge.node.id, 
                  description: edge.node.product?.description,
                }));
        
            
            setWaistcoatFabrics(waistcoat);
            
          } catch (error) {
            console.error(error);
          } 
        };
        fetchData();
      }, []);

    return (
        <>
        <Head>
            <title>The Deck Configurator</title>
            <meta name="description" content="The Deck Configurator Fabric" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header fill='#2F2727'/>
        <div className="h-screen w-screen bg-gray-200 justify-end items-center p-7 hidden md:flex">
            <div className='w-2/5'>
            {[0, 1].includes(chosenSet) &&
              <div className={`bg-beige rounded-t-xl shadow-xl border-b border-charcoal grid ${chosenSet === 0 ? 'grid-cols-3' : 'grid-cols-2'} text-center`}>
                {[0, 1, 2].includes(chosenSet) && <div className={`px-9 py-2 rounded-tl-xl cursor-pointer ${selected === 0 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(0)}>Jacket</div>}
                {[0, 1, 3].includes(chosenSet) && (<div className={`py-2 ${chosenSet === 1 ? 'rounded-tr-xl': ''} cursor-pointer ${selected === 1 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(1)}>Trousers</div>)}
                {chosenSet === 0 && (<div className={`py-2 rounded-tr-xl cursor-pointer ${selected === 2 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(2)}>Waistcoast</div>)}
              </div>
            }
            {[0, 1, 2].includes(chosenSet) && selected === 0 &&
            <FabricSelection productData={jacketFabrics} productType='JacketFabric'/>
            }
            {[0, 1, 3].includes(chosenSet) && selected === 1 &&
            <FabricSelection productData={trouserFabrics} productType='TrouserFabric'/>
            }
            {chosenSet === 0 && selected === 2 &&
            <FabricSelection productData={waistcoatFabrics} productType='WaistcoatFabric'/>
            }
            </div>
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
            <div className='mx-4'>
            {[0, 1].includes(chosenSet) &&
              <div className={`grid ${chosenSet === 0 ? 'grid-cols-3' : 'grid-cols-2'} text-center`}>
                {[0, 1, 2].includes(chosenSet) && <div className={`relative py-2 cursor-pointer ${selected === 0 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(0)}>Jacket</div>}
                {[0, 1, 3].includes(chosenSet) && (<div className={`relative py-2 cursor-pointer ${selected === 1 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(1)}>Trousers</div>)}
                {chosenSet === 0 && (<div className={`relative py-2 cursor-pointer ${selected === 2 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(2)}>Waistcoast</div>)}
              </div>
            }
            {[0, 1, 2].includes(chosenSet) && selected === 0 &&
            <FabricSelection productData={jacketFabrics} productType='JacketFabric'/>
            }
            {[0, 1, 3].includes(chosenSet) && selected === 1 &&
            <FabricSelection productData={trouserFabrics} productType='TrouserFabric'/>
            }
            {chosenSet === 0 && selected === 2 &&
            <FabricSelection productData={waistcoatFabrics} productType='WaistcoatFabric'/>
            }
            </div>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        <div className='flex justify-between items-center mr-14 absolute bottom-0 pt-2 pb-2 md:pb-7 w-full px-3 md:px-7 z-[99999999] bg-charcoal text-beige md:text-charcoal md:bg-transparent'>
            <Link href='/product-view'>
            <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 w-7 rotate-180 stroke-beige md:stroke-charcoal">
                <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M50 18.5L0 18.5" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
            </Link>
            <Button href='/checkout' mainColour='text-beige md:text-charcoal' text='Next step' icon='#2F2727' />
        </div>
        </>
    )
}
