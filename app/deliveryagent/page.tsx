// "use client";

// import { useEffect, useState } from "react";
// import { getUserToken } from "../utility/authtoken";
// import { useRouter } from "next/navigation";
// import Header from "../components/header/header";
// import Footer from "../components/footer/footer";

// export default function Home() {
//   const router = useRouter();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Check if the code is running in the browser
//     if (typeof window !== "undefined") {
//       const userData = getUserToken();
//       setUserData(userData);

//       // If the user is not authorized, redirect to the homepage
//       if (userData === null || userData.role === "user") {
//         router.push("/");
//       }
//     }
//   }, [router]);

//   const checkOrders = () => {
//     router.push("/allorders");
//   };

//   return (
//     <div>
//       <Header />
//       <div style={{ padding: "100px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "50px",
//             marginBottom: "50px",
//           }}
//         >
//           {/* Additional content here if needed */}
//         </div>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={checkOrders}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             All Orders
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
