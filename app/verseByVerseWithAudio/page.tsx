'use client'; // Required for client-side rendering
import SurahButtons from '@/components/SurahButtons';
import RenderSurahs from '@/components/RenderSurahs';
import React, { useState, useEffect } from 'react';

// Interfaces for the data structures
interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}
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

const VerseByVerseWithAudio = () => {
  const [editions, setEditions] = useState<Edition[]>([]); // Holds list of audio editions
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null); // Selected edition object
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null); // Selected Surah number
  const [surahDetails, setSurahDetails] = useState<Surah | null>(null); // Details of the selected Surah
  const [listToggle, setListToggle] = useState<boolean>(false); // Toggles Surah list visibility
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // Tracks if the screen is small

  // Monitor screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Check if screen width is <= 768px

    const handleMediaChange = () => {
      setIsSmallScreen(mediaQuery.matches); // Update `isSmallScreen` state
    };

    handleMediaChange(); // Initial check for current screen size

    // Add an event listener for screen size changes
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Fetch audio editions when the component mounts
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const response = await fetch(
          'https://api.alquran.cloud/v1/edition?format=audio&type=versebyverse'
        );
        const data = await response.json();
        setEditions(data.data); // Store fetched editions
      } catch (error) {
        console.error('Error fetching editions:', error);
      }
    };

    fetchEditions();
  }, []);

  // Fetch Surah details when a Surah and edition are selected
  useEffect(() => {
    if (selectedSurah && selectedEdition) {
      const fetchSurahDetails = async () => {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedEdition.identifier}`
          );
          const data = await response.json();
          setSurahDetails(data.data); // Set Surah details
        } catch (error) {
          console.error('Error fetching Surah details:', error);
        }
      };

      fetchSurahDetails();
    }
  }, [selectedSurah, selectedEdition]);

  // Updates the selected edition state
  const handleEditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const edition = editions.find((ed) => ed.identifier === selectedValue);
    setSelectedEdition(edition || null);
  };

  // Updates the selected Surah state
  const handleSurahChange = (newSurah: number) => {
    setSelectedSurah(newSurah);
  };

  // Toggles the Surah list visibility
  const handleListToggle = () => {
    setListToggle((prev) => !prev);
  }; // if true then sets it to false and vise versa

  return (
    <div className="flex flex-col w-full h-screen max-w-screen bg-white">
      {/* Header Section */}
      <div className="text-center mb-2 px-4">
        <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-center bg-black p-2`}>
          <button
            onClick={handleListToggle}
            className={`text-white font-semibold border-2 border-white rounded py-1 px-4 hover:bg-green-900 ${
              isSmallScreen ? 'w-full mb-2' : ''
            }`}
          >
            {listToggle ? 'Hide Surah List' : 'Show Surah List'}
          </button>

          {/* Show dropdown and title only when the Surah list is not toggled */}
          {!listToggle && (
            <div className="flex flex-col sm:flex-row items-center w-full">
              <h1 className="text-white font-bold text-sm md:text-xl lg:text-2xl mx-4">
                Quran Audio Verse By Verse Player
              </h1>
              <select
                id="edition-select"
                value={selectedEdition?.identifier || ''}
                onChange={handleEditionChange}
                className={`border border-gray-300 rounded p-2 ${
                  isSmallScreen ? 'w-full mt-2' : 'w-2/5'
                }`}
              >
                <option value="">Select Edition</option>
                {editions.map((edition) => (
                  <option key={edition.identifier} value={edition.identifier}>
                    {edition.englishName} ({edition.language})
                  </option>
                ))}
              </select>
              <label
                htmlFor="edition-select"
                className="text-white text-sm md:text-base mt-2 sm:mt-0 sm:ml-2"
              >
                Select an Audio Edition
              </label>
            </div>
          )}
        </div>

        {/* Surah Metadata */}
        {!listToggle && surahDetails && (
          <div className="mt-4 border-2 border-black p-4 bg-gray-100">
            <h2 className="font-bold text-lg md:text-2xl">
              {surahDetails.name} ({surahDetails.englishName})
            </h2>
            <p className="text-sm md:text-base">
              <strong>Translation:</strong> {surahDetails.englishNameTranslation}
            </p>
            <p className="text-sm md:text-base">
              <strong>Revelation Type:</strong> {surahDetails.revelationType}
            </p>
            <p className="text-sm md:text-base">
              <strong>Number of Ayahs:</strong> {surahDetails.numberOfAyahs}
            </p>
            <p className="text-sm md:text-base">
              <strong>Surah Number:</strong> {surahDetails.number}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="flex w-full">
        {listToggle ? (
          <div
            className={`${
              isSmallScreen ? 'w-full' : 'w-1/5'
            } bg-gray-200 overflow-y-auto p-2 border-r`}
          >
            <SurahButtons onSurahChange={handleSurahChange} />
          </div>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto">
            {surahDetails ? (
              <RenderSurahs selectedSurah={surahDetails} />
            ) : (
              <p className="text-gray-500">
                Select a Surah and an Edition to display details.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerseByVerseWithAudio;
