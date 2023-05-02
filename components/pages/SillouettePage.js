import Head from 'next/head'
import Header from '@/components/Header'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'
import Waistcoast from '@/components/Waistcoast'
import ButtonNoLink from '@/components/ButtonNoLink'
import SizeCalc from '@/components/SizeCalc'

const SillouettePage = () => {
    const [selectedJacket, setSelectedJacket] = useState(null);
    const [selectedTrousers, setSelectedTrousers] = useState(null);
    const [selectedWaistcoat, setSelectedWaistcoat] = useState(null);
    const [jacketOpacity, setJacketOpacity] = useState([1, 1, 1, 1]);
    const [trousersOpacity, setTrousersOpacity] = useState([1, 1, 1, 1]);
    const [waistcoatOpacity, setWaistcoatOpacity] = useState([1, 1, 1, 1]);
    const [isOpen, setIsOpen] = useState(false);
    const [jackets, setJackets] = useState([]);
    const [trousers, setTrousers] = useState([]);
    const [waistcoat, setwaistcoat] = useState([]);
    const [productNumber, setProductNumber] = useState(0);

    //console.log(productNumber)

    useEffect(() => {
    const chosenSet = sessionStorage.getItem("chosenSet"); 
    setProductNumber(parseInt(chosenSet))
    })

    useEffect(() => {
        const storedMeasurements = JSON.parse(sessionStorage.getItem("measurements"));

        const bustSize = parseFloat(storedMeasurements.bustCircumference);
        const waistSize = parseFloat(storedMeasurements.waistCircumference);

        const { jacketSize, trouserSize } = SizeCalc(bustSize, waistSize);
        var sizes = {'jacketSize': jacketSize, 'trouserSize' : trouserSize}

        console.log(sizes)
        sessionStorage.setItem("sizes", JSON.stringify(sizes));

        const fetchData = async () => {
        try {
            const jacketList = await fetch(
            `https://lunar-kindhearted-bun.glitch.me/getproducts?title=${jacketSize}`
            );
            const jacketData = await jacketList.json();
    
            const jackets = jacketData.productVariants.edges
            .filter((edge) => edge.node.product.title.includes("Jacket"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));

            const trouserList = await fetch(
                `https://lunar-kindhearted-bun.glitch.me/getproducts?title=${trouserSize}`
            );
            const trouserData = await trouserList.json();

            // console.log(trouserData.productVariants.edges[3].node.product.tags.includes("trousers"))
    
            const trousers = trouserData.productVariants.edges
            .filter((edge) => edge.node.product.tags.includes("trousers"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));

            const waistcoat = jacketData.productVariants.edges
            .filter((edge) => edge.node.product.tags.includes("waistcoat"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));
    
            setJackets(jackets);
            setwaistcoat(waistcoat)
            setTrousers(trousers);

        } catch (error) {
            console.error(error);
        } 
        };
        fetchData();
    }, []);

    const handleJacketClick = (index) => {
        setSelectedJacket(index);
        setJacketOpacity(jacketOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("jacket", index !== null ? JSON.stringify(jackets[index]) : null);
    };

    const handleTrousersClick = (index) => {
        setSelectedTrousers(index);
        setTrousersOpacity(trousersOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("trousers", index !== null ? JSON.stringify(trousers[index]) : null);
    };
    const handleWaistcoatClick = (index) => {
        setSelectedWaistcoat(index);
        setWaistcoatOpacity(waistcoatOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("waistcoat", index !== null ? JSON.stringify(waistcoat[index]) : null);
    };

    const handleClick = () => {
    // [1, 2, 3].includes(productNumber) ? setIsOpen(true) : router.push('/product-view')
    if (([0, 1, 2].includes(productNumber) && selectedJacket === null) || ([0, 1, 3].includes(productNumber) && selectedTrousers === null) || (productNumber === 0 && selectedWaistcoat === null)) {
        alert('Please make all selections');
        return;
    }
    sessionStorage.setItem("trousers", selectedTrousers !== null ? JSON.stringify(trousers[selectedTrousers]) : null);
    sessionStorage.setItem("jacket", selectedJacket !== null ? JSON.stringify(jackets[selectedJacket]) : null);
    sessionStorage.setItem("waistcoat", selectedWaistcoat !== null ? JSON.stringify(waistcoat[selectedWaistcoat]) : null);
    router.push('/product-view')
    };
    return (
        <>
        <div className="h-screen w-screen flex justify-center px-7 pt-[20vh] overflow-y-scroll relative z-10 bg-beige">
            <div>
                <div className='uppercase mb-5 text-sm border-b pb-2'>Select your silhouette</div>
                {[0, 1, 2].includes(productNumber) &&
                <>
                {productNumber !== 2 && (<div className='uppercase mb-5 text-sm'>JACKET</div>)}
                <div className='flex space-x-2 border-b pb-4'>
                    {jackets.map((product, index) => (
                        <ProductCard
                        key={product.id}
                        img={product.img}
                        price={product.price}
                        title={product.title}
                        isChecked={index === selectedJacket}
                        handleCardClick={() => handleJacketClick(index)}
                        cardOpacity={jacketOpacity[index]}
                        />
                    ))}
                </div>
                </>
                }
                {[0, 1, 3].includes(productNumber) &&
                <>
                {productNumber !== 3 && (<div className='uppercase mb-5 text-sm mt-5'>TROUSERS</div>)}
                <div className='flex space-x-2 border-b pb-4'>
                    {trousers.map((product, index) => (
                        <ProductCard
                        key={product.id}
                        img={product.img}
                        price={product.price}
                        title={product.title}
                        isChecked={index === selectedTrousers}
                        handleCardClick={() => handleTrousersClick(index)}
                        cardOpacity={trousersOpacity[index]}
                        />
                    ))}
                </div>
                </>
                }
                {productNumber === 0 &&
                    <>
                    <div className='uppercase mb-5 text-sm mt-5'>Waistcoast</div>
                    <div className='flex space-x-2 border-b pb-4'>
                        {waistcoat.map((product, index) => (
                            <ProductCard
                            key={product.id}
                            img={product.img}
                            price={product.price}
                            title={product.title}
                            isChecked={index === selectedWaistcoat}
                            handleCardClick={() => handleWaistcoatClick(index)}
                            cardOpacity={waistcoatOpacity[index]}
                            />
                        ))}
                    </div>
                    </>
                }
                <div className='py-10'></div>
            </div>
        </div>
        <div className={isOpen ? 'block' : 'hidden'}>
            <Waistcoast href='/product-view'/>
        </div>
        </>
    )
}

export default SillouettePage