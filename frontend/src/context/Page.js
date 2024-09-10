import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const PageContext = createContext();

export function PageProvider({ children }) {
    //to add (maybe)
    //page num data
    const [lightMode, setLightMode] = useState(Cookies.get("pageTheme") ? Cookies.get('pageTheme') === 'day' ? true : false : true);
    const [loadState, setLoadState] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [splashDisplay, setSplashDisplay] = useState(Cookies.get("splashState") ? Cookies.get("splashState") === "songs" ? true : false : true);
    const [searchKW, setSearchKW] = useState("");

    return (
        <PageContext.Provider value={{
            lightMode, setLightMode,
            loadState, setLoadState,
            splashDisplay, setSplashDisplay,
            pageNum, setPageNum,
            searchKW, setSearchKW
        }}>
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    return useContext(PageContext);
}