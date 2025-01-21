export const Section1 = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      {/* Content */}
      <div className="text-center text-white -mt-16 mb-5">
        <h1 className="drop-shadow-purple text-7xl outline-text">BEATS</h1>
        <p className="drop-shadow-darker text-2xl mt-5 outline-text">
          Please <span className="text-[#C2A2FF]">Type</span> the textfield below <br />
          to generate
        </p>
      </div>
      <div className="w-[50vw] h-[10vh] relative flex">
        <img src="/assets/homepage/music-icon.png" alt="music" className="w-[4.5rem] absolute -top-8 -left-10"/>
        <input
        className="w-full h-full text-white text-xl border-white border-2 px-10 bg-[#ffffff38] placeholder-white focus:outline-none"
        placeholder="type your music preference...."
        />
        <button type="submit"><img src="/assets/homepage/music-button.png" alt="submit" className="ml-4"/></button>
      </div>
    </section>
  );
};
