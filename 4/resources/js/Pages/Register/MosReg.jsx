import Nav from "./MosReg/Nav"
import Body from "./MosReg/Body"
import { Theme } from "@radix-ui/themes"
import Alert from "@/comcom/Alert"

const App = () => {
    return (
        <Theme className="w-full h-full flex items-center justify-start flex-col" style={{ background: "repeating-linear-gradient(180deg,#000 3px,#19085f 9px)", fontFamily: "!Vazir", direction: "rtl" }}>
            <title>ثبت نام مسافر</title>
            <Nav />
            <Body />
            <Alert />
        </Theme>
    );
};

export default App;

