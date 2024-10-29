'use client'

import React, { FC, useEffect, useRef, useState } from "react";
// import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import styles from "../landing/styles/Landing.module.css";
import Bookmark from "../../public/landing/bookmark.svg";
import landing_one from '../../public/landing/landing_one.svg';
import triangle from '../../public/landing/triangle.svg';
import black_bg from '../../public/landing/bg_black.jpg';
import pin from "../../public/landing/pin.svg";
import group from "../../public/landing/group.png";
import paper from '../../public/landing/papers.svg';
import ripped_paper from '../../public/landing/ripped_paper.png';
import paper_clip from '../../public/landing/paper_clip.svg';
import instagram from '../../public/landing/instagram.svg'
import linkedin from '../../public/landing/linkedin.svg'
import paper_bg from '../../public/landing/paper_2_bg.jpg'
import seal from '../../public/landing/wax_seal.svg'

const Landing: FC = () => {
    const [coverOpen, setCoverOpen] = useState(false);
    const [page1Open, setPage1Open] = useState(false);
    const [page2Open, setPage2Open] = useState(false);
    const [page3Open, setPage3Open] = useState(false);
    const [zIndexPriority, setZIndexPriority] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    // const isMediumScreen = useMediaQuery({ minWidth: 426, maxWidth: 1023 });

    const bookmarkControls = useAnimation();
    const sealControls = useAnimation();
    const controls = useAnimation();
    const landingImageControls = useAnimation();
    const triangleControls = useAnimation();
    const sloganControls = useAnimation();
    const studyHookControls = useAnimation();
    const typewriterControls = useAnimation();

    const pageTurnAudioRef = useRef<HTMLAudioElement | null>(null);

    const playPageTurnSound = () => {
        if (pageTurnAudioRef.current) {
            pageTurnAudioRef.current.currentTime = 0; 
            pageTurnAudioRef.current.play().catch((error) => {
                console.error("Audio playback error:", error);
            });
        }
    };

    useEffect(() => {
        if (isMounted) {  
            playPageTurnSound();
        }
    }, [coverOpen, page1Open, page2Open, page3Open]);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    useEffect(() => {
        if (coverOpen) {
            typewriterControls.start("visible");
        }
        if (page1Open) {
            typewriterControls.start("visible");
        }
        if (page2Open) {
            typewriterControls.start("visible");
        }
    }, [coverOpen, typewriterControls, page1Open, page2Open]);

    useEffect(() => {
        const timer = setTimeout(() => {
            controls.start("visible");
            landingImageControls.start({ opacity: 1, transition: { delay: 0.5, duration: 1 } });
            triangleControls.start({ opacity: 1, transition: { delay: 0.7, duration: 1 } });
            sloganControls.start({ opacity: 1, transition: { delay: 1, duration: 1 } });
            studyHookControls.start({ opacity: 1, transition: { delay: 1, duration: 1 } });
        }, 1000);

        return () => clearTimeout(timer);
    }, [controls, landingImageControls, triangleControls, sloganControls, studyHookControls]);

    const pageFlipDuration = 0.6;

    const animateFlipSequence = async (flipHandler: () => void) => {
        await bookmarkControls.start({
            x: 160,
            zIndex: 20,
            transition: { duration: 0.35 },
        });

        flipHandler();

        await new Promise(resolve => setTimeout(resolve, pageFlipDuration * 1800));

        await bookmarkControls.start({
            x: 0,
            zIndex: 20,
            transition: { duration: 0.35 },
        });
    };

    const handleCoverClick = () => {

        if (coverOpen && (page1Open || page2Open || page3Open)) {
            return;
        }
        if (!coverOpen) {
            sealControls.start({ opacity: 0, transition: { delay: 0.2, duration: 1 } });
            landingImageControls.start({ opacity: 0, transition: { delay: 0.2, duration: 1 } });
            triangleControls.start({ opacity: 0, transition: { delay: 0.2, duration: 1 } });
            sloganControls.start({ opacity: 0, transition: { delay: 0.2, duration: 1 } });
            studyHookControls.start({ opacity: 0, transition: { delay: 0.2, duration: 1 } });
        } else {
            sealControls.start({ opacity: 1, transition: { delay: 0.9, duration: 1 } });
            landingImageControls.start({ opacity: 1, transition: { delay: 0.9, duration: 1 } });
            triangleControls.start({ opacity: 1, transition: { delay: 0.9, duration: 1 } });
            sloganControls.start({ opacity: 1, transition: { delay: 0.9, duration: 1 } });
            studyHookControls.start({ opacity: 1, transition: { delay: 0.9, duration: 1 } });
        }

        animateFlipSequence(() => {
            setCoverOpen(!coverOpen);
            setZIndexPriority(null);
        });
    };

    const typewriterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.5,
                duration: 0.6,
                ease: "easeInOut",
            },
        }),
    };

    const handleFlipPage = (pageSetter: React.Dispatch<React.SetStateAction<boolean>>, pageId: string) => {
        animateFlipSequence(() => {
            pageSetter(prev => !prev);
            setZIndexPriority(pageId);
        });
    };

    //TODO
    // if (isMediumScreen) {
    //     return <h1 className="text-center text-xl font-semibold mt-10">Use bigger Screen</h1>;
    // }

    return (
        <>
            <audio ref={pageTurnAudioRef} src="/landing/audio/pageTurn.mp3" preload="auto" />

            <div className={
                `${styles.container}`
            }>
                <div className={
                    `${styles.book} 
                        ${coverOpen ? styles.openCover : ""} 
                        ${coverOpen ? styles.slideRight : ""} 
                        h-[70%] md:w-[70%] md:h-[80%] lg:h-[85%] lg:w-[52%] xl:h-[85%] w-[85%] xl:w-[40%] `
                }>

                    {/* Front cover */}
                    <div
                        className={
                            `absolute inset-0 
                                ${styles.cover}
                                ${coverOpen ? styles.flipped : ""} 
                                ${coverOpen ? styles.slideLeft : ""}
                                flex flex-col h-full w-full rounded-r-2xl transition-transform duration-1000 z-10 cursor-pointer shadow-lg shadow-white`
                        }
                        onClick={handleCoverClick}

                        style={{
                            backgroundImage: `url(${paper_bg.src})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            zIndex: 10
                        }}>

                        <motion.div className="h-1/4 w-full flex items-end justify-center md:text-5xl xl:text-7xl text-3xl font-bold font-serif tracking-wide overflow-hidden whitespace-nowrap"
                            style={{
                                backgroundImage: `url(${black_bg.src})`,
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            initial={{ opacity: 0 }}
                            animate={studyHookControls}
                        >
                            StudyHook

                            <motion.div
                                className="absolute top-[-7px]  xl:top-[-7px] right-8 xl:right-16 z-20 transform "
                                animate={bookmarkControls}
                                initial={{ rotateX: 0 }}
                            >
                                <Image
                                    src={Bookmark}
                                    alt="bookmark"
                                    className="xl:w-20 xl:h-24 w-14 h-14"
                                    style={{
                                        filter: 'drop-shadow(0px 12px 12px rgba(0, 0, 0, 0.5))',
                                    }}
                                />

                            </motion.div>
                        </motion.div>

                        <motion.div className="h-1/4 w-full  flex justify-end items-end  mx-2 md:px-4 xl:px-4 sm:text-lg 
                         xl:text-2xl pb-8 xl:pb-4 text-[#8B5E3C] italic text-center"
                            animate={sloganControls}
                            initial={{ opacity: 0 }}
                        >
                            <div className=" relative">
                                <div className="absolute -top-3 xl:-top-2 w-full flex justify-center  ">
                                    <Image
                                        src={pin}
                                        alt="pin"
                                        width={36}
                                        height={36}
                                        style={{
                                            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))',
                                        }}
                                    />
                                </div>
                                <div className="bg-[#f5f1e1]/70 py-2 mx-2 px-1 md:px-4 xl:px-2 xl:text-xl rounded-md shadow-lg border-t-2 border-b-2 border-[#8B5E3C] shadow-amber-950 ">
                                    Where Knowledge Meets Collaboration
                                </div>

                            </div>
                        </motion.div>


                        <motion.div className="h-1/4 w-full  cursor-pointer flex items-center justify-end pr-6"
                            animate={triangleControls}
                            initial={{ opacity: 0 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 1.2,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src={triangle}
                                alt="triangle"
                                className="w-8 h-8"
                            />
                        </motion.div>

                        <motion.div className="h-2/4 w-full  flex justify-between items-end"
                            animate={landingImageControls}
                            initial={{ opacity: 0 }}
                        >

                            <Image
                                src={landing_one}
                                alt="mainImage"
                                width={500}
                                height={500}
                                className="-mr-14 w-[70%] h-full xl:w-[60%]  "
                            />

                            <motion.div
                                className=" h-full flex items-end"
                                animate={sealControls}
                                initial={{ opacity: 1 }}
                                style={{ zIndex: 9 }}
                            >
                                <Image
                                    src={seal}
                                    alt="seal"
                                    width={80}
                                    height={80}
                                    className="w-14 h-14 xl:w-20 xl:h-20"

                                />
                            </motion.div>
                        </motion.div>
                    </div>




                    {/* Page 1 - Study Groups */}
                    {/* Front Side of Page */}

                    <div
                        className={`${styles.page} ${page1Open ? styles.flipped : ""} ${styles.flexContainer} `}
                        onClick={() => handleFlipPage(setPage1Open, "page1")}
                        style={{
                            zIndex: zIndexPriority === "page1" ? 15 : page1Open ? 11 : 3,
                            border: "2px solid #8B5E3C",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >

                        <div className="w-full h-full "
                            style={{
                                backfaceVisibility: "hidden"
                            }}>
                            <div className="h-2/5 w-full flex justify-center items-start ">
                                <div className="w-full h-full ">
                                    <Image
                                        src={group}
                                        alt="Group Image"
                                        className={`${styles.start_xl}   relative `}
                                        style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                </div>

                            </div>
                            <div className="h-3/5 w-full  overflow-auto pb-10 ">
                                <motion.div
                                    initial="hidden"
                                    animate={coverOpen ? "visible" : "hidden"}
                                    variants={typewriterVariants}
                                    className="text-[#4a3c2f] text-lg overflow-y-auto font-serif p-4 bg-[#fdf4e3] rounded-lg border-2 border-[#8B5E3C] shadow-md shadow-amber-900 text-start "
                                >
                                    <motion.h2
                                        className="text-2xl font-bold mb-4 text-center"
                                        variants={typewriterVariants}
                                        custom={0}
                                    >
                                        StudyHook Features
                                    </motion.h2>

                                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                                        {[
                                            "Form Study Groups: Connect with classmates to create study groups for focused academic collaboration.",
                                            "Share Notes Seamlessly: Exchange notes within your groups, ensuring everyone has access to valuable insights and materials.",
                                            "Group Assignments: Collaborate on assignments by sharing resources and ideas, making group projects more manageable and productive.",
                                            "Organized Archive: Keep a structured archive of shared resources, notes, and discussions, accessible anytime for future reference.",
                                            "Enhanced Learning: Benefit from group-based learning and collaborative efforts, enhancing understanding and retention of academic material.",
                                        ].map((text, index) => (
                                            <motion.li
                                                key={index}
                                                className="font-serif"
                                                variants={typewriterVariants}
                                                custom={index + 1}
                                            >
                                                <span className="font-semibold">{text.split(":")[0]}:</span>{" "}
                                                {text.split(":")[1]}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </div>



                    {/* Page 2 - Study Groups
                    {/* Front Side of Page */}

                    <div
                        className={`${styles.page} ${page2Open ? styles.flipped : ""} ${styles.flexContainer} `}
                        onClick={() => handleFlipPage(setPage2Open, "page2")}
                        style={{
                            zIndex: zIndexPriority === "page2" ? 14 : page2Open ? 11 : 2,
                            border: "2px solid #8B5E3C",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >

                        <div className="w-full h-full"
                            style={{
                                backfaceVisibility: "hidden"
                            }}>
                            <div className={`${styles.next_start_xl} h-2/5 w-full `}>
                                <div className=" w-full h-full ">
                                    <Image
                                        src={paper}
                                        alt="Group Image"
                                        width={600}
                                        height={600}
                                        className={`${styles.start_xl}   relative `}
                                        style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                            <div className="h-3/5 w-full  overflow-auto pb-10 ">
                                <motion.div
                                    initial="hidden"
                                    animate={page1Open ? "visible" : "hidden"}
                                    variants={typewriterVariants}
                                    className="text-[#4a3c2f] text-lg overflow-y-auto font-serif p-4 bg-[#fdf4e3] rounded-lg border-2 border-[#8B5E3C] shadow-md shadow-amber-900 text-start "
                                >
                                    <motion.h2
                                        className="text-2xl font-bold mb-4 text-center"
                                        variants={typewriterVariants}
                                        custom={0}
                                    >
                                        StudyHook Features
                                    </motion.h2>

                                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                                        {[
                                            "Form Study Groups: Connect with classmates to create study groups for focused academic collaboration.",
                                            "Share Notes Seamlessly: Exchange notes within your groups, ensuring everyone has access to valuable insights and materials.",
                                            "Group Assignments: Collaborate on assignments by sharing resources and ideas, making group projects more manageable and productive.",
                                            "Organized Archive: Keep a structured archive of shared resources, notes, and discussions, accessible anytime for future reference.",
                                            "Enhanced Learning: Benefit from group-based learning and collaborative efforts, enhancing understanding and retention of academic material.",
                                        ].map((text, index) => (
                                            <motion.li
                                                key={index}
                                                className="font-serif"
                                                variants={typewriterVariants}
                                                custom={index + 1}
                                            >
                                                <span className="font-semibold">{text.split(":")[0]}:</span>{" "}
                                                {text.split(":")[1]}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>

                    </div>




                    {/* Page 3 - Study Groups */}
                    {/* Front Side of Page */}

                    <div
                        className={`${styles.page} ${page3Open ? styles.flipped : ""} ${styles.flexContainer} `}
                        onClick={() => handleFlipPage(setPage3Open, "page3")}
                        style={{
                            zIndex: zIndexPriority === "page3" ? 13 : page3Open ? 11 : 1,
                            border: "2px solid #8B5E3C",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >

                        <div className="w-full h-full"
                            style={{
                                backfaceVisibility: "hidden"
                            }}>
                            <div className={`${styles.next_start_xl} h-2/5 w-full `}>
                                <div className="w-full h-full ">
                                    <Image
                                        src={paper}
                                        alt="Group Image"
                                        className={`${styles.start_xl} 
                                            relative `}
                                        style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                            <div className="h-3/5 w-full  overflow-auto pb-10 ">
                                <motion.div
                                    initial="hidden"
                                    animate={page2Open ? "visible" : "hidden"}
                                    variants={typewriterVariants}
                                    className="text-[#4a3c2f] text-lg overflow-y-auto font-serif p-4 bg-[#fdf4e3] rounded-lg border-2 border-[#8B5E3C] shadow-md shadow-amber-900 text-start "
                                >
                                    <motion.h2
                                        className="text-2xl font-bold mb-4 text-center"
                                        variants={typewriterVariants}
                                        custom={0}
                                    >
                                        StudyHook Features
                                    </motion.h2>

                                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                                        {[
                                            "Form Study Groups: Connect with classmates to create study groups for focused academic collaboration.",
                                            "Share Notes Seamlessly: Exchange notes within your groups, ensuring everyone has access to valuable insights and materials.",
                                            "Group Assignments: Collaborate on assignments by sharing resources and ideas, making group projects more manageable and productive.",
                                            "Organized Archive: Keep a structured archive of shared resources, notes, and discussions, accessible anytime for future reference.",
                                            "Enhanced Learning: Benefit from group-based learning and collaborative efforts, enhancing understanding and retention of academic material.",
                                        ].map((text, index) => (
                                            <motion.li
                                                key={index}
                                                className="font-serif"
                                                variants={typewriterVariants}
                                                custom={index + 1}
                                            >
                                                <span className="font-semibold">{text.split(":")[0]}:</span>{" "}
                                                {text.split(":")[1]}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>


                        {/* Back Side of Page */}
                        <div className={`${styles.backPage}`}>
                        </div>
                    </div>



                    {/* backcover */}
                    <div className={`${styles.backCover} z-0`}>
                        <div
                            className={`w-full h-full  text-white cursor-pointer`}
                            style={{
                                backgroundImage: `url(${paper_bg.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="w-full h-1/3 shadow-md shadow-b-amber-800 pt-4">
                                <div className="relative">
                                    {/* Paper clip image */}
                                    <div className="absolute -top-16 left-4 sm:left-10 z-10">
                                        <Image
                                            src={paper_clip}
                                            width={100}
                                            height={190}
                                            alt="paper_clip"
                                            className=" h-20 w-20 xl:h-24 xl:w-24"
                                        />
                                    </div>

                                    {/* Text container centered over ripped paper */}
                                    {/* <div
                                        className="absolute inset-0 flex justify-between items-center px-4 sm:px-10 md:px-14 h-full z-20"
                                        style={{ top: "50%", transform: "translateY(-50%)" }}
                                    >
                                        <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-black">
                                            About Us
                                        </h1>
                                        <div className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-black px-6">
                                            <div className="flex justify-between items-center space-x-4  w-full">
                                                <Image
                                                    src={linkedin}
                                                    alt="linkedin"
                                                    className="w-6 h-6 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                                                />
                                                <Image
                                                    src={instagram}
                                                    alt="instagram"
                                                    className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                                                />
                                            </div>
                                        </div>
                                    </div> */}


                                    <motion.div
                                        className="absolute inset-0 flex justify-between items-center px-4 sm:px-10 md:px-14 h-full z-20"
                                        style={{ top: "-10%", transform: "translateY(10%)" }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={page3Open ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-black">
                                            About Us
                                        </h1>
                                        <div className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-black px-6">
                                            <div className="flex justify-between items-center space-x-4 w-full">
                                                <Image
                                                    src={linkedin}
                                                    alt="linkedin"
                                                    className="w-6 h-6 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                                                />
                                                <Image
                                                    src={instagram}
                                                    alt="instagram"
                                                    className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Ripped paper image */}
                                    <Image
                                        src={ripped_paper}
                                        width={900}
                                        height={900}
                                        alt="ripped_paper"
                                        className="w-full px-2 relative z-5"
                                    />
                                </div>
                            </div>



                            <motion.div
                                className="w-full h-2/3 "
                                initial={{ opacity: 0, y: 20 }}
                                animate={page3Open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className="flex flex-col items-center justify-center h-full p-4 space-y-4 rounded-lg shadow-lg">
                                    {/* Description */}
                                    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed text-center max-w-md">
                                        StudyHook is your go-to platform for creating study groups, collaborating on assignments, sharing notes,
                                        and accessing a community dedicated to enhancing your learning experience. Join or create a group,
                                        and collaborate with classmates in an organized, structured way.
                                    </p>

                                    {/* Sign Up Button */}
                                    <a
                                        href="/signup" // Update this URL as needed
                                        className="inline-block px-6 py-2 bg-[#8B5E3C] text-white font-medium rounded-md shadow-md hover:bg-[#6b4730] transition duration-200"
                                    >
                                        Sign Up Now
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>


                </div>
            </div >
        </>
    );
};

export default Landing;