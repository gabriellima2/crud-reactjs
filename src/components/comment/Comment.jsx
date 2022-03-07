import { useContext } from 'react';

import './Comment.css';

export default function Comment(props) {
    const { 
        allContacts,
        setAllContacts,
        setEditDataValues,
        setIsEditing,
        ...rest 
    } = useContext(props.ctx);

    const handleEdit = id => {
        allContacts.map( contact => {
            if ( contact.id === id ) {
                setIsEditing(true);
                setEditDataValues({
                    id: contact.id,
                    name: contact.name,
                    email: contact.email
                });
                props.openModal();
            };
        });
    };
    
    const handleDelete = id => {
        setAllContacts( allContacts.filter( contact => {
            return contact.id !== id;
        }));
    };

    return (
        <>
            <tr id='data'>
                <td>{ props.id }</td>
                <td className='handle-table-item'>{ props.name }</td>
                <td className='handle-table-item'>{ props.email }</td>
                <td id='btns-area'>
                    <button
                        id='edit-btn'
                        className='action-btns'
                        onClick={ () => handleEdit(props.id) }
                    >Edit</button>
                    <button
                        id='del-btn'
                        className='action-btns'
                        onClick={ () => handleDelete(props.id) }
                    >Del</button>
                </td>
            </tr>
        </>
    );
};