import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const G = create(
    immer((set) => ({
        mod: {
            a1: false,
            a2: false,
            a3: false,
        },
        bod: {
            newtrv: true,
            trvs: false,
            box: false,
            trns: false,
            spec: false,
        },
        user: {
            type: "مسافران",
        },

        Update: (fn) => set((O) => { fn(O); }),

        Reset: (target) =>
            set((O) => {
                if (!O[target]) return; // safety check
                Object.keys(O[target]).forEach((k) => {
                    O[target][k] = false;
                });
            }),
    }))
);

export const GSet = (fn) => G.getState().Update((O) => fn(O));
export const RSet = (target) => G.getState().Reset(target);
