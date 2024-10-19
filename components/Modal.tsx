"use client";

import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  heading?: string;
}

const Overlay: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
  );
};

export const Modal: React.FC<ModalProps> = ({ children, heading }) => {
  const modalContainer = document.createElement("div");

  document.body.appendChild(modalContainer);

  return createPortal(
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen">
      <Overlay />
      <div className="relative p-8 rounded-md bg-[#262626] z-50" id="modal">
        <IoClose
          className="size-8 absolute top-4 right-4 cursor-pointer text-secondary"
          onClick={() => {
            document.body.removeChild(modalContainer);
          }}
        />
        {heading && (
          <p className="text-4xl text-primary -mt-2 mb-6">{heading}</p>
        )}
        {children}
      </div>
    </div>,
    modalContainer
  );
};
