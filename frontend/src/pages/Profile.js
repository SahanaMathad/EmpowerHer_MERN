// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedUser, setEditedUser] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       alert("Please log in first!");
//       navigate("/login");
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("User Data Fetched:", res.data);
//         setUser(res.data);
//         setEditedUser(res.data);
//       })
//       .catch((err) => console.error("Error fetching profile:", err));
//   }, [token, navigate]);

//   const handleEditProfile = () => {
//     setEditMode(true);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       await axios.put("http://localhost:5000/api/auth/update", editedUser, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(editedUser);
//       setEditMode(false);
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   // Navigation functions
//   const handleAddProduct = () => navigate("/add-product");
//   const handleAddService = () => navigate("/add-service");
//   const handleViewSellerBookings = () => navigate("/seller-bookings");
//   const handleViewReport = () => navigate("/seller-report"); // New View Report button
//   const handleViewBuyerOrders = () => navigate("/buyer-orders");
//   const handleViewBuyerServices = () => navigate("/buyer-bookings");

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-page">
//       <h2>My Profile</h2>
//       <div className="profile-details">
//         {editMode ? (
//           <>
//             <label>
//               <strong>Name:</strong>
//               <input
//                 type="text"
//                 value={editedUser.name}
//                 onChange={(e) =>
//                   setEditedUser({ ...editedUser, name: e.target.value })
//                 }
//               />
//             </label>
//             <label>
//               <strong>Email:</strong>
//               <input type="email" value={editedUser.email} disabled />
//             </label>
//             <label>
//               <strong>Phone:</strong>
//               <input
//                 type="text"
//                 value={editedUser.phone}
//                 onChange={(e) =>
//                   setEditedUser({ ...editedUser, phone: e.target.value })
//                 }
//               />
//             </label>
//             <label>
//               <strong>State:</strong>
//               <input
//                 type="text"
//                 value={editedUser.state}
//                 onChange={(e) =>
//                   setEditedUser({ ...editedUser, state: e.target.value })
//                 }
//               />
//             </label>
//             <label>
//               <strong>City:</strong>
//               <input
//                 type="text"
//                 value={editedUser.city}
//                 onChange={(e) =>
//                   setEditedUser({ ...editedUser, city: e.target.value })
//                 }
//               />
//             </label>
//             <button className="save-btn" onClick={handleSaveProfile}>
//               Save
//             </button>
//           </>
//         ) : (
//           <>
//             <p>
//               <strong>Name:</strong> {user.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p>
//               <strong>Role:</strong> {user.role}
//             </p>
//             {user.role === "seller" && (
//               <p>
//                 <strong>Category:</strong> {user.category}
//               </p>
//             )}
//             <p>
//               <strong>Phone:</strong> {user.phone}
//             </p>
//             <p>
//               <strong>State:</strong> {user.state}
//             </p>
//             <p>
//               <strong>City:</strong> {user.city}
//             </p>
//           </>
//         )}
//       </div>

//       <div className="profile-actions">
//         {!editMode && (
//           <button className="edit-btn" onClick={handleEditProfile}>
//             Edit Profile
//           </button>
//         )}

//         {user.role === "seller" && user.category === "product" && (
//           <button className="add-product-btn" onClick={handleAddProduct}>
//             Add Product
//           </button>
//         )}
//         {user.role === "seller" && user.category === "service" && (
//           <button className="add-service-btn" onClick={handleAddService}>
//             Add Service
//           </button>
//         )}

//         {user.role === "seller" && (
//           <>
//             <button className="seller-bookings-btn" onClick={handleViewSellerBookings}>
//               View Bookings
//             </button>
//             <button className="view-report-btn" onClick={handleViewReport}>
//               View Report
//             </button>
//           </>
//         )}

//         {user.role === "buyer" && user.category === "product" && (
//           <button className="buyer-orders-btn" onClick={handleViewBuyerOrders}>
//             My Orders
//           </button>
//         )}
//         {user.role === "buyer" && user.category === "service" && (
//           <button className="buyer-services-btn" onClick={handleViewBuyerServices}>
//             My Services
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("User Data Fetched:", res.data);
        setUser(res.data);
        setEditedUser(res.data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token, navigate]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put("http://localhost:5000/api/auth/update", editedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(editedUser);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Navigation functions
  const handleAddProduct = () => navigate("/add-product");
  const handleAddService = () => navigate("/add-service");
  const handleViewSellerBookings = () => navigate("/seller-bookings");
  const handleViewReport = () => navigate("/seller-report"); // New View Report button
  const handleViewBuyerOrders = () => navigate("/buyer-orders");
  const handleViewBuyerServices = () => navigate("/buyer-bookings");

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-details">
        {editMode ? (
          <>
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input type="email" value={editedUser.email} disabled />
            </label>
            <label>
              <strong>Phone:</strong>
              <input
                type="text"
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
              />
            </label>
            <label>
              <strong>State:</strong>
              <input
                type="text"
                value={editedUser.state}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, state: e.target.value })
                }
              />
            </label>
            <label>
              <strong>City:</strong>
              <input
                type="text"
                value={editedUser.city}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, city: e.target.value })
                }
              />
            </label>
            <button className="save-btn" onClick={handleSaveProfile}>
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            {user.role === "seller" && (
              <p>
                <strong>Category:</strong> {user.category}
              </p>
            )}
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>State:</strong> {user.state}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
          </>
        )}
      </div>

      <div className="profile-actions">
        {!editMode && (
          <button className="edit-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}

        {/* Seller Product & Service Buttons */}
        {user.role === "seller" && user.category === "product" && (
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add Product
          </button>
        )}
        {user.role === "seller" && user.category === "service" && (
          <button className="add-service-btn" onClick={handleAddService}>
            Add Service
          </button>
        )}

        {/* Seller Actions */}
        {user.role === "seller" && user.category === "service" && (
          <button className="seller-bookings-btn" onClick={handleViewSellerBookings}>
            View Bookings
          </button>
        )}
        {user.role === "seller" && user.category === "product" && (
          <button className="view-report-btn" onClick={handleViewReport}>
            View Report
          </button>
        )}

        {/* Buyer Actions */}
        {user.role === "buyer" && user.category === "product" && (
          <button className="buyer-orders-btn" onClick={handleViewBuyerOrders}>
            My Orders
          </button>
        )}
        {user.role === "buyer" && user.category === "service" && (
          <button className="buyer-services-btn" onClick={handleViewBuyerServices}>
            My Services
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
