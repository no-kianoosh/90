import { use, useState } from "react";
import NewTrv from "../Body/NewTrv";
import Trvs from "../Body/Trvs";
import Trns from "../Body/Trns";
import Box from "../Body/Box";
import Spec from "../Body/Spec";
import User from "../Body/User";
import { G, GSet } from "../bmr1";

export default function Body() {
    const newtrv = G((O) => O.bod.newtrv);
    const trvs = G((O) => O.bod.trvs);
    const box = G((O) => O.bod.box);
    const trns = G((O) => O.bod.trns);
    const spec = G((O) => O.bod.spec);
    const user = G((O) => O.bod.user);

    return (
        <div className="w-full flex-1 p-1 m-1 border border-white/20 text-white mt-[24px]">
            <NewTrv hidden={!newtrv} />
            <Trns hidden={!trns} />
            <Trvs hidden={!trvs} />
            <Box hidden={!box} />
            <Spec hidden={!spec} />
            <User hidden={!user} />
        </div>
    );
}