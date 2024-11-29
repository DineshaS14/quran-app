'use client'; // This tells Next.js that this is a client-side rendered component.

import Link from "next/link"; // Importing the Link component from Next.js for navigation.

export default function NavBar() {
    return (
        // Main container for the Navbar
        <div className="text-center bg-green-900 italic py-2 px-6">
            {/* Website Title */}
            <h1 className="sm:text-lg md:text-3xl lg:text-6xl font-extrabold rounded text-white border-solid border-2 border-black py-3">
                Our Quran-Hub
            </h1>

            {/* Navigation Links Container */}
            <div className="px-2 flex flex-row justify-between">
                {/* Prayer Times Link */}
                <Link
                    href="/prayerTimes/" // The route this link navigates to.
                    className="border-2 border-black mt-2 px-4 py-1 rounded font-bold text-white
                    hover:bg-black hover:border-white" // Button styles with hover effects.
                >
                    Prayer Times
                </Link>

                {/* Surah in Arabic Link */}
                <Link
                    href="/surahInArabic/" // The route this link navigates to.
                    className="border-2 border-black mt-2 px-4 py-1 rounded font-bold text-white
                    hover:bg-black hover:border-white" // Button styles with hover effects.
                >
                    Every Surah in Arabic
                </Link>

                {/* Verse by Verse with Audio Link */}
                <Link
                    href="/verseByVerseWithAudio/" // The route this link navigates to.
                    className="border-2 border-black mt-2 px-4 py-1 rounded font-bold text-white
                    hover:bg-black hover:border-white" // Button styles with hover effects.
                >
                    Verse by Verse with Audio
                </Link>

                {/* Full Translation Link */}
                <Link
                    href="/fullTranslation/" // The route this link navigates to.
                    className="border-2 border-black mt-2 px-4 py-1  rounded font-bold text-white
                    hover:bg-black hover:border-white" // Button styles with hover effects.
                >
                    Translation
                </Link>
            </div>
        </div>
    );
}
