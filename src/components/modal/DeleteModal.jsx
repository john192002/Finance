// components/DeleteModal
import { useEffect } from 'react';
import './modal.css'

function DeleteModal({ isOpen, onCancel, onConfirm, description}) {
    
    //Listen for the Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onCancel();
        }

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        // Cleanup: always remove listeners when  component closes or unmounts
        return() => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

return (
    <div className="modal-overlay" onClick={onCancel}> {/* Click background to close */}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this request <strong>{description}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
                <button onClick={onCancel}>Cancel</button>
                <button className="confirm-btn" onClick={onConfirm}>Delete</button>
            </div>
        </div>
    </div>
    )
}
export default DeleteModal;