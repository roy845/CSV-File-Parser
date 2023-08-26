import { useState, useContext, createContext } from "react";

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [parsedData, setParsedData] = useState([]);
  const [file, setFile] = useState(null);

  return (
    <DataContext.Provider
      value={{
        parsedData,
        setParsedData,
        file,
        setFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

//custom hook
const useData = () => useContext(DataContext);

export { useData, DataProvider };
