import { MagnifyingGlass } from "react-loader-spinner";
const Searching = ({text}) => {
    return (
        <div className="bg-white w-full flex flex-col gap-4 py-8 justify-center items-center h-auto">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />

            <p className="text-xl text-black">{text}</p>
        </div>
    )
}

export default Searching;