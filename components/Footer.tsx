import Link from 'next/link';

// Footer Component: A reusable footer section for the webpage
const Footer = () => {
  return (
    // Footer container: Applies a green background, white text, and centers content.
    <footer className="bg-green-900 text-white text-center py-4">
      {/* Footer content span: Contains text and a link, styled with responsive design. */}
      <span
        className="
          block  /* Ensures the content spans the full width within its parent */
          border-2 border-black rounded-xl mx-auto my-2 /* Adds a solid border,corners, and centers horizontally */
          max-w-[90%] md:max-w-[70%] lg:max-w-[50%] /* Sets the maximum width based on screen size */
          px-4 py-2 text-xs /* Small screen padding and text size */
          sm:px-6 sm:py-3 sm:text-sm /* Medium screen padding and text size */
          md:px-8 md:py-3 md:text-base /* Large screen padding and base text size */
          lg:px-10 lg:py-3 lg:text-lg /* Extra-large screen padding and larger text size */
        "
      >
        {/* Copyright Text */}
        &copy; {new Date().getFullYear()}&nbsp;&nbsp; 
        {/* Link to a LinkedIn profile: Styled with underline and hover effects */}
        <Link
          href="https://www.linkedin.com/in/dineshas14/"
          className="underline hover:text-red-900" /* Underline text by default and change text color on hover */
        >
          Dinesha Shair
        </Link>. &nbsp;&nbsp; All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;


  