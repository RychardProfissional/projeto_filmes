import { BiX } from "react-icons/bi";

export function DefaultModal({ children, onClose }) {
    return (
        <div className="fixed inset-0 top-0 z-50 flex items-center justify-center bg-red-50 bg-opacity-45">
      <div className="relative max-h-[80vh] p-4 overflow-auto bg-white rounded-lg">
        <button className='absolute p-2 top-1 right-1' onClick={onClose}>
          <BiX className='w-6 h-6' />
        </button>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
    );
}