import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const G = create(
    immer((set) => ({

        mod: {
            download: false,
            login: false,
            rules: false,
        },
        bod: {
            b1: true,
            b2: false,
        },
        user: {
            type: "مسافران",
        },

        Update: (fn) =>
            set((state) => {
                fn(state);
            }),
    }))
);

export const GSet = (fn) => {
    G.getState().Update((O) => { fn(O) });
};

