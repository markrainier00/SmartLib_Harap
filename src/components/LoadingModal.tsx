"use client";

import React from "react";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ 
  isOpen, 
  message = "Processing..." 
}) => {
  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e0e0e0;
          border-top: 4px solid #1B5E35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-textt {
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="overlay">
        <div className="lm-modal">
          <div className="spinner"></div>
          <p className="loading-textt">{message}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;