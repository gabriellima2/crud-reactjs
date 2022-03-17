import { useState,
    forwardRef,
    useImperativeHandle,
    useContext,
    useEffect }
from "react";

import DataContext from "../../utils/context/DataContext";
import Input from "../input/Input";

import "./Modal.css";


function Modal(props, ref) {
    const ctx = useContext(DataContext);

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");

    const [ isVisible, setIsVisible ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState({active: false, msg: null})

    useEffect(() => {
        if (ctx.editingData.active) {
            setName(ctx.editingData.name);
            setEmail(ctx.editingData.email);
        };
    }, [ctx.editingData]);

    const handleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const closeModal = () => {
        setIsVisible(false);
        setErrorMessage({active: false, msg: null});
        
        ctx.setEditingData({
            id: null,
            name: null,
            email: null,
            active: false
        });

        setName("");
        setEmail("");
    };

    const handleClose = ({ target }) => {
        if (target.id === "modal-area" || target.id === "close-btn") {
            closeModal();
        };
    };

    const validate = () => {
        const emailValidate = () => {
            const rgx = /^[\w0-9(_.\-)?]+@[\w0-9]+\.[\w\.]+[\w]?$/;
            return rgx.test(email);
        };

        if (!name || !email) {
            setErrorMessage({
                active: true,
                msg: "Por favor, preencha todos os campos!"
            });
            return;
        } else if (!emailValidate()) {
            setErrorMessage({
                active: true,
                msg: "Digite um Email válido!"
            });
            return;
        };

        if ( ctx.editingData.active ) return handleEdit();
    
        createNewContact();
    };

    const handleEdit = () => {
        ctx.contacts.map(contact => {
            if (contact.id === ctx.editingData.id) {
                contact.name = name;
                contact.email = email;
                ctx.setContacts([...ctx.contacts]);
            };
        });
        closeModal();
    };

    const createNewContact = () => {
        const newContact = {
            id: ctx.id,
            name,
            email
        };

        ctx.setId(current => current + 1);
        ctx.setContacts([ ...ctx.contacts, newContact ]);
        closeModal();
    };

    useImperativeHandle(ref, () => {
        return {
            handleVisibility
        };
    });

    if ( !isVisible ) return null;

    return (
        <div id="modal-area" onClick={handleClose}>
            <div id="modal">
                <button onCanPlay={handleClose} id="close-btn">X</button>
                <div id="input-area">
                    <div id="name-area">
                        <Input attributes={{
                            value: ctx.editingData.name || name,
                            required: true,
                            autoFocus: true,
                            label: "Nome",
                            type: "text",
                            id: "nome"
                        }} 
                        setData={setName} />
                    </div>
                    <div id="email-area">
                        <Input attributes={{
                            value: ctx.editingData.email || email,
                            required: true,
                            autoFocus: false,
                            label: "Email",
                            type: "email",
                            id: "email"
                        }} 
                        setData={setEmail} />
                    </div>
                    <div id="actions-area">
                        <span id="error">
                            {
                                errorMessage.active ?
                                errorMessage.msg :
                                null
                            }
                        </span>
                        <button
                            id="submit-btn"
                            onClick={validate}>
                        { 
                            ctx.editingData.active ?
                            "Confirmar" :
                            "Enviar"
                        }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Modal);
