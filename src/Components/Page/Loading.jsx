import { DNA } from "react-loader-spinner";

const Loading = ()=> {
    return (<div  className="w-screen h-screen fixed flex justify-center items-center bg-black/40 z-[99999]">
        <DNA
  visible={true}
  height="30"
  width="30"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
    </div>);
}

export default Loading;