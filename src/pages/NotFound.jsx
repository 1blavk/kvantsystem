export default function NotFound() {
    return (
        <div className="px-4 pt-17">
            <div className="flex w-full flex-col gap-4 mx-auto rounded-md items-center justify-center p-4 mt-4 bg-gray-100 max-w-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-alert-icon lucide-cloud-alert"><path d="M12 12v4" /><path d="M12 20h.01" /><path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708" /></svg>

                <p className="text-[#999]">404 error</p>

                <a href="/">Return</a>
            </div>
        </div>
    )
}