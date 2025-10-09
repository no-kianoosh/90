import React, { useState } from "react";
import { Circle } from "lucide-react";

export default function OlympicToggle({ open }) {


    return (
        <div className="flex text-white justify-between py-1 cursor-pointer max-w-[50px] w-fit" >
            <Circle />
            <Circle className={`${open ? "-mr-3" : "-mr-6"} transition-all duration-500`} />
            <Circle className={`${open ? "-mr-3" : "-mr-6"} transition-all duration-500`} />
        </div>

    );
}
