"use client";
import React, { createContext, useContext } from "react";
import store from "@/store"; // Ensure the correct path to your store

// Create a Context with the store as the default value
export const StoreContext = createContext({ store });

// Create a custom hook to access the store
export const useStore = () => {
	return useContext(StoreContext).store;
};

// Create the provider component
const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <StoreProvider>{children}</StoreProvider>;
};

export default AppProvider;
