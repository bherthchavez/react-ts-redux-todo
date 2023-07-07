import { ReactNode } from "react";
import { MdDelete } from "react-icons/md";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, onUpdate, onDelete, children }: ModalProps) {
  const showHideClassName = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed z-20 inset-0 overflow-y-auto ${showHideClassName}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center  ">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-400  opacity-80"
            onClick={onClose}
          ></div>
        </div>

        <div
          className="inline-block bg-white  rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle  w-10/12 sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {children}

          <div className="p-2 flex justify-between">
            <button
              type="button"
              className="flex justify-center p-2 text-slate-700 border  border-slate-200   hover:bg-gray-200 rounded-md duration-150"
              onClick={onDelete}
              title="Delete"
            >
              <MdDelete size={20} />
            </button>
            <button
              type="button"
              className="h-9 flex justify-center items-center rounded-md border border-transparent shadow-sm px-3 sm:px-4 py-1 bg-gray-200 font-medium hover:bg-gray-300"
              title="Update"
              onClick={onUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
