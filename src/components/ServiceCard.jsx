import { SquarePlus } from "lucide-react";

import LazyImage from "./LazyImage";

export default function ServiceCard({ title, description }) {
    return (
        <div className="bg-white border border-gray-100 shadow-lg shadow-gray-50 rounded-lg p-2 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-red w-full md:min-h-32 bg-[#eee] flex items-center justify-center overflow-hidden rounded-md">
                <LazyImage src="/test.png" alt="Services" className="w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 w-full pt-2">
                <div className="text-left">
                    <h1 className="text-sm sm:text-sm md:text-md font-medium text-[#999] mb-1">Security Server Installation</h1>
                    <span className="text-sm bg-orange-200 px-1.5 font-semibold text-orange-400 rounded-2xl">1-2 day</span>
                </div>

                <button className="mt-2 cursor-pointer rounded-md w-full sm:w-full md:w-10 h-10 bg-[#1E2E3E] flex gap-3 items-center justify-center hover:bg-[#01C38E] transition">
                    <span className="flex sm:flex md:hidden text-sm text-white/80">Details</span>
                    <SquarePlus size={16} strokeWidth={1} color="white" className="hidden md:flex sm:hidden" />
                </button>
            </div>
        </div>
    );
}