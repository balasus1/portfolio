import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h3 className={styles.sectionHeadText}>Summary</h3>
      </motion.div>
      <div className="flex flex-col items-center">
            <p className="text-lg font-mono text-green-400 mb-4">
                In the day I'm Anderson, your regular programmer diving into the code, 
                crafting solutions and navigating the digital landscape with precision. 
                But as the night descends, I transform into a digital Neo faced with the eternal choice of the&nbsp; 
                    <span className="rounded-full text-xs font-bold text-white bg-blue-500 py-1 px-2 w-14 ">blue pill</span>&nbsp;
                or the &nbsp; 
                <span className="rounded-full text-xs font-bold text-white bg-red-500 py-1 px-2 w-14">red pill</span>.
                Embracing the blue pill, I delve into familiar territories refining my craft and honing my skills. 
                Opting for the red pill, I embark on a journey of discovery, exploring niche technologies and wielding cutting-edge tools 
                with the curiosity and determination of a true digital explorer. 
                By day and by night, I embrace the duality of my role seamlessly blending the art of programming with the thrill of 
                endless exploration, always striving to push the boundaries of what's possible in the digital realm.
            </p>
        </div>  
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >     
<div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
    <div className="w-full">
        <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-gradient-to-r from-purple-100 to-pink-600 border-2 border-purple-500 rounded-lg">
                        <div className="flex items-center -mt-1">
                            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block mb-12">
                                 <span className="relative text-white">Backend Development</span>
                            </span>
                        </div>
                        <p className="mb-2 text-gray-700">
                        <div className="flex flex-wrap gap-2">
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Java</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">J2EE</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Apache Spark</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Ambari</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">BigData-Hadoop</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Scala</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Oozie</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">HBase</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Hive</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">Hibernate</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">JPA</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm">pl/sql</a>
                            
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">SpringBoot</a>
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring Rest API</a>
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring Webservices</a>
                            <a href="#Summary" className="bg-blue-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring JDBCTemplate</a>
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring Cloud</a>
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring Cloud Netflix</a>
                            <a href="#Summary" className="bg-indigo-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-sm">Spring Batch</a>

                            <a href="#Summary" className="bg-blue-400 hover:bg-red-300 py-1 px-2 rounded-lg text-sm">NodeJS</a>
                            <a href="#Summary" className="bg-blue-400 hover:bg-red-300 py-1 px-2 rounded-lg text-sm">NextJS</a>
                            <a href="#Summary" className="bg-blue-400 hover:bg-red-300 py-1 px-2 rounded-lg text-sm">KOA</a>
                            <a href="#Summary" className="bg-blue-400 hover:bg-red-300 py-1 px-2 rounded-lg text-sm">Passport</a>
                            <a href="#Summary" className="bg-blue-400 hover:bg-red-300 py-1 px-2 rounded-lg text-sm">JWT</a>

                            <a href="#Summary" className="bg-violet-500 hover:bg-violet-300 py-1 px-2 rounded-lg text-sm">Create dAPP</a>
                            <a href="#Summary" className="bg-violet-500 hover:bg-violet-300 py-1 px-2 rounded-lg text-sm">Connect using ChainLink Oracle</a>
                            <a href="#Summary" className="bg-violet-500 hover:bg-violet-300 py-1 px-2 rounded-lg text-sm">Write Smart contracts with Solidity</a>

                        </div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-gradient-to-l from-purple-100 to-yellow-600 border-2 border-yellow-300 rounded-lg">
                        <div className="flex items-center -mt-1">
                        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mb-12">
                                 <span className="relative text-white">Frontend Development</span>
                            </span>
                        </div>
                        <p className="mb-2 text-white-100">
                        <div className="flex flex-wrap gap-2">
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-1 rounded-lg text-sm">ReactJS</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Flutter</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">TailwindCSS</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">SCSS</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Pico CSS</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Axios</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">ESLint</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">react-three/Fiber</a>
                        <a href="#Summary" className="bg-blue-500 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">react-three/drei</a>
                        </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full mb-5 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-gradient-to-r from-blue-100 to-blue-500 border-2 border-blue-600 rounded-lg">
                    <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block mb-12">
                                 <span className="relative text-black">Cloud Solutions</span>
                            </span>
                            <p className="mb-2 text-white-100">
                        <div className="flex flex-wrap gap-2">
                        <a href="#Summary" className="bg-indigo-700 hover:bg-gray-500 py-1 px-1 rounded-lg text-sm">AWS</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Lambda</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">EC2</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">IAM</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">MKS</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">dynamoDB</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Pricing</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Route 53</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">AWS CloudWatch</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">AWS Developer Tools</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Cloud Formation</a>
                        <a href="#Summary" className="bg-orange-600 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Heroku</a>
                        <a href="#Summary" className="bg-orange-600 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">Render</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">GCP deployment commands</a>
                        <a href="#Summary" className="bg-indigo-700 hover:bg-red-600 py-1 px-2 rounded-lg text-sm">GCP Topic creations</a>
                        </div>
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
