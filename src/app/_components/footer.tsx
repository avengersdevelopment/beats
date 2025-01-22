export const Footer = () => {
  return (
    <footer className="w-full h-[12vh] bg-[url('/assets/homepage/footer.png')] bg-no-repeat bg-cover bg-top text-white py-[2vh]">
      <div className="h-full w-full flex justify-center gap-6">
        <button className="relative">
          <img src="/assets/homepage/footer1.png" alt="" className="h-full" />
          <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1.5vw]">x</h1>
        </button>
        <button className="relative">
          <img src="/assets/homepage/footer2.png" alt="" className="h-full" />
          <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1vw]">library</h1>
        </button>
        <button className="relative">
          <img src="/assets/homepage/footer3.png" alt="" className="h-full" />
          <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1vw]">dex</h1>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
