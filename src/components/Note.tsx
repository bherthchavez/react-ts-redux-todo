import { MdEdit } from 'react-icons/md';
import { KeepNote } from '../types/Notes';

type CardNoteProps = {
  Notes: KeepNote[];
  ModalOpen: (id: string, title: string, note: string) => void;
};


const CardNote = ({ Notes, ModalOpen }: CardNoteProps):JSX.Element => {
  return (
    <>
      {Notes.map((note) => (
        <div
          key={note.id}
          className="group relative rounded-md p-3 w-auto sm:w-60  m-3 border hover:shadow-md bg-white cursor-pointer"
          onClick={() => ModalOpen(note.id, note.title, note.note)}
        >
          <div className="text-left">
            <h1 className="text-lg font-medium mb-2 text-gray-900 whitespace-pre-wrap break-words">
              {note.title}
            </h1>
            <p className="text-md text-gray-800 mb-2 whitespace-pre-wrap break-words">
              {note.note}
            </p>
          </div>
          <button className="hidden group-hover:block absolute top-0 right-0 p-2 text-lg text-gray-500">
            <MdEdit />
          </button>
        </div>
      ))}
    </>
  );
};

export default CardNote;
