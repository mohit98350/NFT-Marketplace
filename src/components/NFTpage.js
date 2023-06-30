import Footer from './Footer';
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";


export default function NFTPage(props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    const params = useParams();
    const tokenId = params.tokenId;
    console.log(tokenId)



    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr)
        updateCurrAddress(addr);
    }

    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();

            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }


    if (!dataFetched)
        getNFTData(tokenId);
    if (typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

    return (
        // <div style={{"min-height":"100vh"}}>
        //     <Navbar></Navbar>
        //     <div classNameName="flex ml-20 mt-20">
        //         <img src={data.image} alt="" classNameName="w-2/5" />
        //         <div classNameName="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
        //             <div>
        //                 Name: {data.name}
        //             </div>
        //             <div>
        //                 Description: {data.description}
        //             </div>
        //             <div>
        //                 Price: <span classNameName="">{data.price + " ETH"}</span>
        //             </div>
        //             <div>
        //                 Owner: <span classNameName="text-sm">{data.owner}</span>
        //             </div>
        //             <div>
        //                 Seller: <span classNameName="text-sm">{data.seller}</span>
        //             </div>
        //             <div>
        //             { currAddress != data.owner && currAddress != data.seller ?
        //                 <button classNameName="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
        //                 : <div classNameName="text-emerald-700">You are the owner of this NFT</div>
        //             }

        //             <div classNameName="text-green text-center mt-3">{message}</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div >
            {/* <Navbar></Navbar> */}

            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <LazyLoadImage 
                    src={data.image}
                    className=" lg:w-1/2  w-full h-auto h-64 object-cover object-center rounded" 
                   
                    />

                 
                    {/* <img alt="NFT" className="lg:w-1/2  w-full h-auto h-64 object-cover object-center rounded" src={data.image} /> : */}
                    
                        
                        
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-white tracking-widest">NFT NAME</h2>
                            <h1 className="text-white text-3xl title-font font-medium mb-1">{data.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center text-white text-2xl">
                                    <span>Token ID {"#"+tokenId}</span>
                                    
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 text-white space-x-2s">
                                    {data.description}
                                </span>
                            </div>
                            <p className="leading-relaxed  text-white mb-5">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                           
                            <div className="flex  border-t border-gray-200 py-2">
                                <button className="border-2 border-gray-500 ml-1 mr-2 bg-zinc-700 rounded-full w-7 h-7 "></button>
                                <span className="text-white">Quantity</span>
                                <span className="ml-auto text-white">1</span>
                            </div>
                            <div className="flex  border-t border-b mb-6 border-gray-200 py-2">
                               
                                <button className="border-2 border-gray-500 ml-1 mr-2 bg-indigo-700 rounded-full w-7 h-7 "></button>
                                <span className="text-white ">Owner</span>
                                
                                <span className="ml-auto text-white">{data.owner}</span>
                                
                               

                                
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <button className="border-2 border-gray-500 ml-1 mr-2 bg-indigo-900 rounded-full w-7 h-7 "></button>
                                <span className="text-white">Seller</span>
                                <span className="ml-auto text-white">{data.seller}</span>
                            </div>
                            <div className="flex  mt-12">
                            <svg fill="currentColor" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/></svg>
                                <span className="title-font font-medium text-2xl text-white">{+data.price + " "+"Ξ" }</span>

                                {currAddress != data.owner && currAddress != data.seller ?
                                    <button className="flex ml-auto text-violet-900 bg-zinc-900 border-0 py-2 px-6 focus:outline-none  rounded"
                                        onClick={() => buyNFT(tokenId)}>Buy Now</button>
                                    : <div className="flex ml-auto text-violet-900 bg-zinc-900 border-0 py-2 px-6 focus:outline-none ">You owned this NFT</div>
                                }



                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}