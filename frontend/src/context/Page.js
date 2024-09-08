import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const PageContext = createContext();

export function PageProvider({ children }) {
    //to add (maybe)
    //page num data
    const [lightMode, setLightMode] = useState(Cookies.get('pageTheme') ? Cookies.get('pageTheme') === 'day' ? true : false : true); //handles light mode
    const [loadState, setLoadState] = useState(true); //handles visibility loading gif
    const [pageNum, setPageNum] = useState(1); //potentially useful for infinite scroll
    const [splashDisplay, setSplashDisplay] = useState(true); //decides if the splash screen will display songs or playlists
    const [searchKW, setSearchKW] = useState(""); //to hold searched phrase without changing url

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