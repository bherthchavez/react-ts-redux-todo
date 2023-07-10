import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { addNote, deleteNote, fetchNotes, updateNote } from "./todoSlice";
import { MdAdd } from "react-icons/md";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Note from "./components/Note";
import { KeepNote } from "./types/Notes";

function App() {
  const dispatch = useAppDispatch();

  const { notes: Notes } = useAppSelector((state) => state.toDo);

  const [fetchNote, setFetchNote] = useState<boolean>(false);

  useEffect(() => {
    fetchNote ? console.log("Refetched!") : console.log("Refetched!") ;
    dispatch(fetchNotes())
  }, [dispatch, fetchNote]);

  const initialNote: KeepNote = {
    id: "",
    title: "",
    note: "",
  };

  const [noteFocus, setNoteFocus] = useState<boolean>(false);
  const [updateNoteId, setUpdateNoteId] = useState<number | null | string>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [note, setNote] = useState<KeepNote>(initialNote);

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
  };

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
    setTimeout(reFetched, 10)
  };

  const onDeleteUserClicked = (): void => {
    dispatch(deleteNote({ id: note.id }));
    handleModalClose();
  };
  const onUpdateNote = (): void => {
    dispatch(updateNote({id: note.id, title: note.title, note: note.note}));
    handleModalClose();
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
      id: "",
      title: "",
      note: "",
    });
  };

  const handleModalOpen = (id: string, title: string, note: string): void => {
    setUpdateNoteId(id);
    setNote({
      id,
      title,
      note,
    });

    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setUpdateNoteId(null);
    setNote({
      id: "",
      title: "",
      note: "",
    });
    setTimeout(reFetched, 100)
  };

  const reFetched = ()=>{
    setFetchNote((prev) => !prev)
  }

  

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
            rows={7}
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
          className="relative w-full max-w-[600px] m-auto z-10 rounded-lg p-2 shadow-md mb-10 bg-white"
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
                title="Add"
              >
                <MdAdd />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 ">
        <Note Notes={Notes} ModalOpen={handleModalOpen} />
      </div>
    </>
  );
}

export default App;
