
import { useState } from "react";
export default function NewTrv({ hidden }) {
    const [tst, setTst] = useState(1);
    return (
        <div hidden={hidden} className="w-full h-full">
            <button onClick={() => setTst(tst + 1)}>sasdas</button>
            {tst}
        </div>
    );
}