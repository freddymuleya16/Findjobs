import { createContext, useContext, useEffect, useState } from "react";
import { getSinglePage } from "@lib/contentParser";
import config from "@config/config.json";
const { blog_folder, pagination } = config.settings;
const SearchContext = createContext();

export const JsonContext =  ({ children }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSinglePage(`content/${blog_folder}/post`);
      setPosts(data);
    };
    fetchData();
  }, []);

  if (posts === null) {
    return <div>Loading...</div>;
  }

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
