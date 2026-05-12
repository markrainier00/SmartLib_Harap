import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmColor?: string;
  cancelColor?: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onClose, onConfirm, confirmColor = "bg-success", cancelColor = "bg-error", confirmText = "Okay", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (<>
    <div className="overlay" onClick={onClose}>
      <div className="lm-modal" onClick={(e) => e.stopPropagation()}>
        {title && <div className="page-header text-xl">{title}</div>}
        
        <div className="lm-content">
          <div className="page-sub">{message}</div>
          
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {onConfirm && (
              <button
                className={`btn px-4 py-2 ${confirmColor} w-auto`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}

            <button
              className={`btn px-4 py-2 ${cancelColor} w-auto`}
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Modal;