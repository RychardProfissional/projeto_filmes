import { BiSolidStar } from "react-icons/bi"

export default function Assessment({ current = 0, total = 0 }) {
    return (
        <div className="flex h-4 overflow-hidden" style={{ width: `${(current / total) * 100}%` }}>
            <BiSolidStar className="p-0 text-yellow-500 min-h-4 min-w-4" />
            <BiSolidStar className="p-0 text-yellow-500 min-h-4 min-w-4" />
            <BiSolidStar className="p-0 text-yellow-500 min-h-4 min-w-4" />
            <BiSolidStar className="p-0 text-yellow-500 min-h-4 min-w-4" />
            <BiSolidStar className="p-0 text-yellow-500 min-h-4 min-w-4" />
        </div>
    );
}
