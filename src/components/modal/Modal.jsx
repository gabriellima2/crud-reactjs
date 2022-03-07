import { useState, useCallback, forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import Input from '../input/Input';

import './Modal.css';


function Modal(props, ref) {
    const { 
        allContacts,
        setAllContacts,
        editDataValues,
        setEditDataValues,
        isEditing,
        setIsEditing,
        EDIT_STANDARD_DATA_VALUE
    } = useContext(props.ctx);

    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ handleError, setHandleError ] = useState({
        active: false,
        msg: null
    });


    // Pega os valores dos inputs valida e verifica se é uma edição ou adição.
    const validate = () => {
        const valueName = inputNameRef.current.value;
        const valueEmail = inputEmailRef.current.value;

        const verifyEmail = () => {
            const rgx = /^[\w0-9(_.\-)?]+@[\w0-9]+\.[\w\.]+[\w]?$/;
            return rgx.test(valueEmail);
        }

        if ( !valueName || !valueEmail ) {
            setHandleError({
                active: true,
                msg: 'Preencha todo os campos!'
            });
            return;
        };

        if ( !verifyEmail() ) {
            setHandleError({
                active: true,
                msg: 'Digite um Email válido!'
            });
            return;
        };

        if ( isEditing ) {
            handleEdit(valueName, valueEmail);
            return;
        };

        createContact(valueName, valueEmail);
    };

    const handleEdit = (name, email) => {
        allContacts.map( contact => {
            if ( contact.id === editDataValues.id ) {
                contact.name = name;
                contact.email = email;
                setAllContacts( [...allContacts] );
            };
        });
        handleDesactiveModal();
    };

    const createContact = (name, email) => {        
        const newContact = {
            id: props.id,
            name,
            email
        };
        props.setId( state => state + 1 );
        setAllContacts( [...allContacts, newContact] );
        handleDesactiveModal();
    };

    // Para fechar o modal no X ou clicando na area de fora do modal.
    const closeModal = useCallback(({ target }) => {
        if ( target.id === 'modal-area' || target.id === 'close-btn' ) {
            handleDesactiveModal();
        };
    }, []);

    const handleActiveModal = useCallback(() => setIsVisible(true), []);

    const handleDesactiveModal = useCallback(() => {
        setIsVisible(false);
        setHandleError({
            active: false,
            msg: null
        });
        
        setEditDataValues(EDIT_STANDARD_DATA_VALUE);
        setIsEditing(false);
    }, []);

    useImperativeHandle( ref, () => {
        return {
            handleActiveModal,
        };
    });

    if ( !isVisible ) return null;

    return (
        <div id='modal-area' onClick={ closeModal }>
            <div id='modal'>
                <button onClick={ closeModal } id='close-btn'>X</button>
                <div id='inputs-area'>
                    <div id='name-area'>
                        <Input
                            value={ editDataValues.name || null }
                            required={ true }
                            autoFocus={ true }
                            ref={ inputNameRef }
                            label='Nome'
                            type='text'
                            id='name'
                        />
                    </div>
                    <div id='email-area'>
                        <Input
                            value={ editDataValues.email || null }
                            required={ true }
                            autoFocus={ false }
                            ref={ inputEmailRef }
                            label='Email'
                            type='email'
                            id='email'
                        />
                    </div>
                </div>
                <div id='lower-area'>
                    <span id='erro'>{ handleError.active ? handleError.msg : null }</span>
                    <button
                        id='submit-btn'
                        onClick={ validate }
                    >{ isEditing ? 'Confirmar' : 'Enviar' }</button>
                </div>

            </div>       
        </div>
        
    );
};

export default forwardRef(Modal);