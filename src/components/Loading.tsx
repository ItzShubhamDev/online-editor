import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <div className="w-full flex justify-center">
            <LoaderCircle size={48} className="animate-spin text-gray-800 dark:text-gray-200" />
        </div>
    );
};

export default Loading;
