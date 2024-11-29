import React from 'react';
import surahs from '../lib/SurahNameAndNumber';

interface SurahsInterface {
  id: number;
  name: string;
  translation: string;
}

// Props type definition
type SurahButtonsProps = {
    onSurahChange: (selectedSurah: number) => void; // Callback to notify parent
  };
  
  const SurahButtons: React.FC<SurahButtonsProps> = ({ onSurahChange }) => {
    return (
        <div className="flex flex-col overflow-y-auto  px-5 border-solid border-spacing-1 space-y-3">
          {surahs.map((surah : SurahsInterface) => (
            <button
              className="bg-green-900 text-white font-extrabold italic p-3 rounded hover:bg-red-700"
              key={surah.id}
              onClick={() => {
                onSurahChange(surah.id); // Trigger the callback to notify the parent
              }}
            >
            <div className='border-solid rounded border-2 border-black'>
              <span className='text-xs'>{surah.id}.</span>    {surah.name} <br />
              <span className="text-sm text-black font-semibold shadow-white">{surah.translation}</span>
            </div>
            </button>
          ))}
        </div>
      );
  };
  
  export default SurahButtons;