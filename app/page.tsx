'use client';
import React, { useState } from 'react';
import Edition from '../components/Edition';
import SurahButtons from '../components/SurahButtons';
import RenderSurahs from '@/components/RenderSurahs';


const App = () => {
  // Parent state for the currently selected edition
  const [selectedEdition, setSelectedEdition] = useState<string>("en.asad");
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [listToggle, setListToggle] = useState<boolean>(false);


  // Callback to handle changes in the selected edition
  const handleEditionChange = (newEdition: string) => {
    setSelectedEdition(newEdition); // Update the parent state
    console.log(`App Component: Selected edition updated to "${newEdition}"`); // Log for clarity
  };
  // Callback to handle changes in the selected surah
  const handleSurahChange = (newSurah: number) => {
    setSelectedSurah(newSurah);
  };
  const handlebuttonListToggle = () => {
    setListToggle((previousValue) => !previousValue);
  } //on button click Toggle the state between true and false
  return (
    <div className="flex flex-col justify-center w-full max-w-screen  text-center  bg-gray-100">
      {/* Main Header Section */}
      <div className="text-center mb-2">
        
        <p className="text-lg w-full text-gray-700 mt-2">Please select a Version{selectedEdition}</p>
        <Edition onEditionChange={handleEditionChange}/>
        <div className='flex flex-row w-full items-start bg-black text-white'>
        <button 
        onClick={handlebuttonListToggle}
        className='text-center flex flex-row border-solid border-white border-2 m-1 p-1 w-1/6 md:w-1/4 sm:w-1/2'
        >
        {listToggle ? 'Click Here To Close Surah List' : 'Click Here For Surah List'}
        </button>
        </div>
        
      </div>

      {/* Content Section */}
      <div className="flex flex-row flex-grow  w-full mt-5">
        {/* Left Section: Surah Buttons */}
        {listToggle && (
          <div className="flex flex-col w-1/5  space-y-4 max-h-[700px] overflow-y-auto">
          <SurahButtons onSurahChange={handleSurahChange} />
        </div>
        )}
        

        {/* Right Section: Info Display */}
        <div className="flex flex-col w-full px-2  py-10 items-center space-y-4 max-h-[700px] overflow-y-auto">
          <div>
            <RenderSurahs selectedSurah={selectedSurah.toString()}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
