
export default function Input({label, type, placeholder, styleLabel, styleInput, value, onChange}){
    return(
        <div className="space-y-1">
            <label
                htmlFor={label}
                className={styleLabel}
            >
            {label}
            </label>
            <input
                type={type}
                id={label}
                placeholder={placeholder}
                className={styleInput}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}