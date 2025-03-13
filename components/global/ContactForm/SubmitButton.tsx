
// Submit button component
export default function SubmitButton({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="flex justify-center">
            <button
                type="submit"
                disabled={isLoading}
                className="rounded bg-[#6C5CE7] px-8 py-3 font-medium text-white transition-colors hover:bg-[#5849c4] focus:outline-none focus:ring-2 focus:ring-menuColor2 disabled:opacity-50"
            //onClick={() => trackFormSubmit('submit')}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="size-4 animate-spin" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Enviando...
                    </span>
                ) : (
                    'Enviar'
                )}
            </button>
        </div>
    );
}
