'use client';
import { useState, useEffect, useRef } from 'react'; 
// `useState` manages component state, `useEffect` runs side effects like fetching data, 
// and `useRef` creates a reference to DOM elements (used here for the input field).

// API base URLs for fetching prayer times and geolocation data
const ALADHAN_API_BASE_URL = 'https://api.aladhan.com/v1/timings';
const BIGDATACLOUD_BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

// Type definitions for prayer times and date structures
type PrayerTimesType = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type DateType = {
  gregorian: string;
  hijri: {
    day: string;
    month: number;
    weekday: string;
    year: string;
  };
};

type LocationNameType = {
  city: string;
  country: string;
  timezone: string;
};

export default function PrayerTimes() {
  const inputRef = useRef<HTMLInputElement>(null); 
  // `inputRef` holds a reference to the input field, allowing direct DOM interaction.

  // State variables
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [isError, setIsError] = useState(false); // Tracks error state
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null); // Stores prayer times
  const [date, setDate] = useState<DateType | null>(null); // Stores date info
  const [locationName, setLocationName] = useState<LocationNameType | null>(null); // Stores location details
  const [localTime, setLocalTime] = useState(new Date()); // Tracks local time
  const [typedCityName, setTypedCityName] = useState<string>(''); // Tracks user-typed city name

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(new Date()), 1000); 
    // Updates `localTime` every second for real-time clock display.
    return () => clearInterval(timer); 
    // Cleanup function clears the interval on component unmount.
  }, []);

  // Handles form submission when the user searches for a city
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents form's default page reload behavior.
    if (inputRef.current?.value.trim()) {
      setIsLoading(true); // Show loading state.
      resolveGeolocation(inputRef.current.value.trim()); 
      // Calls `resolveGeolocation` to fetch location data for the input city.
    } else {
      alert('Please enter a valid city name'); // Alerts user for invalid input.
    }
  };

  // Resolves city name to geolocation data
  const resolveGeolocation = async (city: string) => {
    try {
      const response = await fetch(
        `${BIGDATACLOUD_BASE_URL}?localityLanguage=en&city=${encodeURIComponent(city)}`
      ); 
      // Fetches geolocation data for the provided city.

      if (!response.ok) {
        throw new Error('Failed to fetch geolocation data'); // Error handling for bad response.
      }

      const data = await response.json(); // Parse JSON response.
      if (!data.city || !data.latitude || !data.longitude) {
        throw new Error('Invalid geolocation data'); // Error handling for missing data.
      }

      // Set location details and fetch prayer times
      setLocationName({
        city: data.city,
        country: data.countryName,
        timezone: data.timezone,
      });
      setTypedCityName(city);
      fetchPrayerTimes(data.latitude, data.longitude, data.timezone); 
      // Calls `fetchPrayerTimes` with location details.
    } catch (error) {
      setIsError(true); // Show error state.
      setIsLoading(false); // Stop loading spinner.
      alert(error instanceof Error ? error.message : 'An error occurred'); 
      // Alerts user about the error.
    }
  };

  // Fetches prayer times for the provided coordinates and timezone
  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `${ALADHAN_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&method=2`
      ); 
      // Fetch prayer times from the Aladhan API.

      if (!response.ok) {
        throw new Error('Failed to fetch prayer times'); // Error handling for bad response.
      }

      const data = await response.json(); // Parse JSON response.

      // Extract Hijri (Islamic) and Gregorian dates
      const { day, month, weekday, year } = data.data.date.hijri;
      setDate({
        gregorian: data.data.date.readable, 
        hijri: { day, month: month.number, weekday, year },
      });

      // Extract prayer times
      const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
      setPrayerTimes({ Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha });
    } catch (error) {
      setIsError(true); // Show error state.
      alert(error instanceof Error ? error.message : 'An error occurred while fetching prayer times');
    } finally {
      setIsLoading(false); // Stop loading spinner.
    }
  };

  const hijriDate = `(${date?.hijri.year}/${date?.hijri.month}/${date?.hijri.day})`; 
  // Formats Hijri date for display.
  const gregorianDate = date?.gregorian; 
  // Formats Gregorian date for display.

  return (
    <div className="min-h-screen pt-2 px-5 sm:px-10">
      {/* Header Section */}
      <header>
        <nav>
          <h1 className="text-center text-3xl font-bold mb-2">Local Prayer Time</h1>
          {/* Form for searching prayer times by city */}
          <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-5">
            <input
              ref={inputRef} 
              type="text"
              placeholder="Enter city name"
              className="border-2 border-green-900 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-900 text-white font-extrabold italic px-3 rounded hover:bg-red-700"
            >
              <span className="border-solid border-2 border-black py-1 px-3 text-center text-sm rounded">
                Search
              </span>
            </button>
          </form>
        </nav>
      </header>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center mt-10">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500 mt-10">Error fetching data. Try again!</div>
      ) : (
        <main className="flex flex-col gap-5 justify-center items-center mb-2">
          {locationName === null ? (
            <h1 className="text-center text-xl">Enter a city name to get prayer times</h1>
          ) : (
            <>
              {/* Display Location Information */}
              <h2 className="text-center text-2xl font-bold">
                {typedCityName}, {locationName.country}
              </h2>
              <div className="text-center m-0">
                <p className="text-xl">Local Time: {localTime.toLocaleTimeString()}</p>
              </div>
              <div className="flex flex-row space-x-2 items-center hover:bg-green-900 p-3 rounded hover:border-2 border-black">
                <span className="font-bold text-gray-900 hover:text-white">
                  | <span className="text-sm text-gray-400">Today&apos;s Date: </span>{gregorianDate} |
                </span>
                <span className="font-bold text-gray-900 hover:text-white">
                  <span className="text-sm text-gray-400">In Arabic Calendar: </span>{hijriDate} |
                </span>
              </div>
              {/* Display Prayer Times */}
              <ul className="space-y-2 mt-0">
                <div className="space-y-1 border-4 p-5 rounded border-green-900">
                  {prayerTimes &&
                    Object.entries(prayerTimes).map(([name, time]) => (
                      <li
                        key={name}
                        className="flex justify-between font-bold text-gray-900 bg-white p-3 border-4 border-gray-300 rounded shadow w-64 hover:bg-black hover:text-white"
                      >
                        <span>{name}</span>
                        <span>{time}</span>
                      </li>
                    ))}
                </div>
              </ul>
            </>
          )}
        </main>
      )}
    </div>
  );
}
