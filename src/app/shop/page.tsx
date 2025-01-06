'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// const products = [
//   { id: 1, name: 'Product A', description: 'Description A', price: 100, category: 'Category 1', image: 'https://via.placeholder.com/150' },
//   { id: 2, name: 'Product B', description: 'Description B', price: 200, category: 'Category 2', image: 'https://via.placeholder.com/150' },
//   { id: 3, name: 'Product C', description: 'Description C', price: 150, category: 'Category 1', image: 'https://via.placeholder.com/150' },
//   { id: 4, name: 'Product D', description: 'Description D', price: 300, category: 'Category 2', image: 'https://via.placeholder.com/150' },
// ];



const products = [
  {
    id: 1,
    name: "Restylane Defyne Lido. (1 x 1ml)",
    description: "A soft-gel filler designed to give a lifted and youthful appearance. Ideal for deep wrinkles, folds, and replacing lost skin volume. Contains lidocaine for comfortable injection.",
    price: 56000,
    category: "Dermal Fillers",
    image: "/products/i1.jpeg",
  },
  {
    id: 2,
    name: "Restylane Lido. (1 x 1ml)",
    description: "Adds volume and fullness to the skin, corrects fine lines, wrinkles, and enhances lips. Contains lidocaine for a more comfortable injection.",
    price: 51000,
    category: "Dermal Fillers",
    image: '/products/i2.jpeg',
  },
  {
    id: 3,
    name: "Lumifil Max with Lido. (1 x 1ml)",
    description: "Ideal for sub-Q areas and deep wrinkles including augmentation of the nose, cheeks, jawline, and chin. Thick and long-lasting for pronounced structures.",
    price: 27000,
    category: "Dermal Fillers",
    image: '/products/i3.jpeg',
  },
  {
    id: 4,
    name: "Lumifil Kiss with Lido. (1 x 1ml)",
    description: "Perfect for lip augmentation and areas requiring a thicker, high-viscosity solution. Suitable for cheeks, chin, jawline, and nasolabial folds.",
    price: 25000,
    category: "Dermal Fillers",
    image: '/products/i4.jpeg',
  },
  {
    id: 5,
    name: "Cytocare 516 (10 x 5ml) Vial",
    description: "A resorbable implant for treating early fine lines, increasing skin tone, and restoring hydration. Improves skin elasticity and radiance.",
    price: 52000,
    category: "Skin Boosters",
    image: '/products/i5.jpeg',
  },
  {
    id: 6,
    name: "Lumi-Pro Skin Booster 3 x 2ml",
    description: "Delivers intense hydration, promotes collagen stimulation, and enhances skin glow. Suitable for face, hands, and neck.",
    price: 47000,
    category: "Skin Boosters",
    image: '/products/i6.jpeg',
  },
  {
    id: 7,
    name: "Lumi Eyes (1 x 1ml) Vial",
    description: "Tissue stimulator for needle mesotherapy around the eyes. Reduces dark circles, fine wrinkles, and rejuvenates tissue.",
    price: 30000,
    category: "Eye Treatments",
    image: '/products/i6.jpeg',
  },
  {
    id: 8,
    name: "Jalupro HMW (1 x 1.5ml + 1 x 1ml) Inj.",
    description: "Dermal biorevitalizer for eradicating wrinkles, scars, and skin depressions. Suitable for face, neck, underarms, hands, and more.",
    price: 34000,
    category: "Biorevitalizers",
    image: '/products/i7.jpeg',
  },
  {
    id: 9,
    name: "Juvederm Ultra 4 (2 x 1ml) Inj.",
    description: "Hyaluronic acid filler for moderate to deeper facial wrinkles. Enhances lip contour and volume with long-lasting effects.",
    price:  95000, // Approximated based on the context
    category: "Dermal Fillers",
    image:  '/products/i8.jpeg',
  },


  // rest of the things 
  {
    id: 10,
    name: "JUVEDERM VOLIFT (2 X 1ML) INJ.",
    description: "JUVEDERM VOLIFT LIDOCAINE is an injectable filler for deeper skin lines and wrinkles, also used for facial contouring and restoring volume. Contains lidocaine for pain reduction.",
    packDetails: "2 X 1ML syringes, 4 X 30G 1/2\" needles",
    composition: "17.5 MG/ML hyaluronic acid, 3 MG/ML lidocaine",
    price: 100000,
    benefits: [
      "Fill deeper facial lines and wrinkles",
      "Restore facial volume and contour cheeks, cheekbones, and chin"
    ],
    application: "Injected into the deep dermis or mucous membrane of the lips.",
    duration: "Up to 15 months",
    retailPrice: "100,000 LKR (with Delivery) per Pack",
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i9.jpeg',
  },
  {
    id: 11,
    name: "PROFHILO H+L (1 X 2ML) INJ",
    description: "PROFHILO H+L is a stabilized hyaluronic acid product for skin remodeling and laxity treatment.",
    packDetails: "1 X 2ML syringe",
    price: 58000,
    benefits: [
      "Improvement in tissue quality",
      "Skin remodeling",
      "Treatment of skin laxity",
      "Restore skin firmness"
    ],
    duration: "6 to 9 months, up to 1 year depending on skin type",
    retailPrice: "58,000 LKR (with Delivery) per Pack",
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i10.jpeg',
  },
  {
    id: 12,
    name: "JALUPRO AMINO ACID",
    description: "JALUPRO Amino Acid is a sterile, resorbable solution for dermal bio-revitalization, improving skin texture, and minimizing wrinkles.",
    packDetails: "2 sterile bottles of amino acids, 2 vials of sodium hyaluronate",
    price: 36000,
    benefits: [
      "Eliminate wrinkles and improve skin texture",
      "Treat areas like face, neck, décolleté, underarms, hands, thighs, abdomen, and knees"
    ],
    duration: "Up to 6 months",
    retailPrice: "36,000 LKR (with Delivery) per Pack",
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i11.jpeg',
  },
  {
    id: 13,
    name: "JALUPRO YOUNG EYE SKIN BOOSTER",
    description: "An injectable solution for restoring elasticity in the periorbital area, addressing under-eye bags, dark circles, and wrinkles.",
    packDetails: "1 X 1ML syringe",
    retailPrice: "45,000 LKR (with Delivery) per Pack",
    price: 45000,
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i12.jpeg',
  },
  {
    id: 14,
    name: "AQUALYX (5 x 8ml Vials)",
    description: "Aqualyx is a fat-dissolving product for treating localized fat pockets under the skin.",
    packDetails: "5 X 8ml vials",
    price:  65000,
    benefits: [
      "Dissolves pockets of unwanted fat",
      "Contours specific body areas"
    ],
    duration: "Permanent results with a healthy lifestyle",
    retailPrice: "65,000 LKR (with Delivery) per Pack",
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i13.jpeg',
  },
  {
    id: 15,
    name: "JALUPRO SUPER HYDRO SKIN BOOSTER INJ",
    description: "Contains 80mg of hybrid HA for lifting and hydrating the skin, and supporting collagen and elastin synthesis.",
    packDetails: "1 X 2.5ML syringe",
    retailPrice: "47,000 LKR (with Delivery) per Pack",
    price: 47000,
    specialDiscount: "Available for 5 or more packs",
    image:  '/products/i14.jpeg',
  },
  {
    id: 16,
    name: "LEMON BOTTLE FAT DISSOLVING (5 x 10ml Vials)",
    description: "Advanced lipolysis solution for fat decomposition using Riboflavin (Vitamin B2) and other ingredients.",
    packDetails: "5 X 10ml vials",
    retailPrice: "60,000 LKR (with Delivery) per Pack",
    specialDiscount: "Available for 5 or more packs",
    price: 60000,
    image:  '/products/i15.jpeg',
  },
 
];



export default function Shop() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (!category || product.category === category)
    )
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price') return a.price - b.price;
      return 0;
    });

    const router = useRouter()

     
    const absoluteElementRef = useRef<HTMLDivElement>(null);
    const [openModal, setopenModal] = useState(false);
  
    useEffect(() => {
      const handleClickOutside = (event:MouseEvent) => {
        if (
          absoluteElementRef.current &&
          !absoluteElementRef.current?.contains(event.target as Node) &&
          openModal
        ) {
          setopenModal(false); // Call your function to close the modal or trigger any other action
        }
      };
  
      // const handleScroll = () => {
      //   if (openModal) {
      //     setopenModal(false); // Call your function to close the modal or trigger any other action
      //   }
      // };
  
      document.addEventListener("click", handleClickOutside);
      // window.addEventListener("scroll", handleScroll);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
        // window.removeEventListener("scroll", handleScroll);
      };
    }, [openModal]);
  
  
    const [clickedTab, setclickedTab] = useState("shop") 
  

  return (

    <>

<div className=" w-full   bg-[#2C2C2C]] bg-[#101010]] bg-[#0A0A1D] overflow-hidden flex flex-col items-center justify-center">

<div className=" max-w-7xl bg-[#0A0A1D]  w-full">

{/* underline decoraton-2 underline-offset-4 decoration-[#4482FF] */}
<div className=" w-full  2xl:h-fit  h-full flex flex-col p-4">
          

          {/* HEADER  */}

          <div className="  flex justify-between  flex-wrap items-center">

            {/* <Image src="/logotext.png" alt="" width={1000} height={1000} className=" w-36 flex    h-fit object-cover" />  */}
            {/* <Image src="/logobritish.png" alt="" width={1000} height={1000} className=" w-16 lg:flex hidden   h-fit object-cover" />  */}
            {/* <Image src="/logoN.png" alt="" width={2000} height={2000} className=" w16 w-36 lg:flex hidden   h-fit object-cover" />  */}
            <Image src="/logocorrect.PNG" alt="" width={2000} height={2000} className=" w16 w-36 lg:flex hidden   h-fit object-cover" /> 
            {/* <Image src="/logomainblack.png" alt="" width={1000} height={1000} className=" w-28  flex lg:hidden   h-fit object-cover" />  */}

            <div className="  font-poppinsreg5 gap-14 lg:flex hidden items-center"> 
            {/* onClick={() => scrollToSection(servicesWeOfferSection)}  */}
              {/* <h1 onClick={() => scrollToSection(aboutUsSection)} className=" cursor-pointer" >About Us </h1> */}
              {/* <Link href="/services"> <h1    className=" cursor-pointer"  >Services & Pricings </h1> </Link> */}
              {/* <h1 onClick={() => scrollToSection(portfolioSection)}  className=" cursor-pointer"  > Our Works </h1> */}
              <h1  onClick={() => router.push('/')}  className=" cursor-pointer text-[#E0E0E0]  "  >Home </h1>
              <h1  onClick={() => router.push('/courses')}  className=" cursor-pointer text-[#E0E0E0]  "  >Courses </h1>
              <h1  onClick={() => router.push('/about')}  className="  cursor-pointer text-[#E0E0E0]  "  >About Us </h1>
              {/* <h1 onClick={() => scrollToSection(faqsection)}  className=" cursor-pointer text-[#E0E0E0]  "  >FAQs </h1> */}
              {/* <h1 onClick={() => scrollToSection(testimonialsection)}  className=" cursor-pointer text-[#E0E0E0]"  >Testimonials </h1> */}
             {/* <Link href="/shop"> <h1  className=" cursor-pointer  bg-[#4482FF] hover:bg-[#4279e7] px-4 py-1 text-sm text-white rounded-full"  >SHOP </h1> </Link> */}
             <Link href="/shop"> <h1  className=" cursor-pointer bg-[#FF5A5A] hover:bg-[#e95252] px-4 py-1 text-sm text-white rounded-full"  >SHOP </h1> </Link>
              {/* <h1 onClick={() => scrollToSection(contactussection)}  className=" cursor-pointer"  >Contact us </h1> */}
              
            </div>


            {/* <div> 
           
              <a href="https://wa.me/+94706548855" > 
              <Button className=" rounded-md  lg:flex hidden  font-poppinsreg5 px-4 font-medium py-4 text-white  bg-[#4482FF]  transition-colors  delay-75 duration-75 ease-in">Chat on WhatsApp </Button>
              </a>
            </div> */}

          </div>


          <div className="  w-full   lg:hidden p-2 flex justify-between items-center">
      
      {/* <Image src={logoText} alt="" width={500} height={500}  className=" w-36 h-fit object-cover" /> */}
      {/* <Image src="/logobritish.png" alt="" width={1000} height={1000} className=" w-16    h-fit object-cover" />  */}
      {/* <Image src="/logoN.png" alt="" width={2000} height={2000} className=" w-24    h-fit object-cover" />  */}
      <Image src="/logocorrect.PNG"  alt="" width={2000} height={2000} className=" w-24    h-fit object-cover" /> 


        <svg onClick={ () => setopenModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

        
      </div>


      {/* the hamburger sheet  */}

<div
  ref={absoluteElementRef}
  className={` lg:hidden fixed transition-all  overflow-y-auto  z-50   ease-in-out   duration-500 top-0  bg-[#141823] ${
    openModal ? "right-0 w-[70%]" : " -right-full w-0"
  }  h-full `}
>
  <div className=" px-3 py-5">
    <div className=" w-full flex border-b pb-3 border-white justify-end">
      {/* <h1 className=" text-2xl"> FILTER </h1> */}

      <svg
        onClick={() => setopenModal(false)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.9"
        stroke="currentColor"
        className="w-6 h-6 text-red-400 bg-white rounded-full p-[2px]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>

    {/* dropdowns  */}

    <div className=" w-full       overflow-y-auto     ">
      {/* showDivider={false} */}

    

        <div className=" mt-3 flex flex-col gap-3"> 
        <h1 onClick={() =>  { router.push('/') ; setclickedTab("home") }   }  className={` text-center ${clickedTab === "home" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}> Home </h1>
        <h1 onClick={() =>  { router.push('/courses') ; setclickedTab("courses") }  } className={` text-center ${clickedTab === "courses" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}> Courses </h1>
        <h1 onClick={() =>  { router.push('/about') ; setclickedTab("about") }  } className={` text-center ${clickedTab === "about" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}> About Us </h1>
        <h1 onClick={() =>  { router.push('/shop') ; setclickedTab("shop") }  } className={` text-center ${clickedTab === "shop" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}> Shop </h1>
    
    

        {/* <h1   className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"> Log Out </h1> */}
     
     </div>

    
  

      {/* rrrrrrrrrrrrrrrrrrrrr  */}

      {/* {
        status === "unauthenticated" &&

        <div className="mt-3 flex flex-col gap-3"> 


        <h1  onClick={() =>  {  setopenModal(false) } } className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"> Login </h1>

        <h1  onClick={() =>  {  setopenModal(false) } } className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"> Sign Up </h1>

        </div> 
      } */}
    
    
    
    </div>

    {/* dropdowns  */}
  </div>
</div>
{/* the hamburger sheet  */}


       


          {/* HEADER  */}

           

          

          
           </div> 


  
           {/* focus:outline-none focus:ring focus:ring-blue-300 */}

  </div>
  </div>
    <div className="p-6 bg-[#0b1217] min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-white mb-8">Shop</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <input
          type="text"
          placeholder="Search for products..."
          className=" border-white/40 border p-3 text-white bg-[#434343] rounded-md flex-1 shadow-sm "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>

        <select
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </select>
      </div>
      {/* bg-[#4482FF] */}
      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#171f26] border border-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-white truncate">{product.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{product.description}</p>
              <p className="text-lg font-semibold text-[#FF6956] mt-2">LKR {product.price}</p>
              <Link href={`/shop/product/${product.id}`}>
                <h1 className="block mt-4  bg-[#FF5A5A] font-medium text-white text-center py-2 rounded-md ">
                  View Details
                </h1>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-200 mt-8">No products found. Try adjusting your filters.</p>
      )}
    </div>


  </>
  );
}
