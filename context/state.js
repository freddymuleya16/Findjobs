import { createContext, useContext } from "react";
import posts from "./posts.json";
import { getSinglePage } from "@lib/contentParser";
import config from "@config/config.json";
const { blog_folder, pagination } = config.settings;
const SearchContext = createContext();

export const JsonContext = ({ children }) => {
  const posts =  getSinglePage(`content/${blog_folder}/post`)
  const state = {
    posts,
  };
  
  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
