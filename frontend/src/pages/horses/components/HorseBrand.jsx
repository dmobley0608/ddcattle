import React from 'react'
// Import images
import inmgU from '../../../assets/brand-symbols/U.png';
import img0 from '../../../assets/brand-symbols/0.png';
import img1 from '../../../assets/brand-symbols/1.png';
import img2 from '../../../assets/brand-symbols/2.png';
import img3 from '../../../assets/brand-symbols/3.png';
import img4 from '../../../assets/brand-symbols/4.png';
import img5 from '../../../assets/brand-symbols/5.png';
import img6 from '../../../assets/brand-symbols/6.png';
import img7 from '../../../assets/brand-symbols/7.png';
import img8 from '../../../assets/brand-symbols/8.png';
import img9 from '../../../assets/brand-symbols/9.png';
import { Col, Row, Image } from 'react-bootstrap';
const HorseBrand = ({ horse }) => {
  const brandImages = [
    img0, img1, img2, img3, img4, img5, img6, img7, img8, img9
  ];

  return (
    <div className='d-flex p-2 w-100'>
      <Image className='me-2' src={inmgU} alt={`Brand digit U`} style={{ width: '2rem', height:'2rem' }} />
      <div className='d-flex flex-column me-2 gap-1'>
        <Image src={brandImages[horse.brand[0]]} alt={`Brand digit ${horse.brand[0]}`} style={{ width: '1rem', height:'1rem' }} />
        <Image src={brandImages[horse.brand[1]]} alt={`Brand digit ${horse.brand[0]}`} style={{ width: '1rem', height:'1rem' }} />
      </div>
      <div className='border-bottom border-2 border-dark pe-1 ps-1 w-100'>
        <div className='d-flex justify-content-between w-100 align-items-baseline'>
          {horse.brand.split('').map((digit, index) => {
            if (index > 1) {
              return (
                <div className='p-1'>
                  <Image src={brandImages[digit]} alt={`Brand digit ${digit}`} style={{ width: '1rem', height:'1rem' }} />
                </div>
              )
            }
          })}
        </div>
      </div>

    </div>
  )
}

export default HorseBrand
