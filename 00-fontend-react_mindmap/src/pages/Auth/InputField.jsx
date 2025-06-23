
const InputField = ({
    label,
    type = "text",
    placeholder,
    icon,
    className = ""
}) => {
    return (
        <div className="mb-6">
            <label className="mb-2 text-sm font-medium leading-5 text-slate-800">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`box-border py-3 pr-10 pl-4 w-full text-base leading-6 text-black bg-white rounded-xl border border-solid border-slate-200 h-[49px] ${className}`}
                />
                <span className="absolute right-4 top-2/4 text-base -translate-y-2/4 text-slate-500">
                    {icon}
                </span>
            </div>
        </div>
    );
}
export default InputField;
