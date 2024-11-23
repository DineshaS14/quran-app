'use client';
import React, { useState } from 'react';
import Edition from '../components/Edition';
import SurahButtons from '../components/SurahButtons';
import RenderSurahs from '@/components/RenderSurahs';

const App = () => {
  // Parent state for the currently selected edition
  const [selectedEdition, setSelectedEdition] = useState<string>("en.asad");
  const [selectedSurah, setSelectedSurah] = useState<number>(1);


  // Callback to handle changes in the selected edition
  const handleEditionChange = (newEdition: string) => {
    setSelectedEdition(newEdition); // Update the parent state
    console.log(`App Component: Selected edition updated to "${newEdition}"`); // Log for clarity
  };
  // Callback to handle changes in the selected surah
  const handleSurahChange = (newSurah: number) => {
    setSelectedSurah(newSurah);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Main Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-6xl font-extrabold text-black">My Quran App</h1>
        <p className="text-lg text-gray-700 mt-2">Please select a Version</p>
        <p>Selected Edition: {selectedEdition}</p>
        <Edition onEditionChange={handleEditionChange}/>
      </div>

      {/* Content Section */}
      <div className="flex flex-row flex-grow justify-between w-full max-w-6xl mt-5">
        {/* Left Section: Surah Buttons */}
        <div className="flex flex-col items-start space-y-4 max-h-[700px] overflow-y-auto">
          <SurahButtons onSurahChange={handleSurahChange} />
        </div>

        {/* Right Section: Info Display */}
        <div className="flex flex-col px-16 py-10 items-start space-y-4 max-h-[700px] overflow-y-auto ml-auto flex-1">
          <div>
            <RenderSurahs selectedSurah={selectedSurah.toString()}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
