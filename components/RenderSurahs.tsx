import React, { useEffect, useState } from 'react';

// Define Ayah interface
interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

// Define the API response structure
interface SurahData {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
  };
}

interface RenderSurahsProps {
  selectedSurah: string;
}

const RenderSurahs: React.FC<RenderSurahsProps> = ({ selectedSurah }) => {
  // Type surahData as the 'data' object from the API response
  const [surahData, setSurahData] = useState<SurahData["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);  // Start loading
      setError(null);     // Clear previous errors
      setSurahData(null); // Clear previous data

      // Fetch Surah data from the API
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            setSurahData(data.data);  // Use the 'data' field from the API response
          } else {
            throw new Error('Invalid response structure');
          }
          setLoading(false);  // Finished loading
        })
        .catch((err) => {
          setError('Failed to fetch Surah data');  // Set error message
          console.error(err);  // Log error for debugging
          setLoading(false);  // Finished loading
        });
    }
  }, [selectedSurah]);  // Re-run the effect when selectedSurah changes

  // Return different UI based on loading, error, or data states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!surahData) {
    return <div>No Surah data available.</div>;
  }

  return (
    <div className="p-4">
      {/* Surah Metadata */}
      <div className="mb-6">
        <h2 className="text-2xl text-center font-bold">{surahData.name} ({surahData.englishName})</h2>
        <p><strong>Translation:</strong> {surahData.englishNameTranslation}</p>
        <p><strong>Revelation Type:</strong> {surahData.revelationType}</p>
        <p><strong>Number of Ayahs:</strong> {surahData.numberOfAyahs}</p>
        <p><strong>Surah Number:</strong> {surahData.number}</p>
      </div>

      {/* Ayah Lines */}
      <div>
        {surahData.ayahs.map((ayah: Ayah) => (
          <div key={ayah.numberInSurah} className="mb-6 hover:text-[white] hover:bg-black py-2 px-2">
            <div className="mb-2">
              <p className="lg:text-4xl md:text-2xl sm:text-xl">
                <strong className='text-xs text-gray-500'>{surahData.number}:{ayah.numberInSurah}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                {ayah.text}
                {ayah.sajda && (
                  <span className="text-red-500 font-semibold text-xs ml-2">Sajda</span>
                )}
              </p>
            </div>

            {/* Page info */}
            <p className="text-sm text-gray-500">
              <strong>Page:</strong> {ayah.page} | <strong>Ruku:</strong> {ayah.ruku} | <strong>Juz:</strong> {ayah.juz}
            </p>

            {/* Add a gap between each page */}
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderSurahs;
