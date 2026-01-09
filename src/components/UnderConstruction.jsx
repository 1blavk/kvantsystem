import { Construction } from "lucide-react";

export default function UnderConstruction() {
    return (
        <div className="px-4">
            <div className="flex w-full flex-col gap-4 mx-auto rounded-md items-center justify-center p-4 mt-4 bg-gray-100 max-w-5xl">
                <Construction />

                <p className="text-[#999]">Under Consturction</p>
            </div>
        </div>
    )
}