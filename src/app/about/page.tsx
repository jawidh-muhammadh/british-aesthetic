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
  
  
  
    const [clickedTab, setclickedTab] = useState("about") 
  
  
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
              <h1  onClick={() => router.push('/courses')}  className=" cursor-pointer text-[#E0E0E0]  "  >Courses </h1>
              <h1  onClick={() => router.push('/about')}  className=" underline decoraton-2 underline-offset-4 decoration-[#4482FF] cursor-pointer text-[#E0E0E0]  "  >About Us </h1>
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

  
 

 {/* ABOUT US  */}
 <div className="max-w-5xl mx-auto px-6 py-12 text-center">
  <h2 className="lg:text-4xl text-3xl   font-robotobold text-white mb-6 ">About Us</h2>
  <p className="text-lg  text-white font-poppinsreg mb-6">
    {`British Academy of Aesthetics is a CPD approved aesthetics Medicine and cosmetology training provider 
    registered in the United Kingdom, and we are proudly announcing that we conduct aesthetic training 
    courses in Sri Lanka as well.`}
  </p>
  <p className="text-lg text-white font-poppinsreg mb-6">
    {`Our training academy offers aesthetics and cosmetic training for total beginners and medical professionals 
    to gain knowledge, experience, and enhance the skills with CPD accredited certificate. We are affiliated 
    with cosmetology and aesthetics training academies in the United Kingdom, India, and Thailand to deliver 
    the best knowledge for our participants.`}
  </p>
  <p className="text-lg text-white font-poppinsreg">
    {`All our courses are carefully designed to deliver the newest techniques and technologies in the industry, 
    and we will help you gain the knowledge and experience you need within the industry to pave your way to a 
    successful career.`}
  </p>
</div>

 {/* ABOUT US  */}



 {/* CORRECT SECOND SECTION  */}

 <section className="bg-whitee bg-[#0A0A1D] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h3 className="text-[#f26342]  font-robotobold text-lg mb-2">Course Mentors</h3>
        <h2 className="text-4xl  text-white font-poppinssemi text-gray900 mb-6">
          Meet Our Expert Instructors
        </h2>
        <p className="text-gray600 text-slate-200 text-lg  font-poppinsreg mb-12">
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
            <h3 className="text-xl font-semibold text-white">Dr. Muhammadh Muzammil</h3>
            <p className="text-sm text-gray500  text-slate-200 mb-2">Aesthetics Physician And Cosmetologist</p>
          </div>

          {/* Mentor 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor2.png"
              alt="MS. Shakila Gunaratne"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold  text-white">MS. Shakila Gunaratne</h3>
            <p className="text-sm text-gray500 mb-2  text-slate-200">Aesthetics Practitioner</p>
          </div>

          {/* Mentor 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor3.png"
              alt="Dr. Dinuhaka Costa"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-white">Dr. Dinuhaka Costa</h3>
            <p className="text-sm text-gray500 mb-2 text-slate-200">Aesthetics Practitioner</p>
          </div>

          {/* Mentor 4 */}
          <div className="flex flex-col items-center">
            <img
              src="/mentor4.png"
              alt="Dr. Isuru Ekanayake"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-white">Dr. Isuru Ekanayake (MBBS)</h3>
            <p className="text-sm text-gray500 text-slate-200 mb-2">
              Lecturer in Anatomy and Physiology | Cosmetic Physician
            </p>
          </div>
        </div>
      </div>
    </section>


 {/* MENTORS  */}




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
        <div className="fixed bottom-7 right-7 2xl:hidden     animate-drip-expand z-50">
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