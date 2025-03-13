export default function TextAreaField({
    id,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
}: {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: () => void;
    error?: string;
}) {
    return (
        <div className="space-y-1">
            <label className="mb-2 block text-sm font-bold" htmlFor={id}>
                Mensaje
            </label>
            <textarea
                id={id}
                name={name}
                rows={4}
                value={value}
                className={`w-full rounded bg-[#1a201f] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${error
                    ? 'border border-red-500 focus:ring-red-500'
                    : 'focus:ring-menuColor2'
                    }`}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                //onClick={() => trackFormSubmit(name)}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
