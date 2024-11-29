'use client'; // Required for client-side rendering
import React, { useState, useEffect } from 'react';
import SurahButtons from '../../components/SurahButtons';
import RenderSurahs from '../../components/RenderSurahs';

// Interfaces for Ayah and Surah
interface Ayah {
  number: number;
  text: string;
  audio: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const SurahInArabic = () => {
  const [selectedEdition] = useState<string>('en.asad'); // Selected edition
  const [selectedSurah, setSelectedSurah] = useState<number | null>(1); // Selected Surah number
  const [surahDetails, setSurahDetails] = useState<Surah | null>(null); // Fetched Surah details
  const [listToggle, setListToggle] = useState<boolean>(false); // Toggle state for Surah list
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // Check if screen is small

  /**
   * Effect to monitor and track screen size changes.
   * Updates `isSmallScreen` when the screen width is less than or equal to 768px.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Media query for small screens

    const handleMediaChange = () => {
      setIsSmallScreen(mediaQuery.matches); // Set `isSmallScreen` based on the query
    };

    handleMediaChange(); // Check the initial screen size

    // Add listener for screen size changes
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  /**
   * Callback to handle changes in the selected Surah.
   * @param newSurah - The selected Surah number
   */
  const handleSurahChange = (newSurah: number) => {
    setSelectedSurah(newSurah); // Update the selected Surah
  };

  /**
   * Fetch the Surah details whenever `selectedSurah` or `selectedEdition` changes.
   */
  useEffect(() => {
    if (selectedSurah && selectedEdition) {
      const fetchSurah = async () => {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${selectedSurah}`
          );
          const data = await response.json();
          setSurahDetails(data.data); // Set the fetched Surah details
        } catch (error) {
          console.error('Error fetching Surah data:', error);
        }
      };

      fetchSurah(); // Trigger the API call
    }
  }, [selectedSurah, selectedEdition]);

  /**
   * Toggle the visibility of the Surah list.
   */
  const handleButtonListToggle = () => {
    setListToggle((prev) => !prev); // Toggle the state
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-screen text-center bg-gray-100">
      {/* Main Header Section */}
      <div className="text-center mb-2">
        <div
          className={`flex flex-row ${
            isSmallScreen && listToggle ? 'w-full' : 'w-full'
          } items-start bg-black text-white`}
        >
          {/* Toggle Button */}
          <button
            onClick={handleButtonListToggle}
            className={`justify-center rounded flex flex-row border-solid border-white border-2 m-1 hover:bg-green-900 p-1 ${
              isSmallScreen ? 'w-full' : 'w-1/6 md:w-1/4 sm:w-1/2'
            }`}
          >
            {listToggle ? 'Click Here To Close Surah List' : 'Click Here For Surah List'}
          </button>

          {/* Page Title */}
          {!isSmallScreen && (
            <h1 className="py-2 text-white text-2xl font-bold mb-1">Quran In Arabic Full</h1>
          )}
        </div>

        {/* Surah Details */}
        {surahDetails && (
          <div className="border-2 border-black py-2 ml-1 mr-1">
            <h2 className="text-2xl text-center font-bold">
              {surahDetails.name} ({surahDetails.englishName})
            </h2>
            <p>
              <strong>Translation:</strong> {surahDetails.englishNameTranslation}
            </p>
            <p>
              <strong>Revelation Type:</strong> {surahDetails.revelationType}
            </p>
            <p>
              <strong>Number of Ayahs:</strong> {surahDetails.numberOfAyahs}
            </p>
            <p>
              <strong>Surah Number:</strong> {surahDetails.number}
            </p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`flex ${isSmallScreen && listToggle ? 'flex-col' : 'flex-row'} w-full mt-5`}>
        {/* Left Section: Surah Buttons */}
        {listToggle && (
          <div
            className={`flex flex-col ${
              isSmallScreen ? 'w-full' : 'w-1/5'
            } space-y-4 max-h-[700px] overflow-y-auto`}
          >
            <SurahButtons onSurahChange={handleSurahChange} />
          </div>
        )}

        {/* Right Section: Info Display */}
        {!isSmallScreen || !listToggle ? (
          <div className="flex flex-col w-full px-2 items-center space-y-4 max-h-[700px] overflow-y-auto">
            {surahDetails ? (
              <RenderSurahs selectedSurah={surahDetails} />
            ) : (
              <p className="text-gray-500">Please select a Surah to display its details.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SurahInArabic;
