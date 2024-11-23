import React, { useEffect, useState } from 'react';

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
  const [surahData, setSurahData] = useState<SurahData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSurah) {
      // Reset the state when the selectedSurah changes
      setLoading(true);
      setError(null);
      setSurahData(null);

      // Fetch Surah data
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
        .then((response) => response.json())
        .then((data) => {
          setSurahData(data.data); // Assuming the API returns the Surah data in the 'data' field
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch Surah data');
          setLoading(false);
        });
    }
  }, [selectedSurah]);

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
        <h2 className="text-2xl font-bold">{surahData.name} ({surahData.englishName})</h2>
        <p><strong>Translation:</strong> {surahData.englishNameTranslation}</p>
        <p><strong>Revelation Type:</strong> {surahData.revelationType}</p>
        <p><strong>Number of Ayahs:</strong> {surahData.numberOfAyahs}</p>
        <p><strong>Surah Number:</strong> {surahData.number}</p>
      </div>

      {/* Ayah Lines */}
      <div>
        {surahData.ayahs.map((ayah: Ayah) => (
          <div key={ayah.numberInSurah} className="mb-6 hover:text-[white] hover:bg-black py-2 px-2">
            <div className="mb-2 ">
              <p className="text-2xl ">
                <strong className='text-xs text-gray-500'>{surahData.number}:{ayah.numberInSurah}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                {ayah.text}
                {ayah.sajda && (
                  <span className="text-red-500 font-semibold ml-2">Sajda</span>
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
