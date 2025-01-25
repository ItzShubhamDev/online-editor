const Alert = ({ message }: { message: string }) => {
    return (
        <div className="border-l-8 p-2 my-2 rounded bg-red-100 text-red-800" role="alert">
            <p>{message}</p>
        </div>
    );
};

export default Alert;
