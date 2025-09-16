import React from 'react';


export default function UserModal({ user, onClose }) {

    // console.log("user",user)
    if (!user) return null;


    const { name, email, phone, address, company } = user;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{name}</h2>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Company:</strong> {company?.name}</p>
                <p><strong>Address:</strong> {address?.suite}, {address?.street}, {address?.city} - {address?.zipcode}</p>
            </div>
        </div>
    );
}