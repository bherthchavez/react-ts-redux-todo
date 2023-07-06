import { ChangeEvent, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { addNote } from "./todoSlice";

import { MdAdd, MdOutlineClose } from "react-icons/md";

function App() {
  const Notes = useAppSelector((state) => state.toDo);
  const dispatch = useAppDispatch();

  const generateID = (): number => {
    return Math.floor(Math.random() * 10000000);
  };

  const [noteFocus, setNoteFocus] = useState<boolean>(false);
  const [noteTitleFocus, setNoteTitleFocus] = useState<boolean>(false);
  const [note, setNote] = useState({
    id: generateID(),
    title: "",
    note: "",
  });

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

const handleAddNote = ()=>{
    dispatch(addNote(note))
    handleCloseNote()
}
  
  const handleOnFocus = (): void => {
    setNoteFocus(true);
    setNoteTitleFocus(true);
  };
  const handleCloseNote = (): void => {
    setNoteFocus((prev) => !prev);
    setNoteTitleFocus((prev) => !prev);
    setNote({
      id: generateID(),
      title: "",
      note: "",
    })
  };
  const handleInputOnFocus = (): void => {
    setNoteTitleFocus(true);
  };
  

  const renderCardTask = (): JSX.Element[] =>
    Notes.map((note) => (
      <div
        key={note.id}
        className="rounded-md p-3 w-60  m-3 border-2 hover:shadow-lg bg-white"
      >
        <div className="text-left">
          <h1 className="text-xl font-semibold mb-2 text-gray-900 whitespace-pre-wrap break-words">
            {note.title}
          </h1>
          <p className="text-md text-gray-800 mb-2 whitespace-pre-wrap break-words">
            {note.note}
          </p>
        </div>
      </div>
    ));

  return (
    <>
      <div className="relative flex flex-col justify-center gap-2 items-center text-white pt-10">
        <h1 className="text-3xl font-bold text-gray-600">{"notes"}</h1>

        <div className="relative w-full max-w-[600px] m-auto z-10 rounded-lg shadow-lg mb-10 bg-white">
          {noteFocus || noteTitleFocus ? (
            <input
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              onFocus={handleInputOnFocus}
              className="text-gray-900 p-3 rounded-lg w-full focus:outline-none"
              type="text"
              placeholder="Title"
              value={note.title}
            />
          ) : null}
          <textarea
            ref={ref}
            rows={1}
            onChange={(e) => setNote({ ...note, note: e.target.value })}
            onInput={handleInput}
            onFocus={handleOnFocus}
            className="text-gray-600 p-3 rounded-lg resize-none min-h-[3em] max-h-[50vh] w-full  focus:outline-none"
            placeholder="Take a note..."
            value={note.note}
          ></textarea>

          {noteFocus || noteTitleFocus ? (
            <div className="p-1 absolute bottom-[-20px] flex gap-2 right-0">
              <button
                onClick={handleAddNote} 
                className="rounded-full bg-yellow-500 p-2 border-2 shadow-lg hover:bg-yellow-600">
                <MdAdd />
              </button>
              <button
                onClick={handleCloseNote} 
                className="rounded-full bg-red-500 p-2 border-2  shadow-sm hover:bg-red-700">
                <MdOutlineClose/>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-8 ">
        {renderCardTask()}
      </div>
    </>
  );
}

export default App;
