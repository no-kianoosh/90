// App.jsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";
import NavigationDesktop from "./components/NavigationDesktop";
import BodyDesktop from "./components/BodyDesktop";
import Footer from "./components/footer";
import Alert from "../../comcom/Alert";
import Load from "@/comcom/Preload"

const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col">
                <title>HopOn</title>
                <NavigationDesktop />
                <BodyDesktop />
                <Footer />
                <Alert />
            </div>
        </Load >

    );
};

export default App;

