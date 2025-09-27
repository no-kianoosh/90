// App.jsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";

const App = () => {
    function MyApp() {
        return (
            <Flex direction="column" gap="2">
                <Text>Hello from Radix Themes :)</Text>
                <Button>Let's go</Button>
            </Flex>
        );
    }


    return (
        <Theme>
            <MyApp />
        </Theme>
    );
};

export default App;