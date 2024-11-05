import styles from "./DropDownMenu.module.css"
import { useNavContext } from "../../context/NavContext";
import { useState, useEffect } from "react";
import getListItems from "../../utility/getListItem";
import { FaArrowRight } from "react-icons/fa6";

export default function DropDownMenu() {
    const { activeLink } = useNavContext();
    const [listItems, setListItems] = useState([]);
    const [callActive, setCallActiveMenu ] = useState(null);

    useEffect(() => {
        const items = getListItems(activeLink);

        if(activeLink==="call"){
            setCallActiveMenu(activeLink);
            return;
        }

        setListItems(items || []);  // Ensure items are an array even if null
    }, [activeLink]);

    

    return (
        <>
            {!callActive ? (
                <div className={styles.dropdownContainer}>
                    {listItems.map((item, index) => (
                        <div key={index} className={styles.menuItem}>
                            <span>{item}</span>
                            <FaArrowRight className={styles.rightArrow} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.callActiveMenu}> {/* Changed <p> to <div> */}
                    Call us any time at +917636955111
                </div>
            )}
        </>
    );
}