// import React from "react";

// import { RiLinkedinFill } from "react-icons/ri";
// import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const socialLinks = [
//   {
//     path: "https://www.instagram.com/",
//     icon: <AiOutlineInstagram className="group-hover:text-black w-5 h-5" />,
//   },
//   {
//     path: "https://github.com/bhat315",
//     icon: <AiFillGithub className="group-hover:text-black w-5 h-5" />,
//   },
//   {
//     path: "https://www.linkedin.com/in/praveenbhat315/",
//     icon: <RiLinkedinFill className="group-hover:text-black w-5 h-5" />,
//   },
// ];

// const quickLinks01 = [
//   {
//     path: "/",
//     display: "Home",
//   },
//   {
//     path: "/about",
//     display: "About",
//   },
//   {
//     path: "/contact",
//     display: "Contact Us",
//   },
//   {
//     path: "/Profile",
//     display: "Profile",
//   },
// ];

// const Footer = () => {
//   const year = new Date().getFullYear();

//   return (
//     <footer className=" bg-gradient-to-r from-red-200 to-blue-100 ">
//       <div className="container mx-auto px-10 flex justify-between items-start">
//         <div className="flex-shrink-0"></div>
//         <div className="flex flex-col items-end text-right">
//           <p className="text-base mb-4">
//             &copy; {year} Developed by Praveen Bhat ❤️
//           </p>
//           <ul className="flex flex-wrap gap-6 mb-4">
//             {quickLinks01.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className=" hover:text-red-800 transition duration-300"
//                 >
//                   {item.display}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div className="flex gap-4">
//             {socialLinks.map((link, index) => (
//               <Link
//                 to={link.path}
//                 key={index}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 border border-solid border-gray-600 rounded-full flex justify-center items-center group hover:bg-red-700 transition duration-300"
//               >
//                 {link.icon}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    path: "https://www.instagram.com/",
    icon: <AiOutlineInstagram className="group-hover:text-black w-5 h-5" />,
  },
  {
    path: "https://github.com/bhat315",
    icon: <AiFillGithub className="group-hover:text-black w-5 h-5" />,
  },
  {
    path: "https://www.linkedin.com/in/praveenbhat315/",
    icon: <RiLinkedinFill className="group-hover:text-black w-5 h-5" />,
  },
  {
    path: "https://www.twitter.com/",
    icon: <RiTwitterFill className="group-hover:text-black w-5 h-5" />,
  },
  {
    path: "https://www.facebook.com/",
    icon: <AiFillFacebook className="group-hover:text-black w-5 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
  {
    path: "/Profile",
    display: "Profile",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-red-100 py-8">
      <div className="container mx-auto px-10 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="mb-6 lg:mb-0">
          <p className="text-base text-black text-center lg:text-left">
            &copy; {year} Developed by Praveen Bhat ❤️
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
          <ul className="flex flex-wrap gap-6 mb-4">
            {quickLinks01.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-black hover:text-red-800 transition duration-300"
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                href={link.path}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-solid border-gray-600 rounded-full flex justify-center items-center group hover:bg-white transition duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
