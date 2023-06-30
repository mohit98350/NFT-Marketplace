import React from 'react'
import {Link} from "react-router-dom";

const Landing = () => {

    
    
   
    
    
    return (
        <div className='container'>
            <div className=''>
                <img className=' sm:w-6/12 h-auto mx-auto' src="./Images/hero-asset.png" />
            </div>
            <section className="text-gray-600 body-font">
                <div className="container  mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <div className="text-center lg:w-2/3 ">
                        <h1 className="title-font sm:text-7xl text-5xl mb-8 font-medium text-white">
                           <span className='font-black  '>
                           Build NFT Marketplaces
                            </span> 
                            <br/>
                            <h1 className='mt-5 sm:text-7xl text-5xl'>faster than ever</h1>
                            
                            
                        </h1>
                        <p className="mb-8 leading-relaxed text-xl font-black">
                          
                            Thirdweb gives you the tools you need to create audited,performant
                            <br/>
                            and flexible NFT marketplaces in hours, not months.
                          
                          
                          
                        </p>
                        <div className="flex-auto justify-center mt-2">
                            <button 
                            className=" inline-flex text-black  bg-white hover:bg-zinc-300  py-2 px-16 border border-black hover:border-transparent rounded text-lg">
                                <Link to="/marketplace">
                                Marketplace
                                </Link>
                               
                                
                            </button>
                            <button className="ml-3 mt-5 inline-flex text-white  hover:bg-black  py-2 px-16 border border-grey-900 hover:border-transparent rounded text-lg">
                                Github
                            </button>

                        </div>
                    </div>
                </div>
            </section>



        </div>






    )
};

export default Landing;



