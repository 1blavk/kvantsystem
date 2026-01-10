import { Loader } from "lucide-react";


export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="bg-white border p-2 px-2 rounded-xl fixed flex gap-2 justify-center items-center bottom-4 right-4">
        <Loader
            className="animate-spin"
            strokeWidth={2}
            size={16}
        />
        <h1 className='text-sm'>Loading...</h1>
    </div>
}