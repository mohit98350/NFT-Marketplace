import axie from "../tile.jpeg";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

function NFTTile(data) {
    console.log(data)
    const newTo = {
        pathname: "/nftPage/" + data.data.tokenId
    }

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (

        <Link to={newTo}>
            {/* <div className=" container border-2 ml-5 mt-5 mb-5 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
            <img src={IPFSUrl} alt="" className="w-72 h-80 rounded-lg object-cover" />
        
            <div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                <strong className="text-xl">{data.data.name}</strong>
                <p className="display-inline">
                    {data.data.description}
                </p>
            </div>
        </div> */}
            <div className=" container border-2 ml-5 mt-5 mb-5 flex flex-col items-center rounded-lg w-72  md:w-62 shadow-xl ">

                <div className="Nft_img container rounded-sm">
                   
                <LazyLoadImage 
                    src={IPFSUrl}
                    className="w-full p-4  " 
                    effect="blur"
                
                />
                    {/* <img class="w-full p-4 " src={IPFSUrl} alt="loading..." /> */}
                    
                    

                </div>
                <div class=" ">
                    <div class="font text-white  ">Token ID #{data.data.tokenId}</div>

                </div>

                <div class="px-1 py-1 ">
                    <div class="font-bold text-white text-xl mb-1">{data.data.name}</div>

                </div>
          
                <div className="container p-4 py-1 pb-1  mx-auto">
                    <div className="flex border-t border-gray-200  py-2">

                        <span className="text-white">Price</span>
                        <span className="ml-auto text-white">{"Ξ"+ " "+data.data.price}</span>
                    </div>
                </div>

            </div>

        </Link>


    )
}

export default NFTTile;
