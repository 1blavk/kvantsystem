import { Bug } from "lucide-react"
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="px-4 pt-17">
            <div className="flex w-full flex-col gap-4 mx-auto rounded-md items-center justify-center p-4 mt-4 bg-gray-100 max-w-5xl">
                <Bug size={48} className="text-[#999]" />
                <p className="text-[#999]">404 error</p>

                <a href="/uz">Home</a>
            </div>
        </div>
    )
}