// // /user-listings
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function UserListings() {
//   const [userListings, setUserListings] = useState([]);
//   const [showListingsError, setShowListingsError] = useState(false);

//   useEffect(() => {
//     const fetchUserListings = async () => {
//       try {
//         const res = await fetch(`/api/user/listings/${currentUser._id}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setShowListingsError(true);
//           return;
//         }
//         setUserListings(data);
//       } catch (error) {
//         setShowListingsError(true);
//       }
//     };

//     fetchUserListings();
//   }, []);

//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="p-3 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <h1 className="text-center mt-7 text-2xl font-semibold text-gray-800">
//         Your Listings
//       </h1>

//       {showListingsError ? (
//         <p className="text-red-600 mt-5 text-center">Error showing listings</p>
//       ) : userListings.length === 0 ? (
//         <p className="text-gray-600 mt-5 text-center">No listings found</p>
//       ) : (
//         <div className="mt-5 grid grid-cols-1 gap-4">
//           {userListings.map((listing) => (
//             <div
//               key={listing._id}
//               className="border rounded-lg p-3 flex justify-between items-center gap-4 bg-white shadow-sm"
//             >
//               <Link to={`/listing/${listing._id}`}>
//                 <img
//                   src={listing.imageUrls[0]}
//                   alt="listing cover"
//                   className="h-16 w-16 object-contain"
//                 />
//               </Link>
//               <Link
//                 className="text-gray-800 font-semibold hover:underline truncate flex-1"
//                 to={`/listing/${listing._id}`}
//               >
//                 <p>{listing.name}</p>
//               </Link>

//               <div className="flex flex-col items-center">
//                 <button
//                   onClick={() => handleListingDelete(listing._id)}
//                   className="text-red-600 uppercase"
//                 >
//                   Delete
//                 </button>
//                 <Link to={`/update-listing/${listing._id}`}>
//                   <button className="text-green-600 uppercase">Edit</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };

    fetchUserListings();
  }, [currentUser._id]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto bg-gray-100 min-h-screen mt-10">
      <h1 className="text-center mt-7 text-2xl font-semibold text-gray-800">
        Your Listings
      </h1>

      {showListingsError ? (
        <p className="text-red-600 mt-5 text-center">Error showing listings</p>
      ) : userListings.length === 0 ? (
        <p className="text-gray-600 mt-5 text-center">No listings found</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4">
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 bg-white shadow-sm"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-gray-800 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-600 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-600 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
