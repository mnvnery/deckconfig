import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

const ProductCard = ({ index, img, title, isChecked, handleCardClick, cardOpacity, price }) => {
    const [opacity, setOpacity] = useState(cardOpacity);

    const handleClick = () => {
        handleCardClick(index);
        setOpacity(isChecked ? 1 : 0.5);
    };
    return (
        <div>
            <div className="relative" style={{ opacity: cardOpacity }}>
            <div className="relative rounded-xl h-[50vh] md:h-[45vh] md:w-[18vw] border">
                <Image src={img} fill className="object-cover rounded-xl bg-white"/>
            </div>
            <div className="absolute bottom-2 left-3"><input type="checkbox" className={`appearance-none w-9 h-9 rounded-full bg-white border cursor-pointer ${isChecked ? 'checked' : ''}`} checked={isChecked} onChange={handleClick} /></div>
            </div>
            <div className="uppercase text-xs mt-4">{title}</div>
            {price &&
            <div className="uppercase text-xs mt-2">Base Price £{price}</div>
            }
        </div>
    )
}
export default ProductCard