'use client'; // Ensures this is a client component


const App = () => {


  return (
    <div className="h-screen flex flex-col mt-20 text-center">
      <h1 className="sm:text-xl md:text-4xl lg:text-7xl font-bold p-10">Welcome To Our Quran Hub</h1>
      <p className="font-bold sm:text-lg md:text-2xl lg:text-2xl ">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p>Welcome to a platform designed for your daily Quranic needs.<br/> Whether you&apos;re reciting verses,
         checking prayer times,<br/> or listening to beautiful recitations,
          feel free to use it as your own personal space for worship and reflection.
          <br/>Thank you for being here!</p>
    </div>
  ); // Component only redirects
};

export default App;
