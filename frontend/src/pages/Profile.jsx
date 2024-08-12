import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = () => {
    navigate("/user-listings");
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 mt-10">
      <div className="p-3 max-w-lg mx-auto bg-white ">
        <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg p-3 uppercase hover:bg-blue-700 transition disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-green-600 text-white p-3 rounded-lg uppercase text-center hover:bg-green-700 transition"
            to={"/create-listing"}
          >
            <FaPlus className="inline-block mr-2" /> Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-600 cursor-pointer hover:underline"
          >
            <FaTrashAlt className="inline-block mr-1" /> Delete account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-600 cursor-pointer hover:underline"
          >
            <FaSignOutAlt className="inline-block mr-1" /> Sign out
          </span>
        </div>

        <p className="text-red-600 mt-5">{error ? error : ""}</p>
        <p className="text-green-600 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
        <button
          onClick={handleShowListings}
          className="bg-yellow-500 text-white rounded-lg p-3 uppercase mt-5 hover:bg-yellow-600 transition w-full"
        >
          Show Listings
        </button>
      </div>
    </div>
  );
}
