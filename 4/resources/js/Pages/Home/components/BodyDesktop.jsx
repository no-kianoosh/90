import SearchBox from "./desk-comp/TravelSearchBox";
import TrvTable from "./desk-comp/Table";
import Card1 from "./desk-comp/Card1";
import Card2 from "./desk-comp/Card2";

const BodyDesktop = () => {
    return (
        <div className="flex flex-col">
            <div className="relative max-w-full w-full flex flex-row justify-center items-center">
                <img
                    src="/img/login-background.jpg"
                    className="w-[98%] h-60 m-2 rounded-2xl border border-white"
                    alt="Background"
                />
                <div className="absolute top-15 w-full text-center text-[200%] text-white">
                    Hop on Baby
                </div>
                <div className="absolute -bottom-[15px] max-w-[95%] w-full text-center flex items-center justify-center">
                    <SearchBox />
                </div>
            </div>
            <TrvTable />
            <Card1 />
            <Card2 />
            <div className="w-full h-[2px] bg-white mu-3"></div>
        </div>
    );
};

export default BodyDesktop;
