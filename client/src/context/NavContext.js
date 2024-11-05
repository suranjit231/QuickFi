import { createContext, useContext, useState } from "react";
import { useEffect } from "react";


//====== creating navcontext =========//
const NavContext = createContext();

export function useNavContext(){
    const value = useContext(NavContext);

    return value;
}


//======== create a navcontect provider ==========//
export function NavContextProvider({children}){
    const [activeLink, setActiveLink] = useState(null); 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSticky, setIsSticky] = useState(false);
    const [ isUserSidebar, setUserSidebar ] = useState(false);


    useEffect(() => {
        // Function to check window size and update isMobile state
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
           
          }
        };
    
        // Initial check on mount
        handleResize();
    
        // Attach event listener for window resizing
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []); 


        useEffect(() => {
          // Function to handle the scroll event
          const handleScroll = () => {
              const scrollPosition = window.scrollY;
              // Set sticky when the scroll position is past the navbar
              if (scrollPosition >85) {  // Adjust 50 based on when you want the sticky to apply
                  setIsSticky(true);
              } else {
                  setIsSticky(false);
              }
          };
  
          // Add the scroll event listener
          window.addEventListener("scroll", handleScroll);
  
          // Cleanup the event listener when the component unmounts
          return () => {
              window.removeEventListener("scroll", handleScroll);
          };
      }, []);




    let hoverTimer ;

    function showDropDown(link) {
        clearTimeout(hoverTimer);
        setActiveLink(link);  // Set the active link to the hovered link
    }

    function hideDropDown() {
       hoverTimer = setTimeout(()=>{
            setActiveLink(null);  // Reset the active link on mouse leave
        },300)

        
    }



    //========== toggle user sidebar ==================//
    function toggleUserSideBar(){
        setUserSidebar((prev)=> !prev)
    }



    //====== provide state to the children =========//
    return(
        <NavContext.Provider value={{activeLink, showDropDown,
         hideDropDown, isMobile, isSticky, isUserSidebar, toggleUserSideBar}}>
        { children }
        </NavContext.Provider>


    )
}