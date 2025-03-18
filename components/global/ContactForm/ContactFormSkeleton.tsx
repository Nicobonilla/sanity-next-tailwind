function InputFieldSkeleton() {
    return (
        <div className="relative space-y-1 animate-pulse">
            <div className="relative">
                <div className="absolute left-3 top-3 h-4 w-4 rounded-full bg-gray-600" /> {/* Icono */}
                <div className="h-10 w-full rounded bg-[#1a201f] py-2 pl-10 pr-4" /> {/* Input */}
            </div>
        </div>
    );
}

export function ServiceSelectorSkeleton() {
    return (
        <div className="w-full rounded bg-[#1a201f] p-4 text-white">
            {/* Label */}
            <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-700" />

            {/* Botón principal */}
            <div className="h-10 w-full animate-pulse rounded bg-menuColor2" />

            {/* Placeholder para categorías colapsadas */}
            <div className="mt-2 space-y-2">
                {/* Simula 3 categorías */}
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-700" />
                            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-700" /> {/* Ícono */}
                        </div>
                    ))}
            </div>
        </div>
    );
}

function SubmitButtonSkeleton() {
    return (
        <div className="flex justify-center animate-pulse">
            <div className="h-12 w-32 rounded bg-[#6C5CE7]" /> {/* Botón */}
        </div>
    );
}

export function TextAreaFieldSkeleton() {
    return (
        <div className="space-y-1 animate-pulse">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-600" /> {/* Label */}
            <div className="h-24 w-full rounded bg-[#1a201f] px-4 py-2" /> {/* Textarea */}
        </div>
    );
}
export function ContactFormSkeleton() {
    return (
        <div className="relative z-50">
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/70" />

            {/* Drawer */}
            <div className="contact-drawer fixed right-0 top-0 z-50 h-screen w-full overflow-hidden bg-black shadow-lg sm:w-[480px]">
                <div className="relative h-full overflow-y-auto p-8">
                    {/* Botón cerrar */}
                    <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-gray-600 animate-pulse" />

                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <div className="h-16 w-32 rounded bg-gray-600 animate-pulse" />
                    </div>

                    {/* Contenido del formulario */}
                    <div className="space-y-6">
                        <div className="mb-4 h-6 w-3/4 mx-auto rounded bg-gray-600 animate-pulse" /> {/* Título */}
                        <div className="mb-8 h-4 w-1/2 mx-auto rounded bg-gray-600 animate-pulse" /> {/* Subtítulo */}
                        <InputFieldSkeleton /> {/* Nombre */}
                        <InputFieldSkeleton /> {/* RUT */}
                        <InputFieldSkeleton /> {/* Teléfono */}
                        <InputFieldSkeleton /> {/* Email */}
                        <InputFieldSkeleton /> {/* Comuna */}
                        <ServiceSelectorSkeleton />
                        <TextAreaFieldSkeleton />
                        <SubmitButtonSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}