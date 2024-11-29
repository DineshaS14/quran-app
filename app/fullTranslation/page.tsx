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
// Interfaces for Ayah and Surah
// This interface defines the structure for each Ayah (verse) in a Surah.
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

const FullTranslation = () => {
  const [editions, setEditions] = useState<Edition[]>([]); // List of editions
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null); // Selected edition
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null); // Selected Surah number
  const [surahDetails, setSurahDetails] = useState<Surah | null>(null); // Fetched Surah details
  const [listToggle, setListToggle] = useState<boolean>(false); // Toggle state for Surah list
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // Monitor screen size

  /**
   * Effect to monitor screen size changes.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Small screens
    const handleMediaChange = () => setIsSmallScreen(mediaQuery.matches); // Update `isSmallScreen`
    handleMediaChange(); // Check initial screen size
    mediaQuery.addEventListener('change', handleMediaChange); // Add event listener

    // Cleanup event listener
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  /**
   * Fetch available editions on component mount.
   */
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const response = await fetch(
          'https://api.alquran.cloud/v1/edition?format=text&type=translation'
        );
        const data = await response.json();
        setEditions(data.data); // Populate editions
      } catch (error) {
        console.error('Error fetching editions:', error);
      }
    };

    fetchEditions();
  }, []);

  /**
   * Fetch Surah details when `selectedSurah` and `selectedEdition` change.
   */
  useEffect(() => {
    if (selectedSurah && selectedEdition) {
      const fetchSurahDetails = async () => {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedEdition.identifier}`
          );
          const data = await response.json();
          setSurahDetails(data.data); // Update Surah details
        } catch (error) {
          console.error('Error fetching Surah details:', error);
        }
      };

      fetchSurahDetails();
    }
  }, [selectedSurah, selectedEdition]);

  /**
   * Handle edition selection from dropdown.
   */
  const handleEditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const edition = editions.find((ed) => ed.identifier === selectedValue);
    setSelectedEdition(edition || null); // Update selected edition
  };

  /**
   * Handle Surah selection from buttons.
   */
  const handleSurahChange = (newSurah: number) => setSelectedSurah(newSurah);

  /**
   * Toggle the Surah list visibility.
   */
  const handleListToggle = () => setListToggle((prev) => !prev);

  return (
    <div className="flex flex-col w-full h-screen max-w-screen bg-white">
      {/* Header Section */}
      <div className="text-center justify-center mb-2">
        <div
          className={`flex w-full ${
            isSmallScreen && listToggle ? 'flex-col' : 'justify-between'
          } bg-black`}
        >
          {/* Toggle Button */}
          <div
            className={`flex ${
              isSmallScreen ? 'w-full' : 'w-2/5 flex-grow'
            } text-white`}
          >
            <button
              onClick={handleListToggle}
              className={`justify-center rounded flex flex-row border-solid border-white border-2 m-1 hover:bg-green-900 py-1 ${
                isSmallScreen ? 'w-full' : 'w-full md:w-1/4 sm:w-1/2'
              }`}
            >
              {listToggle ? 'Hide Surah List' : 'Show Surah List'}
            </button>
          </div>

          {/* Dropdown */}
          <div
            className={`flex ${
              isSmallScreen ? 'w-full' : 'flex-grow w-2/5'
            } p-1`}
          >
            <select
              id="edition-select"
              value={selectedEdition?.identifier || ''}
              onChange={handleEditionChange}
              className={`${
                isSmallScreen ? 'w-full' : 'w-full sm:w-1/2'
              } border border-gray-300 p-2 rounded`}
            >
              <option value="">Select Edition</option>
              {editions.map((edition) => (
                <option key={edition.identifier} value={edition.identifier}>
                  {edition.englishName} ({edition.language})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Surah Details */}
        {surahDetails && (
          <div className="mb-0 border-2 border-black ml-1 mr-1">
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

      {/* Main Content Section */}
      <div
        className={`flex ${
          isSmallScreen && listToggle ? 'flex-col' : 'flex-row'
        } w-full`}
      >
        {/* Surah Buttons */}
        {listToggle && (
          <div
            className={`flex flex-col ${
              isSmallScreen ? 'w-full' : 'w-1/5'
            } space-y-4 max-h-[700px] overflow-y-auto`}
          >
            <SurahButtons onSurahChange={handleSurahChange} />
          </div>
        )}

        {/* Surah Details */}
        {!isSmallScreen || !listToggle ? (
          <div className="flex flex-col w-full px-4 max-h-[800px] overflow-y-auto items-center border-2 border-black space-y-4">
            {surahDetails ? (
              <RenderSurahs selectedSurah={surahDetails} />
            ) : (
              <p className="text-lg text-gray-500">
                Select a Surah and an Edition to display details.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FullTranslation;
