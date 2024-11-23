import React from 'react';



// Props type definition
type SurahButtonsProps = {
    onSurahChange: (selectedSurah: number) => void; // Callback to notify parent
  };
  

// Complete list of Surahs with names and translations
const surahs = [
    { id: 1, name: "Al-Fatiha", translation: "The Opener" },
    { id: 2, name: "Al-Baqarah", translation: "The Cow" },
    { id: 3, name: "Al-Imran", translation: "Family of Imran" },
    { id: 4, name: "An-Nisa", translation: "The Women" },
    { id: 5, name: "Al-Ma'idah", translation: "The Table Spread" },
    { id: 6, name: "Al-Anam", translation: "The Cattle" },
    { id: 7, name: "Al-A'raf", translation: "The Heights" },
    { id: 8, name: "Al-Anfal", translation: "The Spoils of War" },
    { id: 9, name: "At-Taubah", translation: "The Repentance" },
    { id: 10, name: "Yunus", translation: "Jonah" },
    { id: 11, name: "Hud", translation: "Hud" },
    { id: 12, name: "Yusuf", translation: "Joseph" },
    { id: 13, name: "Ar-Ra'd", translation: "Thunder" },
    { id: 14, name: "Ibrahim", translation: "Abraham" },
    { id: 15, name: "Al-Hijr", translation: "The Stoneland" },
    { id: 16, name: "An-Nahl", translation: "The Bee" },
    { id: 17, name: "Al-Isra", translation: "The Night Journey" },
    { id: 18, name: "Al-Kahf", translation: "The Cave" },
    { id: 19, name: "Maryam", translation: "Mary" },
    { id: 20, name: "Ta-Ha", translation: "Ta-Ha" },
    { id: 21, name: "Al-Anbiya", translation: "The Prophets" },
    { id: 22, name: "Al-Hajj", translation: "The Pilgrimage" },
    { id: 23, name: "Al-Mu'minun", translation: "The Believers" },
    { id: 24, name: "An-Nur", translation: "The Light" },
    { id: 25, name: "Al-Furqan", translation: "The Criterion" },
    { id: 26, name: "Ash-Shu'ara", translation: "The Poets" },
    { id: 27, name: "An-Naml", translation: "The Ants" },
    { id: 28, name: "Al-Qasas", translation: "The Story" },
    { id: 29, name: "Al-Ankabut", translation: "Spider" },
    { id: 30, name: "Ar-Rum", translation: "The Romans" },
    { id: 31, name: "Luqman", translation: "Luqman" },
    { id: 32, name: "As-Sajdah", translation: "Prostration" },
    { id: 33, name: "Al-Ahzab", translation: "The Confederates" },
    { id: 34, name: "Saba", translation: "Sheba" },
    { id: 35, name: "Fatir", translation: "The Originator" },
    { id: 36, name: "Ya-Sin", translation: "Ya Sin" },
    { id: 37, name: "As-Saffat", translation: "Those Who Set the Ranks" },
    { id: 38, name: "Sad", translation: "The letter Saad" },
    { id: 39, name: "Az-Zumar", translation: "The Troops" },
    { id: 40, name: "Ghafir", translation: "The Forgiver" },
    { id: 41, name: "Fussilat", translation: "Explained in Detail" },
    { id: 42, name: "Ash-Shura", translation: "The Consultation" },
    { id: 43, name: "Az-Zukhruf", translation: "The Ornaments of Gold" },
    { id: 44, name: "Ad-Dukhan", translation: "The Smoke" },
    { id: 45, name: "Al-Jathiyah", translation: "The Crouching" },
    { id: 46, name: "Al-Ahqaf", translation: "The Wind Curved Sandhill" },
    { id: 47, name: "Muhammad", translation: "Muhammad" },
    { id: 48, name: "Al-Fath", translation: "The Victory" },
    { id: 49, name: "Al-Hujurat", translation: "The Private Chambers" },
    { id: 50, name: "Qaf", translation: "Qaf" },
    { id: 51, name: "Adh-Dhariyat", translation: "The Scatterers" },
    { id: 52, name: "At-Tur", translation: "The Mountain" },
    { id: 53, name: "An-Najm", translation: "The Star" },
    { id: 54, name: "Al-Qamar", translation: "The Moon" },
    { id: 55, name: "Ar-Rahman", translation: "The Beneficent" },
    { id: 56, name: "Al-Waqi'ah", translation: "The Inevitable" },
    { id: 57, name: "Al-Hadid", translation: "The Iron" },
    { id: 58, name: "Al-Mujadila", translation: "The Pleading Women" },
    { id: 59, name: "Al-Hashr", translation: "The Exile" },
    { id: 60, name: "Al-Mumtahanah", translation: "She That is to be Examined" },
    { id: 61, name: "As-Saff", translation: "The Ranks" },
    { id: 62, name: "Al-Jumu'ah", translation: "Congregation Prayer" },
    { id: 63, name: "Al-Munafiqun", translation: "The Hypocrites" },
    { id: 64, name: "At-Taghabun", translation: "Mutual Disposession" },
    { id: 65, name: "At-Talaq", translation: "The Divorce" },
    { id: 66, name: "At-Tahrim", translation: "The Prohibition" },
    { id: 67, name: "Al-Mulk", translation: "The Sovereignty" },
    { id: 68, name: "Al-Qalam", translation: "The Pen" },
    { id: 69, name: "Al-Haqqah", translation: "The Reality" },
    { id: 70, name: "Al-Ma'arij", translation: "The Ascending Stairways" },
    { id: 71, name: "Nuh", translation: "Noah" },
    { id: 72, name: "Al-Jinn", translation: "The Jinn" },
    { id: 73, name: "Al-Muzzammil", translation: "The Enshrouded One" },
    { id: 74, name: "Al-Muddaththir", translation: "The Cloaked One" },
    { id: 75, name: "Al-Qiyamah", translation: "The Resurrection" },
    { id: 76, name: "Al-Insan", translation: "The Man" },
    { id: 77, name: "Al-Mursalat", translation: "The Emissaries" },
    { id: 78, name: "An-Naba", translation: "The Tidings" },
    { id: 79, name: "An-Nazi'at", translation: "Those who drag forth" },
    { id: 80, name: "Abasa", translation: "He Frowned" },
    { id: 81, name: "At-Takwir", translation: "The Overthrowing" },
    { id: 82, name: "Al-Infitar", translation: "The Cleaving" },
    { id: 83, name: "Al-Mutaffifin", translation: "The Defrauding" },
    { id: 84, name: "Al-Inshiqaq", translation: "The Sundering" },
    { id: 85, name: "Al-Buruj", translation: "The Mansions of the Stars" },
    { id: 86, name: "At-Tariq", translation: "The Nightcommer" },
    { id: 87, name: "Al-Ala", translation: "The Most High" },
    { id: 88, name: "Al-Ghashiyah", translation: "The Overwhelming" },
    { id: 89, name: "Al-Fajr", translation: "The Dawn" },
    { id: 90, name: "Al-Balad", translation: "The City" },
    { id: 91, name: "Ash-Shams", translation: "The Sun" },
    { id: 92, name: "Al-Lail", translation: "The Night" },
    { id: 93, name: "Ad-Duha", translation: "The Morning Brightness" },
    { id: 94, name: "Ash-Sharh", translation: "The Expansion" },
    { id: 95, name: "At-Tin", translation: "The Fig" },
    { id: 96, name: "Al-Alaq", translation: "The Blood Clot" },
    { id: 97, name: "Al-Qadr", translation: "The Power" },
    { id: 98, name: "Al-Bayyina", translation: "The Evidence" },
    { id: 99, name: "Az-Zalzalah", translation: "The Earthquake" },
    { id: 100, name: "Al-Adiyat", translation: "The Courser" },
    { id: 101, name: "Al-Qari'ah", translation: "The Calamity" },
    { id: 102, name: "At-Takathur", translation: "Vying for increase" },
    { id: 103, name: "Al-Asr", translation: "The Declining Day" },
    { id: 104, name: "Al-Humazah", translation: "The Slanderer" },
    { id: 105, name: "Al-Fil", translation: "The Elephant" },
    { id: 106, name: "Quraysh", translation: "Quraish" },
    { id: 107, name: "Al-Ma'un", translation: "The Small Kindness" },
    { id: 108, name: "Al-Kawthar", translation: "The Abundance" },
    { id: 109, name: "Al-Kafirun", translation: "The Disbelievers" },
    { id: 110, name: "An-Nasr", translation: "The Divine Support" },
    { id: 111, name: "Al-Masad", translation: "The Palm Fiber" },
    { id: 112, name: "Al-Ikhlas", translation: "The Sincerity" },
    { id: 113, name: "Al-Falaq", translation: "The Daybreak" },
    { id: 114, name: "An-Nas", translation: "The Mankind" }
  ];

  const SurahButtons: React.FC<SurahButtonsProps> = ({ onSurahChange }) => {
    return (
        <div className="flex flex-col overflow-y-auto py-5 px-3 border-solid border-spacing-1 space-y-3">
          {surahs.map((surah) => (
            <button
              className="bg-green-900 text-white font-extrabold italic p-3 rounded hover:bg-red-700"
              key={surah.id}
              onClick={() => {
                onSurahChange(surah.id); // Trigger the callback to notify the parent
              }}
            >
            <div className='border-solid border-2 border-black'>
              <span className='text-xs'>{surah.id}.</span>    {surah.name} <br />
              <span className="text-sm text-black font-semibold shadow-white">{surah.translation}</span>
            </div>
            </button>
          ))}
        </div>
      );
  };
  
  export default SurahButtons;