import Icon, { IconProps } from '@/components/global/Icons/LucideIcon';

// Reusable input field component
export default function InputField({
    name,
    icon,
    type,
    id,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    required = false,
}: {
    name: string;
    icon?: IconProps['name'];
    type: string;
    id: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    error?: string;
    required?: boolean;
}) {
    return (
        <div className="relative space-y-1">
            <div className="relative">
                <Icon
                    name={icon as IconProps['name']}
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                />
                <input
                    name={name}
                    type={type}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                    //onClick={() => trackFormSubmit(name)}
                    className={`w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${error
                        ? 'border border-red-500 focus:ring-red-500'
                        : 'focus:ring-menuColor2'
                        }`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : undefined}
                />

            </div>
            {error && (
                <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
