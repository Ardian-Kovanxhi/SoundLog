import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const PageContext = createContext()

export function PageProvider({ children }) {
    const [lightMode, setLightMode] = useState(Cookies.get('pageTheme') ? Cookies.get('pageTheme') === 'day' ? true : false : true);
    const [loadState, setLoadState] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    return (
        <PageContext.Provider value={{
            lightMode, setLightMode,
            pageNum, setPageNum,
            loadState, setLoadState
        }}>
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    return useContext(PageContext);
}