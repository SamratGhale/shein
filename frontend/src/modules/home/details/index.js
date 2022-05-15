import { useContext, useState, useEffect } from "react";
import { PATH_APP } from "../../../routes/paths";
import { ItemsContext } from "../context";

const ItemDetail = () => {
    const { getById } = useContext(ItemsContext);
    const paths = window.location.pathname.split('/');
    const id = paths[paths.length - 1];
    const [item, setItem] = useState({});

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getById(id);
                console.log(res);
                setItem(res);
            } catch (err) {
                console.log(err);
                window.location = PATH_APP.root;
            }
        }
        init();
    }, []);
    return (
        <div>
            {item.item_name}
        </div>
    )
}
export default ItemDetail;