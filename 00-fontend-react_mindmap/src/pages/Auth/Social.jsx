const SocialButton = ({ icon, text, onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-1 gap-2 justify-center items-center bg-white rounded-xl border border-solid cursor-pointer border-slate-200 h-[49px] max-sm:w-full ${className}`}
        >
            <div className="w-5 h-5 text-base font-medium leading-6 rounded-full text-slate-800">
                {icon}
            </div>
            <span className="text-base font-medium leading-6 text-slate-800">
                {text}
            </span>
        </button>
    );
}

export default SocialButton;