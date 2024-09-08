import { ThreeCircles } from "react-loader-spinner";

const Loading = ({text})=> {
    return (<div  className="fixed left-0 top-0 z-[99999999] w-screen h-screen flex flex-col gap-4 justify-center items-center bg-black/50 backdrop-blur">
       <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#228B22"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  <p className="text-white text-2xl">{text}</p>
    </div>);
}

export default Loading;