import { useState, useRef, useEffect, useCallback, createContext } from "react";
import Modal from "../modal/Modal";
import Comment from '../comment/Comment';

import './Wrapper.css';

const EDIT_STANDARD_DATA_VALUE = {
    id: null,
    name: null,
    email: null
};

function dataInLocalStorage(key, initialObject) {
    const data = localStorage.getItem(key);

    // Insere um novo dado e retorna o valor inicial passado no parâmetro.
    if ( !data ) {
        localStorage.setItem(key, JSON.stringify(initialObject));
        return Object.values(initialObject)[0];
    };

    return data;
};

function contactsDataInLocalStorage() {
    const contacts = dataInLocalStorage('contacts', {allContacts: []});
    
    // Verifica se foi retornado um JSON!
    if ( typeof(contacts) === 'string' ) {
        const { allContacts } = JSON.parse(contacts);
        return allContacts;
    };

    return contacts;
};

function IDDataInLocalStorage() {
    const id = dataInLocalStorage('id', {value: 0});
    const allContacts = contactsDataInLocalStorage();

    // Verifica se foi retornado um JSON.
    if ( typeof(id) === 'string' ) {
        const IDDataConverted = JSON.parse(id);

        // Verifica se tem contatos ja adicionado e se o JSON convertido não tem valor.
        if ( allContacts.length > 0 && !IDDataConverted.value ) {
            // Para o ID começar somando a partir do ID do último contato.
            const lastContact = allContacts[allContacts.length - 1];
            const newId = lastContact.id + 1;
            return newId;
        };

        return Number(IDDataConverted.value);
    };

    return Number(id);
};

const Context = createContext();

export default function Wrapper() {
    const modalAddRef = useRef(null);

    const [ allContacts, setAllContacts ] = useState(contactsDataInLocalStorage());
    const [ id, setId ] = useState(IDDataInLocalStorage());

    // States para controlar a edição de dados!
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editDataValues, setEditDataValues ] = useState(EDIT_STANDARD_DATA_VALUE);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify({allContacts}));
    }, [ allContacts ]);

    useEffect(() => {
        console.log(id)
        localStorage.setItem('id', JSON.stringify({value: id}));
    }, [ id ]);

    // Coloca o valor padrão nos states de edição para 'limpar' a tela.
    useEffect(() => {
        setIsEditing(false);
        setEditDataValues(EDIT_STANDARD_DATA_VALUE);
    }, [ allContacts ]);

    const openModal = useCallback(() => {
        modalAddRef.current.handleActiveModal();
    }, []);

    return (
        <div id='main'>
            <div id='add-contact-area'>
                <p>Adicione um contato</p>
                <button onClick={ openModal } id='add-btn'>+</button>
            </div>

            <Context.Provider value={{
                allContacts,
                setAllContacts,
                editDataValues,
                setEditDataValues,
                isEditing,
                setIsEditing,
                EDIT_STANDARD_DATA_VALUE
            }}>
                <Modal
                    ref={ modalAddRef }
                    id={ id }
                    setId={ setId }
                    ctx={ Context }
                />
                <div id='table-area'>
                    <table id='data-table'>
                        <thead id='thead'>
                            <tr id='description'>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id='tbody'>
                            {
                                allContacts.map( contact => (
                                    <Comment 
                                        id={ contact.id } 
                                        name={ contact.name } 
                                        email={ contact.email } 
                                        openModal={ openModal }
                                        ctx={ Context }
                                        key={ contact.id } 
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Context.Provider>
            
        </div>
    );
};