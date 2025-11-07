import Link from "next/link";
import { notFoundPageContent } from "@/data/data";

const NotFound = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white px-4">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">{notFoundPageContent.title}</h1>
                <h2 className="text-9xl font-bold text-red-500 mb-4">{notFoundPageContent.errorCode}</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md">
                    {notFoundPageContent.description}
                </p>
                <Link
                    href="/"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 inline-block"
                >
                    {notFoundPageContent.backButton}
                </Link>
            </div>
        </div>
    );
}

export default NotFound
