import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

const FabricCard = ({ img, title, price, isChecked, onCheck}) => {

    return (
        <div onClick={onCheck} className={`border p-1 ${isChecked ? 'border-black bg-white/40' : 'border-transparent'}`}>
            <div className="relative">
            <div className="relative rounded-xl h-20 w-full border">
                <Image src={img} fill className="object-cover bg-white" alt={`${title} image`}/>
            </div>
            </div>
            <div className="uppercase text-xs  mt-2 md:mt-4">{title}</div>
            {price &&
            <div className="uppercase text-xs mt-2 md:mt-4">£{price}</div>
            }
        </div>
    )
}
export default FabricCard