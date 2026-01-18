'use client'
import LOGO404 from "../components/anime/LOGO404"

export default function Page() {
    return <div className="PAGE404">
        <LOGO404 />
        <a href="/" className="href">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route-icon lucide-route">
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                <circle cx="18" cy="5" r="3" />
            </svg>
            Exit
        </a>

        <style jsx>
            {` 
            .PAGE404 {
                position: fixed;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                inset: 0;
                width: 100vw;
                height: 100vh;
                background: #444;
            }
            .href{
                    padding: 10px;
                    position: absolute;
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                    top: 0;
                    left: 0;
                    color: white;
                }
            `}
        </style>
    </div>

}
