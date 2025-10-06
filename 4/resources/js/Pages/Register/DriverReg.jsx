import Nav from "./DriverReg/Nav"
import Body from "./DriverReg/Body"
import { Theme } from "@radix-ui/themes";
import Alert from "@/comcom/Alert";

const App = () => {
    return (
        <Theme className="w-full h-full flex items-center justify-start flex-col" style={{ background: "repeating-linear-gradient(180deg,#000 3px,#19085f 9px)", fontFamily: "!Vazir", direction: "rtl" }}>
            <title>ثبت نام راننده</title>
            <Nav />
            <Body />
            <Alert />
        </Theme>
    );
};

export default App;

