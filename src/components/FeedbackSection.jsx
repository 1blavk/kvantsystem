import { useState } from "react";
import { feedbackData } from "../data/feedbackData";
import clsx from "clsx";
import { Plus } from "lucide-react";
import LazyImage from "./LazyImage";

export default function FeedbackSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    const handleUserClick = (index) => {
        if (index === activeIndex) return;

        // trigger animation
        setAnimate(true);

        setTimeout(() => {
            setActiveIndex(index);
            setAnimate(false);
        }, 200); // match animation duration
    };

    return (
        <div className="w-full bg-gradient-to-r from-[#364351] to-[#3d4043] py-20 flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl md:text-7xl sm:text-6xl uppercase text-white mb-2 text-center px-6">
                People Say Us
            </h1>

            <p className="text-white/80 tracking-[0.5px] text-center px-6">
                Feedback and insights shared by our corporate partners.
            </p>


            {/* User Avatars */}
            <div className="relative z-1 flex justify-center items-center gap-2 mt-10">
                {feedbackData.map((user, index) => (
                    <button
                        onClick={() => handleUserClick(index)}
                        key={user.id}
                        className={clsx(
                            "bg-gray-500 rounded-full w-10 h-10 cursor-pointer transition-all duration-300 border-2 p-0 m-0 overflow-hidden flex items-center justify-center",
                            index === activeIndex
                                ? "border-white scale-110"
                                : "border-transparent hover:scale-105"
                        )}
                    >
                        <LazyImage key={user.id}
                            src={user.avatar}
                            alt={user.name}
                            loaderColor="#ddd"
                            loaderSize={15}
                        />
                    </button>
                ))}

                <div className="rounded-full w-8 h-8 cursor-pointer transition-all duration-300 border-2 flex items-center justify-center border-transparent hover:scale-105 bg-white/10 hover:bg-white/20">
                    <Plus color="white" strokeWidth="1" size={16} />
                </div>
            </div>

            <div className="relative z-1 max-w-4xl mx-auto px-6 mt-6 flex flex-col gap-8">
                {/* Feedback Box */}
                <div
                    className={clsx(
                        "bg-white/85 backdrop-blur-md p-8 rounded-3xl border border-white/10 transition-all duration-300 shadow-xl",
                        animate
                            ? "opacity-0 translate-y-4" // fade & slide down
                            : "opacity-100 translate-y-0"
                    )}
                >
                    <p
                        key={feedbackData[activeIndex].id}
                        className="text-[#1E2E3E] italic leading-8 transition-all duration-300 ease-in-out"
                    >
                        "{feedbackData[activeIndex].feedback}"
                    </p>

                    <div className="mt-4 text-[#1E2E3E]">
                        <h3 className="font-semibold text-[#01C38E]">{feedbackData[activeIndex].name}</h3>
                        <p className="text-sm">{feedbackData[activeIndex].role}</p>
                    </div>
                </div>


            </div>

            <img src="/overlay-logo.png" alt="overlay logo" className="absolute right-20 select-none" width={550} />
        </div >
    );
}
