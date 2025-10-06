// App.jsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";
import NavigationDesktop from "./components/NavigationDesktop";
import BodyDesktop from "./components/BodyDesktop";
import Footer from "./components/footer";
import Alert from "../../comcom/Alert";
import Load from "@/comcom/Skeleton"

const App = () => {
    return (
        <Theme className="w-full h-full pt-1" style={{ background: "repeating-linear-gradient(180deg,#000 3px,#19085f 9px)", fontFamily: "!Vazir" }}>
            <Load>
                <title>HopOn</title>
                <NavigationDesktop />
                <BodyDesktop />
                <Footer />
                <Alert />
            </Load>
        </Theme>
    );
};

export default App;

