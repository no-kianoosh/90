import Nav from "./DriverReg/Nav"
import Body from "./DriverReg/Body"
import { Theme } from "@radix-ui/themes";
import Alert from "@/comcom/Alert";
import Load from "@/comcom/Preload"

const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col">
                <title>ثبت نام راننده</title>
                <Nav />
                <Body />
                <Alert />
            </div>
        </Load>
    );
};

export default App;

