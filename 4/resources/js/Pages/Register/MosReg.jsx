import Nav from "./MosReg/Nav"
import Body from "./MosReg/Body"
import { Theme } from "@radix-ui/themes"
import Alert from "@/comcom/Alert"
import Load from "@/comcom/Preload"

const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col">
                <title>ثبت نام مسافر</title>
                <Nav />
                <Body />
                <Alert />
            </div>
            <Alert />
        </Load>
    );
};

export default App;

