import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === offerListings.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [offerListings]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === offerListings.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? offerListings.length - 1 : currentSlide - 1
    );
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 py-2 min-h-screen mt-10">
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-red-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-black">
          Apni Property is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-red-500 text-2xl lg:text-4xl font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* Custom Slider */}
      <div className="relative max-w-6xl mx-auto mt-10 h-[500px]">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <div
              key={listing._id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                <h2 className="text-lg font-bold">{listing.name}</h2>
                <p className="text-sm">{listing.location}</p>
              </div>
            </div>
          ))}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
          onClick={prevSlide}
        >
          <FaArrowLeft className="text-gray-800 text-3xl hover:text-blue-600" />
        </div>
        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          onClick={nextSlide}
        >
          <FaArrowRight className="text-gray-800 text-3xl hover:text-blue-600" />
        </div>
      </div>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-black font-bold hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 font-bold">
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-black hover:underline font-bold"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-black hover:underline font-bold"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
