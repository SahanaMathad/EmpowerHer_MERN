// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import "./SellerReport.css"; // Ensure this CSS file exists

// // // const SellerReport = () => {
// // //   const [reportData, setReportData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   // Assume sellerId is stored in localStorage after login
// // //   const sellerId = localStorage.getItem("sellerId");

// // //   useEffect(() => {
// // //     fetchReport();
// // //   }, []);

// // //   const fetchReport = async () => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await axios.get("http://localhost:5000/api/orders/seller-report", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setReportData(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching seller report:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="seller-report-container">
// // //       <h1 style={{ textAlign: "center" }}>Order Sales Report</h1>
// // //       {loading ? (
// // //         <p>Loading report...</p>
// // //       ) : reportData.length === 0 ? (
// // //         <p>No orders found for your products.</p>
// // //       ) : (
// // //         <table className="report-table">
// // //           <thead>
// // //             <tr>
// // //               <th>Product Name</th>
// // //               <th>Buyer Name</th>
// // //               <th>Quantity Sold</th>
// // //               <th>Order Date</th>
// // //               <th>Stock Status</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {reportData.map((order) =>
// // //               order.items
// // //                 .filter((item) => item.product && item.product.seller.toString() === sellerId)
// // //                 .map((item, index) => (
// // //                   <tr key={`${order._id}-${index}`}>
// // //                     <td>{item.product.name}</td>
// // //                     <td>{order.user ? order.user.name : "Unknown"}</td>
// // //                     <td>{item.quantity}</td>
// // //                     <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// // //                     <td>{item.product.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
// // //                   </tr>
// // //                 ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //       <button className="back-btn" onClick={() => navigate("/profile")}>
// // //         Back to Profile
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default SellerReport;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "./SellerReport.css"; // Ensure this CSS file exists

// // const SellerReport = () => {
// //   const [reportData, setReportData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchReport();
// //   }, []);

// //   const fetchReport = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get("http://localhost:5000/api/orders/seller-report", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setReportData(response.data); // Store full backend response
// //     } catch (error) {
// //       console.error("Error fetching seller report:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="seller-report-container">
// //       <h1 style={{ textAlign: "center" }}>Order Sales Report</h1>
// //       {loading ? (
// //         <p>Loading report...</p>
// //       ) : reportData.length === 0 ? (
// //         <p>No orders found.</p>
// //       ) : (
// //         <table className="report-table">
// //           <thead>
// //             <tr>
// //               <th>Order ID</th>
// //               <th>Buyer Name</th>
// //               <th>Products Ordered</th>
// //               <th>Order Date</th>
// //               <th>Order Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {reportData.map((order, index) => (
// //               <tr key={index}>
// //                 <td>{order._id}</td>
// //                 <td>{order.user?.name || "Unknown"}</td>
// //                 <td>
// //                   <ul>
// //                     {order.items.map((item, idx) => (
// //                       <li key={idx}>
// //                         {item.product?.name || "Unknown Product"} - {item.quantity} pcs
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </td>
// //                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //                 <td>{order.status || "Pending"}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //       <button className="back-btn" onClick={() => navigate("/profile")}>
// //         Back to Profile
// //       </button>
// //     </div>
// //   );
// // };

// // export default SellerReport;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./SellerReport.css"; // Ensure this CSS file exists

// const SellerReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/orders/seller-report", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReportData(response.data);
//     } catch (error) {
//       console.error("Error fetching seller report:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate total available stock
//   const totalAvailableStock = reportData.reduce((total, order) => {
//     order.items.forEach((item) => {
//       if (item.product?.quantity) {
//         total += item.product.quantity;
//       }
//     });
//     return total;
//   }, 0);

//   return (
//     <div className="seller-report-container">
//       <h1 style={{ textAlign: "center" }}>Order Sales Report</h1>
//       {loading ? (
//         <p>Loading report...</p>
//       ) : reportData.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <>
//           <table className="report-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Buyer Name</th>
//                 <th>Products Ordered</th>
//                 <th>Order Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((order, index) => (
//                 <tr key={index}>
//                   <td>{order._id}</td>
//                   <td>{order.user?.name || "Unknown"}</td>
//                   <td>
//                     <ul>
//                       {order.items.map((item, idx) => (
//                         <li key={idx}>
//                           {item.product?.name || "Unknown Product"} - {item.quantity} pcs
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* Display Total Available Stock */}
//           <div className="stock-info">
//             <h3>Total Available Stock: {totalAvailableStock} items</h3>
//           </div>
//         </>
//       )}
//       <button className="back-btn" onClick={() => navigate("/profile")}>
//         Back to Profile
//       </button>
//     </div>
//   );
// };

// export default SellerReport;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellerReport.css"; // Ensure this CSS file exists

const SellerReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/orders/seller-report", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching seller report:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total sales and available stock per product
  const productSummary = {};
  reportData.forEach((order) => {
    order.items.forEach((item) => {
      const productId = item.product?._id;
      if (productId) {
        if (!productSummary[productId]) {
          productSummary[productId] = {
            name: item.product.name,
            totalSold: 0,
            totalAvailable: item.product.quantity, // Initial stock left
          };
        }
        productSummary[productId].totalSold += item.quantity;
      }
    });
  });

  return (
    <div className="seller-report-container">
      <h1 style={{ textAlign: "center" }}>Order Sales Report</h1>
      {loading ? (
        <p>Loading report...</p>
      ) : reportData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <table className="report-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer Name</th>
                <th>Products Ordered</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || "Unknown"}</td>
                  <td>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name || "Unknown Product"} - {item.quantity} pcs
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display Sales Summary */}
          <h2>Sales Summary</h2>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Sold</th>
                <th>Total Available</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(productSummary).map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.totalSold}</td>
                  <td>{product.totalAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button className="back-btn" onClick={() => navigate("/profile")}>
        Back to Profile
      </button>
    </div>
  );
};

export default SellerReport;
