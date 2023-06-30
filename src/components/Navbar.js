
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');



  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    console.log(addr)
    updateAddress(addr);
  }

  // function updateButton() {
  //   const ethereumButton = document.querySelector('.enableEthereumButton');
  //   ethereumButton.textContent = "Connected";
  //   ethereumButton.classNameList.remove("hover:bg-blue-70");
  //   ethereumButton.classNameList.remove("bg-blue-500");
  //   ethereumButton.classNameList.add("hover:bg-green-70");
  //   ethereumButton.classNameList.add("bg-green-500");
  // }

  async function connectWebsite() {
    console.log("clicked..")
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(chainId)
    if (chainId !== '0xaa36a7') {
      // alert('Incorrect network! Switch your metamask network to Sepolia');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        // updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
  }

  useEffect(() => {
    console.log(window.ethereum)
    if (window.ethereum == undefined)
      return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here", val);
      getAddress();
      toggleConnect(val);
      // updateButton();
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.replace(location.pathname)
    })
  });

  const handleEvent = (e) => {
    console.log("clicked..")
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    if (btn) {
      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    }


  }


  return (
    // <div className="">
    //   <nav className="w-screen container mx-auto">
    //     <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
    //     <li className='flex items-end ml-5 pb-2'>
    //       <Link to="/">
    //       <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2"/>
    //       <div className='inline-block font-bold text-xl ml-2'>
    //         NFT Marketplace
    //       </div>
    //       </Link>
    //     </li>
    //     <li className='w-2/6'>
    //       <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
    //         {location.pathname === "/" ? 
    //         <li className='border-b-2 hover:pb-0 p-2'>
    //           <Link to="/">Marketplace</Link>
    //         </li>
    //         :
    //         <li className='hover:border-b-2 hover:pb-0 p-2'>
    //           <Link to="/">Marketplace</Link>
    //         </li>              
    //         }
    //         {location.pathname === "/sellNFT" ? 
    //         <li className='border-b-2 hover:pb-0 p-2'>
    //           <Link to="/sellNFT">List My NFT</Link>
    //         </li>
    //         :
    //         <li className='hover:border-b-2 hover:pb-0 p-2'>
    //           <Link to="/sellNFT">List My NFT</Link>
    //         </li>              
    //         }              
    //         {location.pathname === "/profile" ? 
    //         <li className='border-b-2 hover:pb-0 p-2'>
    //           <Link to="/profile">Profile</Link>
    //         </li>
    //         :
    //         <li className='hover:border-b-2 hover:pb-0 p-2'>
    //           <Link to="/profile">Profile</Link>
    //         </li>              
    //         }  
    //         <li>
    //           <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
    //         </li>
    //       </ul>
    //     </li>
    //     </ul>
    //   </nav>
    //   <div className='text-white text-bold text-right mr-10 text-sm'>
    //     {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
    //   </div>
    // </div>

    

    <header  class="sticky top-0 z-50">
      <nav class="  border-gray-400 px-4 lg:px-6 py-2.5 dark:">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/">
          <div class="flex items-center">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" class="mr-2 h-8 xs:h-12 sm:h-12" alt="Website Logo" /> */}
            <img src="./Images/logo.png" class="mr-2 h-8 xs:h-12 sm:h-12" alt="Website Logo" />
            <span class=" logo self-center xl:text-xl xs:text-xl font-semibold whitespace-nowrap dark:text-white">NFTs</span>
          </div>
          </Link>
         
          <div class="flex items-center lg:order-2">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={connectWebsite}>
            <svg class="fill-current w-5 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="212" height="189" viewBox="0 0 212 189" id="metamask"><g fill="none" fill-rule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"></polygon><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"></polygon><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"></polygon><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"></polygon><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"></polygon><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path></g></g></svg>
              <span>Connect</span>
            </button>

            <button data-collapse-toggle="mobile-menu-button"
              onClick={(e) => handleEvent(e)} type="button"
              class="mobile-menu-button inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class=" mobile-menu hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu">
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Marketplace</a>
              </li> */}
               {location.pathname === "/marketplace" ? 
            <li class=' logo border-b-2 text-white hover:pb-0 p-2 border-gray-100  font-bold '>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            :
            <li class=' logo hover:border-b-2 text-white hover:pb-0 p-2 border-gray-100  font-bold '>
              <Link to="/marketplace">Marketplace</Link>
            </li>              
            }
              {/* <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">List My NFT</a>
              </li> */}
               {location.pathname === "/sellNFT" ? 
            <li class='logo  border-b-2 text-white  hover:pb-0 p-2 border-gray-100 font-bold'>
              <Link to="/sellNFT">List My NFT</Link>
            </li>
            :
            <li class=' logo  hover:border-b-2 text-white  hover:pb-0 p-2 border-gray-100 font-bold'>
              <Link to="/sellNFT">List My NFT</Link>
            </li>              
            }
              {/* <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
              </li> */}
             {location.pathname === "/profile" ? 
            <li class='logo border-b-2 text-white  hover:pb-0 p-2 border-gray-100 font-bold'>
              <Link to="/profile">Profile</Link>
            </li>
            :
            <li class='logo hover:border-b-2 text-white  hover:pb-0 p-2 border-gray-100 font-bold'>
              <Link to="/profile">Profile</Link>
            </li>              
            }  

            </ul>
          </div>
        </div>
      </nav>
    </header>




  );
}


export default Navbar;