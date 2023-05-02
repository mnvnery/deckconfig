import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Button from '@/components/Button'
import CustomSelect from '@/components/CustomSelect'
import Link from 'next/link'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'



const inter = Inter({ subsets: ['latin'] })

const COLORS = [
  '#ff0000', // red
  '#00ff00', // green
  '#0000ff', // blue
  '#ffff00', // yellow
];

export default function BaseInfo() {
  const router = useRouter();
  const [width, setWidth] = useState()

  const skin = [
    { value: '1', label: 'Very Light', color: '#f1e4d7' },
    { value: '2', label: 'Light', color: '#f1dcb8' },
    { value: '3', label: 'Light Medium', color: '#e2b58f' },
    { value: '4', label: 'Medium', color: '#c9975c' },
    { value: '5', label: 'Medium Dark', color: '#a06b3f' },
    { value: '6', label: 'Dark', color: '#7f3e2e' },
    { value: '7', label: 'Very Dark', color: '#5d2518' },
    { value: '8', label: 'Deep', color: '#3c1212' },
  ]

  useEffect(() => {
    setWidth(window.innerWidth);
  })

  const [name, setName] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');

  const convertWeightUnits = (value, prevUnit, newUnit) => {
    if (prevUnit === newUnit || isNaN(parseFloat(value))) return value;
  
    const conversionFactors = {
      'kg': { 'lb': 2.20462, 'st': 0.157473 },
      'lb': { 'kg': 0.453592, 'st': 0.071429 },
      'st': { 'kg': 6.35029, 'lb': 14 },
    };
  
    const convertedValue = parseFloat(value) * conversionFactors[prevUnit][newUnit];
    return isNaN(convertedValue) ? value : convertedValue.toFixed(2);
  };
  
  const convertHeightUnits = (value, prevUnit, newUnit) => {
    if (prevUnit === newUnit || isNaN(parseFloat(value))) return value;
  
    const conversionFactor = prevUnit === 'cm' ? 0.393701 : 2.54;
    const convertedValue = parseFloat(value) * conversionFactor;
    return isNaN(convertedValue) ? value : convertedValue.toFixed(2);
  };
  const handleHeightUnitChange = (e) => {
    const newUnit = e.target.value;
    setHeight(convertHeightUnits(height, heightUnit, newUnit));
    setHeightUnit(newUnit);
  };

  const handleWeightUnitChange = (e) => {
    const newUnit = e.target.value;
    setWeight(convertWeightUnits(weight, weightUnit, newUnit));
    setWeightUnit(newUnit);
  };

  const handleColorChange = (selectedOption) => {
    setSkinTone(selectedOption.color);
  };


const handleSubmit = (e) => {
  e.preventDefault();
  if (!height || !weight) {
    alert('Please fill in the required fields: height and weight');
    return;
  }
  if (height > '211') {
    alert('Please get in touch');
    return;
  }

  const submittedData = {
    name, 
    age,
    skinTone,
    height,
    weight,
    heightUnit,
    weightUnit,
  };

  sessionStorage.setItem('formData', JSON.stringify(submittedData));
  router.push('/details');
};

  return (
    <>
      <Head>
        <title>The Deck Configurator</title>
        <meta name="description" content="The Deck Configurator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header fill={ width < 1024 ? '#2F2727' : 'white'}/>
      <div className='grid md:grid-cols-2 bg-beige md:min-h-screen'>
        <motion.div initial={{x: -100}} whileInView={{x:0}} transition={{stiffness: 50, duration: 0.7}} className='relative w-[50vw] h-screen z-0 hidden lg:block'>
        <Image src='/bg-img.webp' fill className='object-cover' />
        </motion.div>
      <div className='bg-beige flex justify-center items-center mt-28 mb-52 px-7 lg:pt-0 md:px-24'>
        <motion.div initial={{y:100, opacity:0}} whileInView={{y:0, opacity:1}} transition={{stiffness: 50, duration: 0.7}} >
          <div className='mb-3'>ENTER YOUR BASE INFORMATION</div>
          <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper bibendum dui, nec condimentum quam dignissim in.</div>
          <form action="/send-data-here" method="post">
            <div className='grid md:grid-cols-2 mt-10 gap-8'>
            <div>
              <label htmlFor="first">NAME</label><br/>
              <input onChange={(e) => setName(e.target.value)} type="text" id="first" name="first" className='bg-transparent border-b border-charcoal mt-3 text-sm pb-2 w-full'/>
            </div>
            <div>
              <label htmlFor="last">AGE</label><br/>
              <input onChange={(e) => setAge(e.target.value)} type="text" id="last" name="last" className='bg-transparent border-b border-charcoal mt-3 text-sm pb-2 w-full'/>
            </div>
              <div>
                <label htmlFor="height">HEIGHT</label><br />
                <div className="grid grid-cols-[70%_30%]">
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 mr-3 flex-1 pt-1'
                  />
                  <select
                    id="heightUnits"
                    name="heightUnits"
                    value={heightUnit}
                    onChange={handleHeightUnitChange}
                    className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 pt-1'
                  >
                    <option value="cm">cm</option>
                    <option value="in">inches</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="weight">WEIGHT</label><br />
                <div className="grid grid-cols-[70%_30%]">
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 mr-3 flex-1 pt-1'
                  />
                  <select
                    id="weightUnits"
                    name="weightUnits"
                    value={weightUnit}
                    onChange={handleWeightUnitChange}
                    className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 pt-1'
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="st">st</option>
                  </select>
                </div>
              </div>

            </div>
            <CustomSelect opt={skin} ph='SKIN TONE (OPTIONAL)' change={handleColorChange}/>
            {/*<button type="submit">Submit</button>*/}
          </form>
        </motion.div>
      </div>
      </div>
      <div className='fixed bottom-0 md:static bg-charcoal flex justify-between items-center mr-14 md:fixed bottom-0 pb-3 w-full pt-2 md:pb-7 px-3 md:px-7 md:bg-transparent'>
        <Link href='/'>
        <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 w-7 rotate-180">
            <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M50 18.5L0 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
        </Link>
        <div onClick={handleSubmit} className={`cursor-pointer text-beige md:text-charcoal px-3 py-2 xxl:px-8 xxl:py-6 flex items-center font-editorial text-2xl`}>
                Next step
                <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 w-7 stroke-white	md:stroke-charcoal">
                    <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M50 18.5L0 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
      </div>
    </>
  )
}
