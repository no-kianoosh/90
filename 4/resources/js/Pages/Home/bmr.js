import { useReducer } from "react";

/////////////////////////////////
const initialState = {
    mod: {
        download: false,
        login: true,
        rules: false,
    },
    bod: {
        b1: true,
        b2: false,
    },
    user: {
        type: "",
    }
};

function reducer(state, action) {
    const { type, act, val, prp } = action;

    if (type === "user") {
        return {
            ...state,
            [type]: {
                ...state[type],
                [prp]: val, // ✅ immutably set the value
            },
        };
    }
    if (act === "set") {
        return {
            ...state,
            [type]: {
                ...state[type],
                [val]: true, // ✅ immutably set the value
            },
        };
    }
    if (act === "rset") {
        return {
            ...state,
            [type]: {
                ...state[type],
                [val]: false, // ✅ immutably rset the value
            },
        };
    }

    throw new Error("Unknown action: " + type);
}

export default function useBmr() {
    const [O, ST] = useReducer(reducer, initialState);
    return { O, ST }; // ✅ return as object for cleaner context
}
