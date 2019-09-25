import React from "react";
import useGlobalHook from "use-global-hook";

export const addToCounter = (store, amount) => {
    const counter = store.state.counter + amount;
    store.setState({ counter });
};

const initialState = {
    users: []
};

const useGlobal = useGlobalHook(React, initialState, [addToCounter]);

export default useGlobal;
