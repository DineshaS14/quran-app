# Quran Application

## Overview
This Quran application is a comprehensive platform for exploring Quranic content. It provides features such as verse-by-verse recitation, prayer times, full Quran translations, and more. Users can explore Surahs, listen to audio recitations, and check prayer timings for their location. This README details the tools, technologies, APIs used, and instructions for running the project.

---

## Features
1. **Surah in Arabic Full**: Displays all Surahs in Arabic.
2. **Verse-by-Verse with Audio**: Plays recitations verse by verse.
3. **Full Translation**: Provides translations of Quranic verses in various languages.
4. **Prayer Times**: Displays prayer timings for any city entered by the user.

---

## Software and Tools Used
- **Frontend Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-side rendering and static web applications).
- **CSS Framework**: [TailwindCSS](https://tailwindcss.com/) (Utility-first CSS framework for styling).
- **State Management**: React hooks (`useState`, `useEffect`, etc.).
- **API Fetching**: Fetch API for making HTTP requests to third-party APIs.

---

## APIs Used
### 1. **AlAdhan API**  
   - **Base URL**: `https://api.aladhan.com/v1/timings`
   - **Purpose**: Fetches prayer times for a given location.
   - **Endpoints**:
     - `?latitude=<latitude>&longitude=<longitude>&method=2` - Fetches prayer timings based on coordinates.
     - **Example Response**:
       ```json
       {
         "data": {
           "timings": {
             "Fajr": "05:12",
             "Sunrise": "06:45",
             "Dhuhr": "12:30",
             "Asr": "15:45",
             "Maghrib": "18:15",
             "Isha": "19:45"
           }
         }
       }
       ```

### 2. **BigDataCloud API**  
   - **Base URL**: `https://api.bigdatacloud.net/data/reverse-geocode-client`
   - **Purpose**: Resolves a city name into geographical coordinates.
   - **Endpoints**:
     - `?localityLanguage=en&city=<city>` - Retrieves latitude, longitude, and city data.
     - **Example Response**:
       ```json
       {
         "city": "London",
         "latitude": 51.5074,
         "longitude": -0.1278,
         "countryName": "United Kingdom",
         "timezone": "Europe/London"
       }
       ```

### 3. **Quran API**  
   - **Base URL**: `https://alquran.cloud/api`
   - **Purpose**: Provides Quranic data, including Arabic text, translations, and audio recitations.
   - **Endpoints**:
     - `/surah` - Fetches all Surah details.
     - `/surah/<surah_number>` - Fetches details of a specific Surah.
     - `/surah/<surah_number>/<edition_identifier>` - Fetches verse-by-verse recitations for a specific edition.
     - **Example Response**:
       ```json
       {
         "data": {
           "number": 1,
           "name": "الفاتحة",
           "englishName": "Al-Fatihah",
           "englishNameTranslation": "The Opening",
           "ayahs": [
             {
               "number": 1,
               "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
               "audio": "https://cdn.islamic.network/quran/audio/128/ar.abdurrahmansudais/1.mp3"
             }
           ]
         }
       }
       ```

---

## How to Run the Application
### Prerequisites
1. Node.js and npm installed on your machine.
2. Basic understanding of React and Next.js.

### Steps to Run
1. Clone the repository:
   ```bash
   git clone <repository-url>
## Navigate to the Project Directory
```bash
cd quran-app
```
## Install Dependencies
```
npm install
```
## Start the Development Server
```
npm run dev
```

## Directory Structure
/components: Contains reusable components like SurahButtons and RenderSurahs.
/pages:
/index.tsx: Main landing page.
/prayerTimes: Displays prayer times.
/surahInArabic: Displays Surahs in Arabic.
/verseByVerseWithAudio: Plays audio recitations.
/fullTranslation: Displays full Quran translations.

## Expected Behavior
**Surah in Arabic Full:** Displays a list of Surahs in Arabic with additional metadata.
**Verse-by-Verse with Audio:** Users can select a Surah and edition to play verse-by-verse recitations.
**Full Translation:** Displays Surah translations based on the selected edition.
**Prayer Times:** Users can enter a city name to fetch prayer timings and Hijri dates.

## Troubleshooting
API Limitations:
If the API limit is exceeded, responses may fail. Wait before retrying or switch to another API key (if applicable).
Loading Issues:
Ensure that you have an active internet connection as the app relies on external APIs.
Cross-Origin Issues:
If you encounter CORS errors, use a proxy or configure your browser accordingly.

## Future Improvements
Offline support using a service worker.
Add a favorites feature for quick access to specific Surahs.
Improve responsiveness for smaller devices.

## Thank You!
Feel free to reach out to me shairdinesha9@gmail.com if you encounter issues or have suggestions for improvement. Enjoy exploring the Quran through this platform! 🌙