'use client'
import { app } from '@/utils/firebase';
import { Button, useDisclosure } from '@nextui-org/react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import {  Accordion, AccordionItem, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader  } from "@nextui-org/react";
import { motion } from 'framer-motion';
const Page = () => {
 
 

    const db = getFirestore(app);

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    
    const [email, setEmail] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
  
  
    const [phoneNumber, setPhoneNumber] = useState("+94");
  
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
    
      // Ensure the value always starts with +94 and allow only 9 additional characters
      if (inputValue.startsWith("+94")) {
        // Extract the part of the number after +94
        const numberAfterPrefix = inputValue.slice(3);
    
        // Only allow 9 characters after the +94
        if (numberAfterPrefix.length <= 9) {
          setPhoneNumber(inputValue);
        }
      } else {
        // If user tries to remove +94, enforce it back
        setPhoneNumber("+94");
      }
    };
  
  
  
    const [error, setError] = useState("");
  
    const [success, setsuccess] = useState(false)
  
    const [selectedCourse, setselectedCourse] = useState("")
  
    const [loading, setloading] = useState(false)
  
    const handleSubmit = async () => {
      // Error validation
      if (!email || !phoneNumber || phoneNumber === "+94") {
        setError("Please fill in all fields.");
        return;
      }
      try {
        setloading(true)
        // Add enrollment data to Firestore
        await addDoc(collection(db, "enrollment"), {
          email,
          phoneNumber,
          selectedCourse,
          createdAt: new Date(),
        });
        setError("");
        // Close the modal after submission
        onClose();
        setEmail("")
        setPhoneNumber("+94")
        setloading(false)
        setsuccess(true)
  
        setTimeout(() => {
          setsuccess(false)
        }, 2000);
        // alert("Enrollment successful!");
      } catch (error) {
        console.error("Error enrolling user: ", error);
        setError("An error occurred while submitting your enrollment.");
        setloading(false)
      }
    };
  
    // useEffect(() => {
    
    //   onOpen()
    // }, [])
    
  
  
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
  
  
    // const aboutUsSection = useRef<HTMLDivElement>(null);
    // const servicesWeOfferSection = useRef<HTMLDivElement>(null);
    // const portfolioSection = useRef<HTMLDivElement>(null);
    const testimonialsection = useRef<HTMLDivElement>(null);
    const faqsection = useRef<HTMLDivElement>(null);
    const coursesection = useRef<HTMLDivElement>(null);
    // const contactussection = useRef<HTMLDivElement>(null);
  
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
  
  
  
    const [clickedTab, setclickedTab] = useState("courses") 
  
  
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
      animateValue(setTrainees, 0, 50, 2000); // Trainees
      animateValue(setCourses, 0, 10, 2000);   // Courses
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




  return (
    <>
    <div className=" w-full   bg-[#2C2C2C]] bg-[#101010]] bg-[#0A0A1D] overflow-hidden flex flex-col items-center justify-center">

      <div className=" max-w-7xl bg-[#0A0A1D]  w-full">

        <div className=" w-full  2xl:h-fit  h-full flex flex-col p-4">
          

          {/* HEADER  */}

          <div className="  flex justify-between  flex-wrap items-center">

            {/* <Image src="/logotext.png" alt="" width={1000} height={1000} className=" w-36 flex    h-fit object-cover" />  */}
            {/* <Image src="/logobritish.png" alt="" width={1000} height={1000} className=" w-16 lg:flex hidden   h-fit object-cover" />  */}
            <Image src="/logoN.png" alt="" width={2000} height={2000} className=" w16 w-36 lg:flex hidden   h-fit object-cover" /> 
            {/* <Image src="/logomainblack.png" alt="" width={1000} height={1000} className=" w-28  flex lg:hidden   h-fit object-cover" />  */}

            <div className="  font-poppinsreg5 gap-14 lg:flex hidden items-center"> 
            {/* onClick={() => scrollToSection(servicesWeOfferSection)}  */}
              {/* <h1 onClick={() => scrollToSection(aboutUsSection)} className=" cursor-pointer" >About Us </h1> */}
              {/* <Link href="/services"> <h1    className=" cursor-pointer"  >Services & Pricings </h1> </Link> */}
              {/* <h1 onClick={() => scrollToSection(portfolioSection)}  className=" cursor-pointer"  > Our Works </h1> */}
              <h1  onClick={() => router.push('/')}  className=" cursor-pointer text-[#E0E0E0]  "  >Home </h1>
              <h1  onClick={() => router.push('/courses')}  className=" underline decoraton-2 underline-offset-4 decoration-[#4482FF] cursor-pointer text-[#E0E0E0]  "  >Courses </h1>
              <h1  onClick={() => router.push('/about')}  className=" cursor-pointer text-[#E0E0E0]  "  >About Us </h1>
              {/* <h1 onClick={() => scrollToSection(faqsection)}  className=" cursor-pointer text-[#E0E0E0]  "  >FAQs </h1> */}
              {/* <h1 onClick={() => scrollToSection(testimonialsection)}  className=" cursor-pointer text-[#E0E0E0]"  >Testimonials </h1> */}
             <Link href="/shop"> <h1  className=" cursor-pointer  bg-[#4482FF] hover:bg-[#4279e7] px-4 py-1 text-sm text-white rounded-full"  >SHOP </h1> </Link>
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
      <Image src="/logoN.png" alt="" width={2000} height={2000} className=" w-24    h-fit object-cover" /> 


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

 

 {/* CORRECT SECOND SECTION  */}

<div className=" bg-[#0A0A1D]   py-10">
      <div ref={coursesection} className=" max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course 1 */}
          <div className="bg-[#F9FCFF]] bg-[#2C2C2C] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
            //   src="/course.webp"
              src="/project.png"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px] text-white">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4 text-white">PREMIUM BOTOX INJECTABLE MASTERCOURSE</h3>
            <p className="text-gray500 mb-6  font-poppinsreg text-slate-200">Gain confidence in Botox facial mapping and practice advanced injection techniques before performing treatments.</p>
            <p className="text-blue600  text-[#FF6956] font-bold font-poppinsreg5 text-2xl mb-4">LKR 185,000</p>
            <Button onPress={() =>  {  setselectedCourse("PREMIUM BOTOX INJECTABLE MASTERCOURSE") ;  onOpen() } } className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>

          {/* Course 2 */}
          <div className="bg-[#F9FCFF]] bg-[#2C2C2C] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
            //   src="/course2.webp"
               src="/project.png"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px] text-white">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4 text-white">PREMIUM DERMAL FILLERS & SKIN BOOSTERS INJECTABLE MASTER COURSE</h3>
            <p className="text-gray500 text-slate-200  mb-6  font-poppinsreg">Gain proficiency in facial anatomy marking and refine your skills with hands-on practice of various injection techniques prior to treatment application</p>
            <p className="text-blue600 text-[#FF6956] font-bold font-poppinsreg5 text-2xl mb-4">LKR 195,000</p>
            <Button onPress={() =>  {  setselectedCourse("PREMIUM DERMAL FILLERS & SKIN BOOSTERS INJECTABLE MASTER COURSE") ;  onOpen() } } className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>


          {/* Course 3 */}
          <div className="bg-[#F9FCFF]] bg-[#2C2C2C] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
            //   src="/course3.png"
               src="/project.png"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px] text-white">  2 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4 text-white">ADVANCED FILLERS BOTOX AND THRED LIFITINGFOR NON SURGICAL 3-D FULL FACE RE-MODELLING</h3>
            <p className="text-gray500 text-slate-200 mb-6  font-poppinsreg ">Master the latest injection techniques, including thread lifts, to achieve comprehensive facial rejuvenation, neck lifting, and hair care enhancements</p>
            <p className="text-blue600 text-[#FF6956] font-bold font-poppinsreg5 text-2xl mb-4">LKR 150,000</p>
            <Button onPress={() =>  {  setselectedCourse("ADVANCED FILLERS BOTOX AND THRED LIFITINGFOR NON SURGICAL 3-D FULL FACE RE-MODELLING") ;  onOpen() } } className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>




          <div className="bg-[#F9FCFF]] bg-[#2C2C2C] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
            //   src="/course.jpg"
               src="/project.png"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px] text-white">  6 Days </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Trainer: Dr. M Muzammil </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4 text-white">CLINICAL COSMETOLOGY AND TRICHOLOGY COURSE</h3>
            <p className="text-gray500 mb-6  font-poppinsreg text-slate-200 ">{`Master advanced techniques in skin care, hair treatments, and cosmetic procedures, gaining expertise in clinical cosmetology and trichology for comprehensive beauty and wellness solutions`}</p>
            <p className="text-blue600  text-[#FF6956] font-bold font-poppinsreg5 text-2xl mb-4">LKR 260,000</p>
            <Button onPress={() =>  {  setselectedCourse("CLINICAL COSMETOLOGY AND TRICHOLOGY COURSE") ;  onOpen() } } className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>



          <div className="bg-[#F9FCFF]] bg-[#2C2C2C] p-4 border rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000}
            //   src="/course5.PNG"
               src="/project.png"
              alt="Botox"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="bg-[#FF6956] text-white  font-poppinsreg text-sm px-4 py-1 rounded-lg inline-block mb-2">COLOMBO</span>
            <div className="mb-4  font-poppinsreg text-sm flex  gap-x-2 gap-y-2 flex-wrap">
              <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>
 </span> <span className=" align-middle inline-block pl-[1px] text-white">  1 Day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 7 hours per day </span></p>

 <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5H9.75Z" clip-rule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white"> 3hrs theory & 4 hrs practical </span></p>
             


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
  <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Lunch & Refreshment </span></p>   

     <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">Trainer: MS. Shakila Gunarathne </span></p>    


         <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">CPD UK Certified   </span></p>    

          <p className="   text-slate-400"> <span  className="inline-block align-middle" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#4482FF]] text-white">
  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
</svg>

 </span> <span className=" align-middle inline-block pl-[1px] text-white">      Certificate Awarded     </span></p>        


   
        
            </div>
            <h3 className="text-xl  font-poppinssemi mb-4 text-white">1 DAY AESTHETIC TRAINING ON WORK SHOP ONLEMON BOTTLE FAT DISSOLVING , SKIN BOOSTERS WITH MICRONEEDLEING</h3>
            <p className="text-gray500  text-slate-200 mb-6  font-poppinsreg ">{`Gain hands-on experience in fat dissolving with Lemon Bottle and microneedling with skin boosters in this 1-day aesthetic workshop. Learn injection techniques and safety protocols while mastering microneedling procedures to rejuvenate skin and dissolve fat with precision`}</p>
            <p className="text-blue600 text-[#FF6956] font-bold font-poppinsreg5 text-2xl mb-4">LKR 260,000</p>
            <Button onPress={() =>  {  setselectedCourse("1 DAY AESTHETIC TRAINING ON WORK SHOP ONLEMON BOTTLE FAT DISSOLVING , SKIN BOOSTERS WITH MICRONEEDLEING") ;  onOpen() } } className="bg-[#4482FF] text-white px-6 py-2 rounded-lg ">
              Enroll Now
            </Button>
          </div>

        </div>
      </div>
    </div>


{/* CORRECT SECOND SECTION  */}


        </div> 
        </div>


        <Modal 
    isDismissable={false}
  backdrop="blur"
  isOpen={isOpen} 
  onOpenChange={onOpenChange}
  motionProps={{
    variants: {
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: "easeIn",
        },
      },
    }
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl  font-poppinssemi">Enroll in {selectedCourse}</h2>
          <p className="text-slate-400  font-poppinsreg text-sm">
            Secure your spot with just 25% of the course fees upfront. The remaining balance can be paid on or before the course start date.
          </p>
        </ModalHeader>
        <ModalBody className="">
          <p className="text-sm text-gray-600 mb-6   font-poppinsreg5 text-center">
            Fill in your details below to confirm your enrollment. We will reach out with further instructions and details about the course.
          </p>
          <div className="flex flex-col space-y-4">
            <Input
              variant="bordered"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="text-gray-700"
              fullWidth
            />
            <Input
              variant="bordered"
              placeholder="Phone Number (WhatsApp preferred)"
              value={phoneNumber}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              onChange={handlePhoneNumberChange}
              type="tel"
              required
              className="text-gray-700"
              fullWidth
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </ModalBody>
        <ModalFooter className="mt-6 flex justify-center">
          <Button
            color="danger"
            variant="light"
          
            className="mr-2 hover:bg-red-100"
            onPress={ () => { onClose() ; setEmail("") ; setPhoneNumber("+94")}  }
          >
            Close
          </Button>
          <Button
          isLoading={loading}
            color="primary"
        
            className=" bg-[#4482FF]"
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>



{success && (
        <div
          className="min-w-screen h-screen animated fadeIn faster   fixed  left-0 top-0 flex justify-center items-center inset-0 z-[200] outline-none focus:outline-none bg-no-repeat "
          // style={{
          //   backgroundImage:
          //     "url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80)",
          // }}
          id="modal-id"
        >
          <div className="absolute bg-black   opacity-60 inset-0 z-0" />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ delay: 0.15 }}
            className="lg:w-full  lg:max-w-md p-5 relative lg:mx-auto mx-6 my-auto rounded-xl shadow-lg  bg-white "
          >
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-green-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg> */}

                <svg
              
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-24 h-24 flex items-center text-green-500 mx-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <h2 className="text-xl  font-poppinsreg5 py-4 ">
                Enrollment Submitted Successfully!
                </h2>
                {/* <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this product ? This process
                  cannot be undone
                </p> */}
              </div>
              {/*footer*/}
            </div>
          </motion.div>
        </div>
      )}




   {/* whatsapp icon  */}
   <div className="fixed bottom-7 right-7     animate-drip-expand z-50">
      <a
        href="https://wa.me/1234567890" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/whatsapp-icon.png" // Replace with your WhatsApp icon image path
          alt="WhatsApp Icon"
          width={60}
          height={60}
          className="hover:scale-110  transition-transform"
        />
      </a>
    </div>
      {/* whatsapp icon  */}



        </>
  )
}

export default Page