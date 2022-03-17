import { useRef, useContext } from "react";

import Modal from "../modal/Modal";
import Contact from '../contact/Contact';

import DataContext from "../../utils/context/DataContext";

import './Wrapper.css';


export default function Wrapper() {
    const ctx = useContext(DataContext);
    const modalAddRef = useRef(null);

    const openModal = () => modalAddRef.current.handleVisibility();

    return (
        <div id='main'>
            <div id='add-contact-area'>
                <p>Adicione um contato</p>
                <button onClick={openModal} id='add-btn'>+</button>
            </div>
            <Modal ref={ modalAddRef } />
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
                            ctx.contacts.map((contact) => (
                                <Contact 
                                    data={contact}
                                    openModal={openModal}
                                    key={contact.id}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};