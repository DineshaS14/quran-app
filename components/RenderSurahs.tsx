import React, { useEffect, useState } from 'react';

// Interface definitions for the structure of data
interface Ayah {
  number: number; // The ayah number in the entire Quran
  text: string; // Arabic text of the ayah
  audio: string; // Audio URL for the recitation of the ayah
  numberInSurah: number; // Ayah number in the specific Surah
  juz: number; // Juz number in which the ayah belongs
  manzil: number; // Manzil number
  page: number; // Page number in the Quran
  ruku: number; // Ruku number for the ayah
  hizbQuarter: number; // Hizb quarter indicator
  sajda: boolean; // Indicates if the ayah is a Sajda ayah
}

interface Surah {
  number: number; // Surah number
  name: string; // Arabic name of the Surah
  englishName: string; // English name of the Surah
  englishNameTranslation: string; // Translation of the name
  revelationType: string; // Type of revelation (Meccan or Medinan)
  numberOfAyahs: number; // Total number of ayahs in the Surah
  ayahs: Ayah[]; // Array of Ayah objects
}

interface RenderSurahsProps {
  selectedSurah: Surah | null; // The Surah object to render
}

// Component to render the selected Surah
const RenderSurahs: React.FC<RenderSurahsProps> = ({ selectedSurah }) => {
  const [surahData, setSurahData] = useState<Surah | null>(null); // State to hold the Surah details
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Effect to update component whenever selectedSurah changes
  useEffect(() => {
    if (!selectedSurah) {
      setSurahData(null); // Clear Surah data if no Surah is selected
      setError('No Surah selected'); // Set error for display
      setLoading(false); // Stop loading
      return;
    }

    // Use selectedSurah directly as it contains the data
    setSurahData(selectedSurah);
    setLoading(false);
    setError(null);
  }, [selectedSurah]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Display message if no Surah data is available
  if (!surahData) {
    return <div>No Surah data available.</div>;
  }

  return (
    <div>
      {/* Surah Ayahs */}
      <div className="max-h-[750px] overflow-y-auto">
        {surahData.ayahs.map((ayah) => (
          <div
            key={ayah.numberInSurah}
            className="mb-6 cursor-pointer hover:text-white hover:bg-black px-2 border-2 border-black"
          >
            {/* Ayah Text */}
            <div className="mb-2 border-2 text-center border-gray-200 p-8">
              <p className="lg:text-4xl md:text-2xl sm:text-2xl">
                <strong className="text-xs text-gray-500 text-left">
                  {surahData.number}:{ayah.numberInSurah}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </strong>
                {ayah.text}
                {ayah.sajda && (
                  <span className="text-red-500 font-semibold text-xs ml-2">
                    Sajda
                  </span>
                )}
              </p>
            </div>

            {/* Ayah Info and Audio */}
            <div className="flex flex-row items-center border-2 border-gray-200 py-4 px-4">
              <p className="text-sm text-gray-500">
                <strong>Page:</strong> {ayah.page} | <strong>Ruku:</strong> {ayah.ruku} |{' '}
                <strong>Juz:</strong> {ayah.juz}
              </p>

              {/* Audio Player */}
              {ayah.audio && (
                <audio controls src={ayah.audio} className="w-full mt-2">
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            {/* Divider */}
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderSurahs;
