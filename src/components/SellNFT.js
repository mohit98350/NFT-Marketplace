import Footer from "./Footer";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";

export default function SellNFT() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();

    async function OnChangeFile(e) {
        var file = e.target.files[0];
        try {
            const response = await uploadFileToIPFS(file);
            console.log("Response", response)
            if (response.success == true) {
                console.log("Uploaded image to pinata", response.pinataURL)
                setFileURL(response.pinataURL)
            }
        } catch (e) {
            console.log("Error during file upload", e)
        }
    }

    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            return;
        }
        const nftJSON = {
            name, description, price, image: fileURL
        };
        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success == true) {
                console.log("Uploaded JSON to pinata", response);
                return response.pinataURL;
            }
        } catch (e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();
        try {
            const metadataURL = await uploadMetadataToIPFS();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            updateMessage("please wait... uploading (upto 5 mins)");
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
            const price = ethers.utils.parseUnits(formParams.price, 'ether');
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();

            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice });
            await transaction.wait();
            alert("succesfully listeed your nft..")
            updateMessage("");
            updateFormParams({ name: '', description: "", price: "" });
            window.location.replace("/");
        } catch (error) {
            alert("Upload error" + e);
        }
    }

    return (
        <div>

            {/* <div className="flex flex-col place-items-center mt-10 " id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4 ">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image (&lt;500 KB)</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-red-500 text-center">{message}</div>
                <button  onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">
                    List NFT
                </button>
            </form>
        </div> */}


            {/* <div class="flex items-center min-h-screen bg-gray-50"> */}
            <form className=" flex items-center  rounded mt-5  ">
                <div class="flex-1 h-full max-w-4xl mx-auto  rounded-lg shadow-2xl">
                    <div class="flex flex-col md:flex-row">
                        <div class="h-32 md:h-auto md:w-1/2">
                            <img class="object-cover w-full h-full" src="./Images/mint.jpg"
                                alt="img" />
                        </div>
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div class="w-full">
                                <div class="flex justify-center">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-blue-600 " fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg> */}
                                  <img class="w-20 h-20 text-blue-600" src="./Images/pic.png"/>
                                    
                                </div>
                                <h1 class="mb-4 text-2xl font-bold text-center text-purple-500">
                                    Mint NFT
                                </h1>
                                <div>
                                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name" type="text" placeholder="Axie#4563"
                                        onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
                                </div>
                                <div class="mt-3">
                                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        cols="40" rows="3" id="description" type="text" placeholder="Axie Infinity Collection"
                                        value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                                </div>
                                <div>
                                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number" placeholder="Min 0.01 ETH" step="0.01"
                                        value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                                </div>

                                <div class="mt-3">

                                    <label class="block text-purple-500 text-sm font-bold mb-2 " for="small_size">Upload Image</label>
                                    <input class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 cursor-pointer bg-white dark:text-white-400 focus:outline-none dark:bg-gray-700
                                    dark:border-white-600 dark:placeholder-gray-400" id="small_size" onChange={OnChangeFile} type="file"></input>
                                </div>


                                <div className="text-red-500 text-center">{message}</div>
                                <button onClick={listNFT} className="font-bold mt-3 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">
                                    List NFT
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <Footer/>
        </div>



    )
}