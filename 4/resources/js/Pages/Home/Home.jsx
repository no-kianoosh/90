// App.jsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";
import NavigationDesktop from "./components/NavigationDesktop";

const App = () => {

    return (
        <Theme dir="rtl" className="w-full h-full pt-1" style={{ background: "repeating-linear-gradient(180deg,#000 3px,#19085f 9px)" }}>
            <title>Cheepy</title>
            <NavigationDesktop />


        </Theme>
    );
};

export default App;