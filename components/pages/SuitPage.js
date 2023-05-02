import Link from "next/link"
import ProductCard from '@/components/ProductCard'
import { useState } from 'react'
import ButtonNoLink from '@/components/ButtonNoLink'
import { useRouter } from 'next/router'
import { EmblaCarousel } from '@/components/Embla'
import Header from "../Header"




const SuitPage = () => {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [opacity, setOpacity] = useState([1, 1, 1, 1]);
        
    const handleCardClick = (index) => {
        setSelected(index);
        setOpacity(opacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("chosenSet", index);
    };
    console.log(opacity);
    const products =  [
        {img:'/three-piece.webp', title:'Three Piece'},
        {img:'/two-piece.webp', title:'Two Piece'},
        {img: '/safari.webp', title:'Jacket'}, 
        {img:'/trousers.webp', title:'Trousers'},
    ]
    
    return (
        <>
        <Header fill='#2F2727'/>
        <div className='h-screen flex flex-col justify-center md:hidden relative z-10 bg-beige'>
        <div className='uppercase mb-5 text-sm pl-7'>Select your suit</div>
        <EmblaCarousel>
            {products.map((product, index) => (
                <div className='embla__slide' key={index}>
                <ProductCard
                key={product.id}
                img={product.img}
                title={product.title}
                isChecked={index === selected}
                handleCardClick={() => handleCardClick(index)}
                cardOpacity={opacity[index]}
                />
                </div>
            ))}
        </EmblaCarousel>
        </div>
        <div className="h-screen w-screen bg-beige justify-center items-center p-7 absolute top-0 left-0 z-10 hidden md:flex">
            <div>
                <div className='uppercase mb-5 text-sm'>Select your suit</div>
                <div className='hidden md:flex space-x-2'>
                {products.map((product, index) => (
                    <div key={index}>
                    <ProductCard
                    key={product.id}
                    img={product.img}
                    title={product.title}
                    isChecked={index === selected}
                    handleCardClick={() => handleCardClick(index)}
                    cardOpacity={opacity[index]}
                    />
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}
export default SuitPage
