// import "../styles/Balance.css";
// import React, { useEffect, useState } from "react";
// import Web3 from "web3";

// interface BalancePageProps {
//   address: string;
// }

// const Balance: React.FC<BalancePageProps> = ({ address }) => {
//   // const [balance, setBalance] = useState<string | null>(null);

//   // useEffect(() => {
//   //   const fetchBalance = async () => {
//   //     if (address && window.ethereum) {
//   //       const web3 = new Web3(window.ethereum);
//   //       const balanceWei = await web3.eth.getBalance(address);
//   //       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//   //       setBalance(balanceEth);
//   //     }
//   //   };

//   //   fetchBalance();
//   // }, [address]);
//   return (
//     <div>
//       <h1 className="h">Balance</h1>
//       <div className="event">
//         {/* <p>Address: {address}</p>
//         {balance !== null ? (
//           <p>Balance: {balance} ETH</p>
//         ) : (
//           <p>Loading balance...</p>
//         )} */}
//       </div>
//     </div>
//   );
// };
// export default Balance;
