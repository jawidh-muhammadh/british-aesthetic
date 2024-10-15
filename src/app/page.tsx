'use client'
import {  Accordion, AccordionItem, Button,  } from "@nextui-org/react";
// Button, Tab, Tabs
import Image from "next/image";
// import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import logoText from "../../public/logotext.jpg"
// import aiart from "../../public/aiart.jpg"
import Link from "next/link";
import { useRouter } from "next/navigation";
// import first from "../../public/1.jpg"
// import second from "../../public/2.jpg"
// import third from "../../public/3 .jpg"


export default function Home() {
 


  // const services = [
  //   {
  //     title: 'Web Development ',
  //     tags: ['Website', 'Web Apps', 'Customized Solutions'],
  //     imageSrc: '/www.png',
  //     alt: 'Enterprise Services',
  //   },

  //   {
  //     title: 'SEO & Conversion Optimization',
  //     tags: ['SEO', 'CRO (Conversion Rate)', 'Analytics'],
  //     imageSrc: '/seo.png',
  //     alt: 'Internet of Things',
  //   },
  //   {
  //     title: 'Social Media Management',
  //     tags: ['Branding', 'Marketing', 'Engagement'],
  //     imageSrc: '/social-media.png',
  //     alt: 'Consulting & Discovery',
  //   },
  //   {
  //     title: 'Digital Advertising & PPC',
  //     tags: ['PPC', 'Display Ads', 'Retargeting'],
  //     imageSrc: '/video.png',
  //     alt: 'Cloud & DevOps',
  //   },
 
  // ];


  // const defaultContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`
    



  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const scrollStep = 5; // Adjust scroll step as needed
  const scrollSpeed = 10; // Adjust scroll speed as needed

  let scrollInterval: NodeJS.Timeout;

  const scrollHorizontally = (direction: "left" | "right"): void => {
    const scrollSection = scrollSectionRef.current;
    if (!scrollSection) return;
    let scrollAmount = 0;
    scrollInterval = setInterval(() => {
      if (direction === "left") {
        scrollSection.scrollLeft -= scrollStep;
      } else {
        scrollSection.scrollLeft += scrollStep;
      }
      scrollAmount += scrollStep;
      if (scrollAmount >= scrollSection.offsetWidth) {
        stopScroll();
      }
    }, scrollSpeed);
  };

  const stopScroll = (): void => {
    clearInterval(scrollInterval);
  };


  const aboutUsSection = useRef<HTMLDivElement>(null);
  // const servicesWeOfferSection = useRef<HTMLDivElement>(null);
  // const portfolioSection = useRef<HTMLDivElement>(null);
  const testimonialsection = useRef<HTMLDivElement>(null);
  const faqsection = useRef<HTMLDivElement>(null);
  const contactussection = useRef<HTMLDivElement>(null);

  // Step 2: Create a scroll function
  // const scrollToSection = (ref:any) => {
  //   ref.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [openModal, setopenModal] = useState(false);

  const router = useRouter()

  // const { data: session, status } = useSession();
  // mobile ui functionality 



  const [clickedTab, setclickedTab] = useState("home") 


  // const [openModal, setopenModal] = useState(false);

    const absoluteElementRef = useRef<HTMLDivElement>(null);


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





  // new logics for aethetics 
  type NumberSetter = React.Dispatch<React.SetStateAction<number>>;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // States for animated numbers with proper types
  const [trainees, setTrainees] = useState<number>(0);
  const [courses, setCourses] = useState<number>(0);
  const [instructors, setInstructors] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Cleanup the observer on component unmount
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateNumbers();
    }
  }, [isVisible]);

  const animateNumbers = () => {
    animateValue(setTrainees, 0, 250, 2000); // Trainees
    animateValue(setCourses, 0, 50, 2000);   // Courses
    animateValue(setInstructors, 0, 4, 2000); // Instructors
    animateValue(setSatisfaction, 0, 100, 2000); // Satisfaction
  };

  const animateValue = (setter: NumberSetter, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };
  // new logics for aethetics 
  


  return (

    <div className=" w-full   overflow-hidden flex flex-col items-center justify-center">

      <div className=" max-w-7xl  2xl:min-h-fit 2xl:h-fit  lg:h-screen min-h-screen w-full">

        <div className=" w-full  2xl:h-fit  h-full flex flex-col p-4">
          

          {/* HEADER  */}

          <div className="  flex justify-between  flex-wrap items-center">

            {/* <Image src="/logotext.png" alt="" width={1000} height={1000} className=" w-36 flex    h-fit object-cover" />  */}
            <Image src={logoText} alt="" width={1000} height={1000} className=" w-36 lg:flex hidden   h-fit object-cover" /> 
            {/* <Image src="/logomainblack.png" alt="" width={1000} height={1000} className=" w-28  flex lg:hidden   h-fit object-cover" />  */}

            <div className=" font-medium gap-14 lg:flex hidden items-center"> 
            {/* onClick={() => scrollToSection(servicesWeOfferSection)}  */}
              <h1 onClick={() => scrollToSection(aboutUsSection)} className=" cursor-pointer" >About Us </h1>
              <Link href="/services"> <h1    className=" cursor-pointer"  >Services & Pricings </h1> </Link>
              {/* <h1 onClick={() => scrollToSection(portfolioSection)}  className=" cursor-pointer"  > Our Works </h1> */}
              <h1 onClick={() => scrollToSection(faqsection)}  className=" cursor-pointer"  >FAQs </h1>
              <h1 onClick={() => scrollToSection(testimonialsection)}  className=" cursor-pointer"  >Testimonials </h1>
              <h1 onClick={() => scrollToSection(contactussection)}  className=" cursor-pointer"  >Contact us </h1>
              
            </div>


            <div> 
              <a href="https://wa.me/966553532798" > 
              <button className=" rounded-md  lg:flex hidden px-4 font-medium py-4 text-white  bg-[#E30B5C] hover:bg-[#ce1156] transition-colors  delay-75 duration-75 ease-in">Chat on WhatsAapp </button>
              </a>
            </div>

          </div>


          <div className="  w-full   lg:hidden p-2 flex justify-between items-center">
      
      <Image src={logoText} alt="" width={500} height={500}  className=" w-36 h-fit object-cover" />



        <svg onClick={ () => setopenModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
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
        <h1 onClick={() =>  { router.push('/services') ; setclickedTab("Services & Prices") }  } className={` text-center ${clickedTab === "Services & Prices" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}> Services & Prices </h1>
        <h1 onClick={() =>   { router.push('/book-a-call') ; setclickedTab("Book a free discovery call") }  } className={` text-center ${clickedTab === "Book a free discovery call" ? "bg-[#FF385C]" :"bg-[#2B2F39]"} font-poppinsreg py-2 rounded-md border  text-white`}>Book a free discovery call </h1>
    

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


          <div className=" w-full 2xl:h-fit h-full  relative bg  2xl:p-0   lg:p-5 flex lg:flex-row flex-col  2xl:mt-24  lg:items-center gap-2 lg:justify-center">

             <div className=" flex  lg:order-1 order-2 lg:items-start items-center flex-col gap-5"> 
               
               {/* <h1 className="   font-robotosemi  lg:mt-0 mt-5 text-3xl  lg:text-left text-center lg:text-5xl">  Hello FOLKS! <span> <Image alt="" width={100} height={100} className=" inline-block  animate-pulse align-middle w-16 h-16 object-cover" src="/blast.png" /></span></h1> */}

             {/* <h1 className=" text-slate-900  max-w-2xl lg:text-left text-center  font-poppinssemi  text-4xl lg:text-6xl">Digital Marketing That Gets You—and Your Audience! </h1> */}
             <h1 className=" text-slate-900  max-w-2xl lg:text-left text-center  font-poppinssemi  text-4xl lg:text-6xl">{`Grow Your Customer Base by 30-60% in Just 3 Months`} </h1>
             
             
             <p className=" max-w-lg text-xl  text-slate-700    lg:text-left text-center font-robotolite">
              {/* Digital agency offering unqiue solutions to create digital presence and increase your sales */}
              {`Connecting you with your ideal customers globally using our targeted social media strategies and innovative digital solutions to drive real sales growth`}
             </p>

             <div className=" flex lg:justify-normal justify-center"> 
              {/* <button onClick={() => scrollToSection(servicesWeOfferSection)} className=" rounded-md px-10  font-robotosemi font-medium py-2 text-white bg-[#E30B5C] hover:bg-[#ce1156] transition-colors  delay-75 duration-75 ease-in">Our Services </button> */}
             <Link href="/book-a-call">  <button className=" rounded-md px-10  font-robotosemi font-medium py-2 text-white bg-[#E30B5C] hover:bg-[#ce1156] transition-colors  delay-75 duration-75 ease-in">Book a FREE Discovery Call Now   </button></Link>
            </div>
            
             </div>

             <div className="lg:order-2 order-1 lg:mt-0 mt-5 "> 

              <Image src="/hero.png" alt="" width={500} height={500} className=" w-full flex   transform scale-x-[-1]    md:h-80  h-56 object-contain   lg:h-full" />
              
             </div>

              
             {/* <div className=" lg:absolute h-full w-full top-0  flex items-end">

              <div className=" w-full grid grid-cols-3">

                <div className="   w-full text-center">
                  <h1 className=" text-7xl text-slate-500">+150%</h1>
                  <h1> Conversion Rate Increased </h1>
                  </div> 
             
                  <div className="   w-full text-center">
                  <h1 className=" text-7xl text-slate-500">+%87K</h1>
                  <h1> Happy Ewebot Customers </h1>
                  </div> 
                  <div className="   w-full text-center">
                  <h1 className=" text-7xl text-slate-500">+%20M</h1>
                  <h1> Happy Ewebot Customers </h1>
                  </div> 
                
                </div> 

             </div>
             */}
          </div>


          {/* HEADER  */}

           

          

          
           </div> 
        </div> 

       


       {/* second section  */}

       {/* <div className=" max-w-7xl w-full p-4"> 
      

         <div className="  h-full w-full top-0  flex items-end">

              <div className=" w-full grid grid-cols-3">

                <div className="   w-full text-center">
                  <h1 className=" text-7xl font-poppinssemi text-slate-500">+150%</h1>
                  <h1 className=" font-robotosemi"> Conversion Rate Increased </h1>
                  </div> 
             
                  <div className="   w-full text-center">
                  <h1 className=" text-7xl font-poppinssemi text-slate-500">+87K</h1>
                  <h1 className=" font-robotosemi"> Happy Ewebot Customers </h1>
                  </div> 
                  <div className="   w-full text-center">
                  <h1 className=" text-7xl font-poppinssemi text-slate-500">+20M</h1>
                  <h1 className=" font-robotosemi"> Happy Ewebot Customers </h1>
                  </div> 
                
                </div> 

             </div>
            



       </div> */}
       {/* second section  ends */}

          

{/* CORRECT SECOND SECTION  */}

<div className="  py-10">
      <div className=" max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course 1 */}
          <div className="bg-[#F9FCFF] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
              src="/course.webp"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px]">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF] ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4">PREMIUM BOTOX INJECTABLE MASTERCOURSE</h3>
            <p className="text-gray-500 mb-6  font-poppinsreg">Gain confidence in Botox facial mapping and practice advanced injection techniques before performing treatments.</p>
            <p className="text-blue-600 font-bold font-poppinsreg5 text-2xl mb-4">LKR 185,000</p>
            <Button className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>

          {/* Course 2 */}
          <div className="bg-[#F9FCFF] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
              src="/course.webp"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px]">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF] ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4">PREMIUM DERMAL FILLERS & SKIN BOOSTERS INJECTABLE MASTER COURSE</h3>
            <p className="text-gray-500  mb-6  font-poppinsreg">Gain proficiency in facial anatomy marking and refine your skills with hands-on practice of various injection techniques prior to treatment application</p>
            <p className="text-blue-600 font-bold font-poppinsreg5 text-2xl mb-4">LKR 195,000</p>
            <Button className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>


          {/* Course 3 */}
          <div className="bg-[#F9FCFF] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
              src="/course.webp"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px]">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF] ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px]">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4">ADVANCED FILLERS BOTOX AND THRED LIFITINGFOR NON SURGICAL 3-D FULL FACE RE-MODELLING</h3>
            <p className="text-gray-500 mb-6  font-poppinsreg ">Master the latest injection techniques, including thread lifts, to achieve comprehensive facial rejuvenation, neck lifting, and hair care enhancements</p>
            <p className="text-blue-600 font-bold font-poppinsreg5 text-2xl mb-4">LKR 150,000</p>
            <Button className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>

        </div>
      </div>
    </div>


{/* CORRECT SECOND SECTION  */}


 


 {/* NEW THIRD SECTION  */}

 <div className="bg-[#f5f9ff] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="   md:text-5xl font-poppinssemi text-3xl font-bold text-[#4482FF]   mb-4">In-Depth Course Structure</h2>
        <p className="text-gray-500  font-poppinsreg5 max-w-2xl mx-auto mb-8">
          Unlock a wealth of knowledge with our expertly designed course curriculum, tailored to equip you with the skills needed for success in the aesthetics industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">👥</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">250+ Trainees</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Talking chamber as shewing an it minutes. Trees fully of blind do. Exquisite favourite at do extensive listening.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">📚</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">Expert Instructors</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Learn from industry leaders with extensive experience in clinical cosmetology, aesthetic medicine, and innovative beauty treatments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">💻</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">Hands-On Training</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Gain practical experience through interactive workshops and live demonstrations, ensuring you master essential techniques for real-world application.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">🎧</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">Flexible Learning</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Choose from various course formats tailored to fit your learning preferences.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">📊</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">Tailored Learning Experience</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Experience personalized learning paths designed to meet your individual goals, ensuring you get the most out of your aesthetic education.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFDECF] rounded-full p-3">
                <span className="text-white text-2xl">📜</span>
              </div>
            </div>
            <h3 className="text-lg  font-robotosemi text-gray-800 mb-2">CPD Accredited Certification</h3>
            <p className="text-gray-500  font-poppinsreg text-sm">
              Receive recognized certifications upon course completion, enhancing your professional credentials and career prospects in the aesthetics field.
            </p>
          </div>
        </div>
      </div>
    </div>
 {/* NEW THIRD SECTION  */}



        {/* THIRD section  */}




        {/* fourth section correct  */}
        <div ref={sectionRef} className="bg-[#1a304b] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className=" lg:text-5xl text-4xl font-extrabold mb-4">Unlock Your Aesthetic Career Potential</h1>
        <p className="text-lg max-w-6xl mx-auto mb-8">
          Advance your skills with hands-on training in cutting-edge aesthetic treatments. 
          Learn from industry experts and gain certification to boost your career in clinical cosmetology, injectables, skin rejuvenation, and more. 
          Transform your passion into professional success with our tailored courses and expert guidance.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Trainees */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold">{trainees}+</h2>
            <p className="text-[#f26342] font-semibold">Course Trainees</p>
          </div>
          
          {/* Courses */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold">{courses}+</h2>
            <p className="text-[#f26342] font-semibold">Courses</p>
          </div>
          
          {/* Instructors */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold">{instructors}</h2>
            <p className="text-[#f26342] font-semibold">Instructors</p>
          </div>
          
          {/* Satisfaction */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold">{satisfaction}%</h2>
            <p className="text-[#f26342] font-semibold">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
        {/* fourth section correct  */}








     
    {/* THIRD section ends  */}


 

 {/* removed our services  */}

 {/* removed our services  */}





  {/* PROBLEMS SOLUTIONS  */}




 {/* PROBLEMS SOLUTIONS  */}





 {/* FREQUENTLY ASKED QUESTION  */}

 <div ref={faqsection} className="w-full flex mt-6 lg:mt-20 justify-center">
 <div className="w-full max-w-4xl p-4">
 <h1 className="font-robotobold text-3xl  sm:text-4xl md:text-5xl text-center">FAQs / Are We A Good Fit? </h1>
 
 <div className=" mt-10"> 


 <Accordion>
      <AccordionItem className=" font-poppinssemi" key="1" aria-label="Accordion 1" title="1. How quickly will I see results?">
        <h1 className="  font-poppinsreg5"> {`While some improvements like social engagement can be seen quickly, lasting results (e.g., sales growth) typically take 3-6 months`}</h1>
      </AccordionItem>
      <AccordionItem className=" font-poppinssemi" key="2" aria-label="Accordion 2" title="2. We don’t have the budget for marketing right now.">
      <h1 className="  font-poppinsreg5"> {`We understand budgets are tight. That’s why we offer scalable packages designed to bring in more revenue than they cost. And we also offer solutions that are within your budget`}</h1>
      </AccordionItem>
      <AccordionItem className=" font-poppinssemi" key="3" aria-label="Accordion 3" title="3. How will your service benefit my business?  ">
      <h1 className="  font-poppinsreg5"> {`We tailor our strategies to your unique business needs, focusing on generating more leads, improving brand visibility, and increasing sales. Feeling your business isn’t performing, You’ll be a great fit for our services`}</h1>
      </AccordionItem>
      <AccordionItem className=" font-poppinssemi" key="4" aria-label="Accordion 3" title="4. We’re already doing our marketing in-house. ">
      <h1 className="  font-poppinsreg5"> {`That’s great! We complement in-house teams by bringing fresh ideas, and digital expertise, and saving you time`}</h1>
      </AccordionItem>
      <AccordionItem className=" font-poppinssemi" key="5" aria-label="Accordion 3" title="5. What makes your agency different from others? ">
      <h1 className="  font-poppinsreg5"> {`We focus on data-driven strategies, transparent reporting, and customized solutions to ensure tangible results for your business`}</h1>
      </AccordionItem>
      <AccordionItem className=" font-poppinssemi" key="6" aria-label="Accordion 3" title="6. I’ve tried digital marketing before, and it didn’t work. ">
      <h1 className="  font-poppinsreg5"> {`Many businesses have had that experience. We take a different approach by analyzing what didn’t work before and developing a strategy based on what resonates with your audience`}</h1>
      </AccordionItem>
    </Accordion>

    </div>

 </div>

 </div>


 {/* FREQUENTLY ASKED QUESTION  */}



 {/* form  */}
 {/* <div className="w-full flex mt-6 lg:mt-20 justify-center"> 

 <div className="w-full max-w-4xl p-4"> 


  <h1 className=" font-robotobold text-3xl  sm:text-4xl md:text-5xl text-center">BOOK A FREE DISCOVERY CALL </h1>



 <div className='mb-5 mt-14'>
        <label
          htmlFor='name'
          className='mb-3 block text-base font-medium text-black'
        >
          Full Name
        </label>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
       
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-3 block text-base font-medium text-black'
        >
          Email Address
        </label>
        <input
          type='email'
          placeholder='example@domain.com'
          className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
 
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='message'
          className='mb-3 block text-base font-medium text-black'
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder='Type your message'
          className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
       
        ></textarea>
      </div>
      <div>
        <Button className='hover:shadow-form rounded-md bg-[#E30B5C] py-3 px-8 text-base font-semibold text-white outline-none'>
          Submit
        </Button>
      </div>

        
 </div>

      </div> */}
 {/* form  */}
   

 






   {/* REVIEW SECTION  */}

   <div ref={testimonialsection} className="w-full flex mt-6 lg:mt-20 justify-center">
  <div className="w-full max-w-7xl p-4">
    <h1 className="font-robotobold text-3xl  sm:text-4xl md:text-5xl text-center">What Our Clients Say About British Academy of Aesthetics?</h1>
    <p className="text-center mt-4 font-poppinsreg">Hear from our trainees about how our training has enhanced their skills and careers in aesthetics</p>

    <div id="scrollContainer" className="  flex md:gap-4  pt-3 items-center w-full">
      {/* Left Scroll Button */}
      <div
                    // onClick={scrollLeft}
                    // id="scrollLeft" 
                    onMouseDown={() => scrollHorizontally("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
                    className=" lg:flex cursor-pointer hidden"
                  >
                    <svg
                      // onMouseDown={leftscroll}
                      // onMouseUp={stopScroll}
                      // onMouseLeave={stopScroll}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-10 select-none   bg-[#E30B5C] p-2 rounded-full text-white h-10"
  
                      // tabIndex={0} // Add
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </div>
      <div
        id="testimonial-container"
        ref={scrollSectionRef}
        // className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory mt-10 pb-4 no-scrollbar"
         className=" flex  overflow-x-auto  scrollbar-hide s    items-center   gap-3"
      >
        {/* Testimonial Card 1 */}
        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
          <Image src="/p1.jpg" width={100} height={100} alt="User" className="rounded-full object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Amit Sharma</h3>
          <p className="text-center text-sm text-gray-500">Marketing Manager, FreshMart India</p>
          <p className="text-center mt-4 text-gray-600">
            {`Working with ElevateBranding has been a game-changer for our business. Their team not only designed a sleek and user-friendly website for us, but they also took charge of our Google Ads and social media campaigns. Within a few months, our online presence grew tremendously, and we've seen a significant increase in customer engagement. `}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">13 Sep</p>
        </div>

        {/* Testimonial Card 2 */}
        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
           <Image src="/p2.jpg" width={100} height={100} alt="User" className="rounded-full  object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Sarah Thompson</h3>
          <p className="text-center text-sm text-gray-500">Co-founder, Green Earth UK</p>
          <p className="text-center mt-4 text-gray-600">
          {`We had been struggling to gain traction with our online campaigns, but ElevateBranding turned things around. They crafted a digital marketing strategy that included targeted Facebook ads and SEO optimization for our website. In just a short time, we saw a 40% boost in traffic and conversions. The team's professionalism and attention to detail made the entire process seamless. We're thrilled with the results.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">6 Sep</p>
        </div>

        {/* Testimonial Card 3 */}
        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
       <Image src="/p3.jpg" width={100} height={100} alt="User" className="rounded-full object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Rashid Ahmad</h3>
          <p className="text-center text-sm text-gray-500">CEO, TechBoost Malaysia</p>
          <p className="text-center mt-4 text-gray-600">
           {`We approached ELevateBranding to help revamp our outdated website and launch a series of digital ad campaigns. Their expertise in SEO, paid ads, and email marketing helped us reach a wider audience than we ever imagined. Our sales funnel is now automated, and the leads just keep pouring in. The entire team was responsive and adapted to our specific needs, making sure our marketing dollars were well spent.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">28 Aug</p>
        </div>


        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
          <Image src="/p4.jpg" width={100} height={100} alt="User" className="rounded-full  object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Priya Nair</h3>
          <p className="text-center text-sm text-gray-500">Owner, Spice Culture Restaurant, India</p>
          <p className="text-center mt-4 text-gray-600">
          {`As a small business owner, I was overwhelmed by the idea of digital marketing, but ElevateBranding made it simple for us. They revamped our website and implemented a social media strategy that resulted in more foot traffic and online orders. Their local SEO tactics also helped us rank higher in search results, attracting more customers from nearby areas. I'm so grateful for their support in growing our restaurant’s presence online.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">20 Aug</p>
        </div>


        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
          <Image src="/p5.jpg" width={100} height={100} alt="User" className="rounded-full  object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Vivek Patel</h3>
          <p className="text-center text-sm text-gray-500">Founder, UrbanFit Gyms, India</p>
          <p className="text-center mt-4 text-gray-600">
          {`We partnered with ElevateBranding to help us build our brand online, and I couldn’t be more impressed with the results. From a visually stunning website to highly effective social media ads, they handled everything. We’ve seen a noticeable increase in membership sign-ups, and the automated lead generation system they built for us has saved us hours of manual work. Their team really understands the fitness industry and how to engage potential customers.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">18 Aug</p>
        </div>

        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
          <Image src="/p6.jpg" width={100} height={100} alt="User" className="rounded-full  object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Emma Williams</h3>
          <p className="text-center text-sm text-gray-500">Head of Marketing, Serenity Spa, UK</p>
          <p className="text-center mt-4 text-gray-600">
            {`Before working with ElevateBranding, we had no clear online strategy. Their team helped us with everything—from designing a website that reflects the luxury of our spa to running targeted Instagram and Google Ads. Within three months, our bookings doubled, and the brand awareness they've helped us build is incredible. We now have a steady flow of new clients and a beautifully designed website that continues to convert.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">13 Aug</p>
        </div>


        <div className="snap-center border flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6">
          <Image src="/p7.jpg" width={100} height={100} alt="User" className="rounded-full  object-cover w-16 h-16 mx-auto" />
          <h3 className="mt-4 text-center text-lg font-semibold">Tan Wei Ling</h3>
          <p className="text-center text-sm text-gray-500">Operations Manager, EcoTech Solutions, Malaysia</p>
          <p className="text-center mt-4 text-gray-600">
            {`The team at ElevateBranding did a fantastic job with our online marketing campaigns. They took the time to understand our company’s goals and tailored a strategy that worked for us. They ran successful LinkedIn ads targeting key decision-makers in the tech space, and as a result, we’ve secured several high-profile B2B clients. Their combination of website design and ad expertise is top-notch, and I recommend them to anyone looking to grow their business.`}
          </p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-yellow-500">5.0</span>
            <span className="ml-2 text-yellow-500">★★★★★</span>
          </div>
          <p className="text-center mt-2 text-sm">8 Aug</p>
        </div>

        {/* Add more cards as needed */}
      </div>

      {/* Right Scroll Button */}
      <div
                    // onClick={scrollRight}
  
                    className=" cursor-pointer lg:flex hidden"
                  >
                    <svg
                      // onMouseDown={rightscroll}
                      // onMouseUp={stopScroll}
                      // onMouseLeave={stopScroll}
  
                      onMouseDown={() => scrollHorizontally("right")}
                      onMouseUp={stopScroll}
                      onMouseLeave={stopScroll}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-10 select-none  bg-[#E30B5C] p-2 rounded-full text-white h-10"
  
                      // tabIndex={0} // Add
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
    </div>
  </div>
</div>

   {/* REVIEW SECTION  */}


 


 {/* MENTORS  */}

 <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h3 className="text-[#f26342] font-semibold text-lg mb-2">Course Mentors</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Meet Our Expert Instructors
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Learn from the best in the industry! Our team of experienced and certified aesthetic professionals brings years of expertise in clinical cosmetology, injectables, skin treatments, and advanced beauty techniques. With their hands-on approach and personalized guidance, you’ll gain the knowledge and confidence to excel in your aesthetic career.
        </p>

        {/* Mentor Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Mentor 1 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor1.jpeg"
              alt="Dr. Muhammadh Muzammil"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Dr. Muhammadh Muzammil</h3>
            <p className="text-sm text-gray-500 mb-2">Aesthetics Physician And Cosmetologist</p>
          </div>

          {/* Mentor 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor2.png"
              alt="MS. Shakila Gunaratne"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">MS. Shakila Gunaratne</h3>
            <p className="text-sm text-gray-500 mb-2">Aesthetics Practitioner</p>
          </div>

          {/* Mentor 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor3.png"
              alt="Dr. Dinuhaka Costa"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Dr. Dinuhaka Costa</h3>
            <p className="text-sm text-gray-500 mb-2">Aesthetics Practitioner</p>
          </div>

          {/* Mentor 4 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor4.png"
              alt="Dr. Isuru Ekanayake"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Dr. Isuru Ekanayake (MBBS)</h3>
            <p className="text-sm text-gray-500 mb-2">
              Lecturer in Anatomy and Physiology | Cosmetic Physician
            </p>
          </div>
        </div>
      </div>
    </section>


 {/* MENTORS  */}







   <div ref={contactussection} className=" w-full mt-10 flex justify-center">
     


     <div className=" max-w-7xl w-full p-4">


       <div className=' w-full   lg:mt-5 mt-3  md:p-4 p-2  flex flex-col'> 


  
        

        <div className=' flex flex-col gap-1'> 

      

        <h1 className=' text-2xl md:text-4xl font-poppinssemi text-center'> Contact our friendly team </h1>
        <p className=' font-poppinsreg text-slate-400 text-center'> Let us know how we can help</p>
        </div>


        <div className=' flex justify-center'>

            <div className=' grid lg:grid-cols-4 md:grid-cols-2 mt-5 gap-4 grid-cols-1 '>
                 

                 <div className=' border flex flex-col  items-center p-2'>

                    <Image src="/whatsapp.png" alt='' width={500} height={500} className=' w-36    object-cover'/>

                  
                  <div className="  mt-3 ">

        
                    <h1 className=' font-poppinsreg5 text-center text-slate-700'> Quick Chat on Whatsapp </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Message our team anytime </p>
                     
                     <h1 className=' text-center'>
                     <a href="https://wa.me/966553532798" target="_blank" className='  underline text-xs  font-poppinsreg  mt-2'>Continue to chat</a>
                     </h1>
                     </div>
                 </div>

                 <div className=' border flex flex-col  items-center  p-2'>

<Image src="/email.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
 
 <div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Email Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Send us a quick message </p>

                     <h1 className=' text-center'>
                     <a href="mailto:elevatebranding8@gmail.com"  className='  underline text-xs  font-poppinsreg  mt-2'>Continue to mail</a>
                     </h1>

                     </div>

</div>


<div className=' border  flex flex-col  items-center p-2'>

<Image src="/call.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
<div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Call Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Speak with us directly </p>
                   
                     <h1 className=' text-center'>
                     <a href="tel:+966553532798"  className='  underline text-xs  font-poppinsreg  mt-2'>Call us now</a>
                     </h1>
                     </div>


</div>


<div className=' border  flex flex-col  items-center     p-2'>

<Image src="/office.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
 
 <div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Visit Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Come see us in person </p>

                     <h1 className=' text-center'>
                     <a href="https://www.google.com/maps?q=24.609396,46.7343491" target="_blank" className='  underline text-xs  font-poppinsreg  mt-2'>See location</a>
                     </h1>
                    
                     </div>

</div>


                </div> 

        </div>
   

  

    </div> 

     </div>


   </div>
 





 {/* FOOTER FOOTER  */}
 <div className="bg-[#141414] mt-20 pt-10 pb-8 flex  flex-col justify-center items-center w-full ">
      <div className=" max-w-7xl   flex lg:flex-row  lg:gap-0 gap-8 flex-col lg:justify-between  lg:px-10 px-2 lg:p-2 h-full w-full">
        <div className=" flex  justify-center  flex-col gap-1">
        
          <Image alt='' src={'/logomain.png'} className=' w-36 h-fit object-cover' width={1000} height={1000} />
        </div>

        <div className=" flex flex-col gap-2">
          <h1 className={`  font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
       Contact Us
          </h1>
          <div
            className={` font-poppinsreg max-w-xs mt-1  lg:text-base text-sm flex flex-col gap-5 text-white `}
          >
            {/* onClick={() => setAboutUsCRT(true) } */}
            <h1  className=" cursor-pointer text-sm"> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 inline-block align-middle">
  <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
</svg>
 </span> Wadi Miyah, Riyadh, Saudi Arabia  </h1>
            {/* <h1> Explore Countries </h1>
            <h1> Our Role </h1>
            <h1> Partner Program </h1> */}
            <h1 className=" cursor-pointer text-sm" > <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 inline-block align-middle">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>
 </span> elevatebranding8@gmail.com  </h1>
            <h1   className=" cursor-pointer"> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 align-middle inline-block">
  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
</svg>

 </span> +966 55 353 2798 </h1>
            
          </div>
        </div>
        {/* <div className=" flex flex-col gap-2">
          <h1 className={`  font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
            Get in touch
          </h1>
          <div
            className={`  font-poppinsreg lg:text-base text-sm flex flex-col gap-1  text-white `}
          >
            <h1> Contact </h1>
            <h1> Press </h1>
            <h1> Knowledge Center </h1>
            <h1> Guidelines </h1>
          
          </div>
        </div> */}
        <div className=" flex flex-col gap-2">
          <h1 className={` font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
            Follow Us
          </h1>
          <div
            className={`  font-poppinsreg mt-1 lg:text-base text-sm flex flex-col gap-1  text-white `}
          >
            <h1 className=""> Facebook </h1>
             <a href="https://www.instagram.com/_elevateyourbrand_?igsh=MXNscWloNWlqMTVtOQ%3D%3D&utm_source=qr"> <h1 className=""> Instagram </h1> </a> 
            <h1 className=""> Twitter </h1>
            <h1 className=""> TikTok </h1>
            {/* <h1> FAQs </h1> */}
          </div>
        </div>
      </div>

      <div className=" border-b w-full border-white border-opacity-10 mt-4 ">
        {" "}
      </div>

      <div className=" max-w-7xl text-white px-2 lg:px-10 gap-6 mt-2 flex md:flex-row flex-col w-full  justify-center">
        {/* <div
          className={`  font-poppinsreg lg:text-base text-sm  flex    gap-2 `}
        >
          <h1> Privacy Policy </h1>
          <h1> Term & Condition </h1>
        </div> */}
        <h1 className={` font-poppinsreg mt-3 lg:text-base text-sm`}>
          {" "}
          &copy; 2024 ElevateBranding. All Rights Reserved.{" "}
        </h1>
      </div>
    </div>
 {/* FOOTER FOOTER  */}


    



    </div>
   
  );
}
