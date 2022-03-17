import { useContext } from "react";
import DataContext from "../../utils/context/DataContext";

import "./Contact.css";


export default function Comment({ data, openModal }) {
    const ctx = useContext(DataContext);

    const handleEdit = () => {
        ctx.contacts.map( contact => {
            if ( contact.id === data.id ) {
                ctx.setEditingData({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    active: true
                });
                openModal();
            };
        });
    };
    
    const handleDelete = () => {
        ctx.setContacts(ctx.contacts.filter((contact) => {
            return contact.id !== data.id
        }));
    };

    const handleKeyDown = ({key, target}) => {
        if (key === "Enter") {
            if (target.id === "edit-btn") {
                handleEdit();
            } else if (target.id === "del-btn") {
                handleDelete();
            };
        };
    };

    return (
        <>
            <tr id="data">
                <td>{ data.id }</td>
                <td className="handle-table-item">{data.name}</td>
                <td className="handle-table-item">{data.email}</td>
                <td id="btns-area">
                    <button
                        id="edit-btn"
                        className="action-btns"
                        onClick={handleEdit}
                        onKeyDown={handleKeyDown}
                    >Edit</button>
                    <button
                        id="del-btn"
                        className="action-btns"
                        onClick={handleDelete}
                        onKeyDown={handleKeyDown}
                    >Del</button>
                </td>
            </tr>
        </>
    );
};