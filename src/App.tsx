import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { addNote, deleteNote, updateNote } from "./todoSlice";

import { MdAdd, MdEdit } from "react-icons/md";
import Modal from "./components/Modal";
import Header from "./components/Header";

function App() {
  const Notes = useAppSelector((state) => state.toDo);
  const dispatch = useAppDispatch();

  const generateID = (): number => {
    return Math.floor(Math.random() * 10000000);
  };

  interface Note {
    id: number;
    title: string;
    note: string;
  }

  const initialNote: Note = {
    id: generateID(),
    title: "",
    note: "",
  };

  const [noteFocus, setNoteFocus] = useState<boolean>(false);
  const [updateNoteId, setUpdateNoteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [note, setNote] = useState<Note>(initialNote);

  const menuRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const ref1 = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };
  const handleInput1 = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (ref1.current) {
      ref1.current.style.height = "auto";
      ref1.current.style.height = `${e.target.scrollHeight}px`;
    }
  }

  useEffect(() => {
    const handle = (e: MouseEvent): void => {
      if (!menuRef.current?.contains(e.target as Node) && !updateNoteId) {
        setNoteFocus(false);
        handleCloseNote();
      }
    };
    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  const handleAddNote = () => {
    dispatch(addNote(note));
    handleCloseNote();
  };

  const handleOnFocus = (): void => {
    setNoteFocus(true);
  };
  const handleCloseNote = (): void => {
    setNoteFocus(false);
    if (ref.current) {
      ref.current.style.height = "auto";
    }
    setNote({
      id: generateID(),
      title: "",
      note: "",
    });
  };

  const handleModalOpen = (id: number, title: string, note: string): void => {
    setUpdateNoteId(id);
    setNote({
      id,
      title,
      note,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUpdateNoteId(null);
    setNote({
      id: generateID(),
      title: "",
      note: "",
    });
  };

  const onDeleteUserClicked = () => {
    dispatch(deleteNote({ id: note.id }));
    handleModalClose();
  };
  const onUpdateNote = () => {
    dispatch(updateNote(note));
    handleModalClose();
  };

  const renderCardTask = (): JSX.Element[] =>
    Notes.map((note) => (
      <div
        key={note.id}
        className="group relative rounded-md p-3 w-60  m-3 border-2 hover:shadow-lg bg-white cursor-pointer"
        onClick={() => handleModalOpen(note.id, note.title, note.note)}
      >
        <div className="text-left">
          <h1 className="text-lg font-medium mb-2 text-gray-900 whitespace-pre-wrap break-words">
            {note.title}
          </h1>
          <p className="text-md text-gray-800 mb-2 whitespace-pre-wrap break-words">
            {note.note}
          </p>
        </div>
        <button className="hidden group-hover:block absolute top-0 right-0 p-2 text-lg text-gray-500 ">
          <MdEdit />
        </button>
      </div>
    ));

  const noteFocusClass = !noteFocus ? `font-semibold text-lg` : "";

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDelete={onDeleteUserClicked}
        onUpdate={onUpdateNote}
      >
        <div className="bg-white p-4">
          <input
            className="text-gray-900 p-3 font-medium w-full focus:outline-none"
            type="text"
            placeholder="Title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            value={note.title}
          />
          <textarea
            ref={ref1}
            onInput={handleInput1}
            className="text-gray-600 p-3 resize-none min-h-[3em] max-h-[50vh] w-full  focus:outline-none"
            placeholder="Take a note..."
            value={note.note}
            onChange={(e) => setNote({ ...note, note: e.target.value })}
          ></textarea>
        </div>
      </Modal>
      <div className="relative flex flex-col justify-center gap-5 items-center text-white pt-10">
        <Header />
        <div
          className="relative w-full max-w-[600px] m-auto z-10 rounded-lg p-2 shadow-lg mb-10 bg-white"
          ref={menuRef}
        >
          {noteFocus ? (
            <input
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="text-gray-900 font-medium p-3 w-full focus:outline-none"
              type="text"
              placeholder="Title"
              value={!updateNoteId ? note.title : ""}
            />
          ) : null}
          <textarea
            ref={ref}
            rows={1}
            onChange={(e) => setNote({ ...note, note: e.target.value })}
            onInput={handleInput}
            onFocus={handleOnFocus}
            className={`text-gray-600 ${noteFocusClass} p-3 resize-none min-h-[3em] max-h-[50vh] w-full  focus:outline-none`}
            placeholder="Take a note..."
            value={!updateNoteId ? note.note : ""}
          ></textarea>

          {noteFocus ? (
            <div className="p-1 absolute bottom-[-25px] flex gap-2 right-5">
              <button
                onClick={handleAddNote}
                className="rounded-full bg-yellow-500 p-2 border-2 shadow-lg hover:bg-yellow-600 text-xl"
                title="Edit"
              >
                <MdAdd />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 ">
        {renderCardTask()}
      </div>
    </>
  );
}

export default App;
