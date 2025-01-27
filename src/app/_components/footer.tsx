"use client";

import { useConfig } from "@/store/config";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // return (
  //   <>
  //     <footer className="w-full h-[12vh] bg-[url('/assets/homepage/footer.png')] bg-no-repeat bg-cover bg-top text-white py-[2vh]">
  //       <div className="h-full w-full flex justify-center gap-6">
  //         <button className="relative">
  //           <img src="/assets/homepage/footer1.png" alt="" className="h-full" />
  //           <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1.5vw]">x</h1>
  //         </button>
  //         <button className="relative" onClick={() => setIsModalOpen(true)}>
  //           <img src="/assets/homepage/footer2.png" alt="" className="h-full" />
  //           <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1vw]">library</h1>
  //         </button>
  //         <button className="relative">
  //           <img src="/assets/homepage/footer3.png" alt="" className="h-full" />
  //           <h1 className="absolute h-full w-full top-0 left-0 flex items-center justify-center text-[1vw]">dex</h1>
  //         </button>
  //       </div>
  //     </footer>
  //     <DraggableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  //       <div className="space-y-4">
  //         {modalDummyJson.map((dataJson, idx) => (<ListTile data={dataJson} key={idx} />))}
  //       </div>
  //     </DraggableModal>
  //   </>
  // );

  const xCoinUrl = useConfig()((state) => state?.config?.x_coin_url);
  const buyUrl = useConfig()((state) => state?.config?.buy_url);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-[20vh] w-full justify-center bg-[url('/assets/home/footer.png')] bg-cover bg-top">
      <div className="flex h-full w-[80vw] items-center justify-center gap-[2vw]">
        <Link href={xCoinUrl || ""} target="_blank">
          <Image
            src={"/assets/home/btn-x.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[7vw] hover:animate-shake"
            priority
          />
        </Link>

        <Image
          src={"/assets/home/btn-library.png"}
          width={480}
          height={480}
          alt=""
          className="h-auto w-[16vw] cursor-pointer hover:animate-shake"
          priority
        />

        <Link href={buyUrl || ""} target="_blank">
          <Image
            src={"/assets/home/btn-dex.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[10vw] hover:animate-shake"
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;

// interface IListTile {
//   data: {
//     title: string;
//     generated_on: string;
//     duration: string;
//     src: string
//   };
//   key: any
// }

// const ListTile = ({ data, key }: IListTile) => (<>
//   <div
//     key={key}
//     className="flex overflow-x-hidden"
//   >
//     <div className="mr-4 w-auto min-w-[20rem]">
//       <h3 className="font-bold p-2 bg-white text-black truncate mb-2 w-fit max-w-[25rem]">{data.title}</h3>
//       <p>Generated on: {data.generated_on}</p>
//       <p>Duration: {data.duration}</p>
//     </div>
//     <div className="w-full flex justify-end items-start gap-2">
//       <button>
//         <Image src={"/assets/modal/play.png"} width={500} height={500} alt="play" className="w-[9vh]" />
//       </button>
//       <button>
//         <Image src={"/assets/modal/download.png"} width={500} height={500} alt="download" className="w-[9vh]" />
//       </button>
//       <button>
//         <Image src={"/assets/modal/delete.png"} width={500} height={500} alt="delete" className="w-[9vh]" />
//       </button>
//     </div>
//   </div>
//   <div className="w-full border-2 border-dashed"></div>
// </>)
