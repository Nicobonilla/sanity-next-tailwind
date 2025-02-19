export default function FormSiguenos() {
  return (
    <div className="flex flex-col items-end lg:w-1/4">
      <h2 className="mb-1 font-bitter">SÍGUENOS</h2>
      <form className="relative flex items-center">
        <input
          type="email"
          placeholder="Dirección de correo"
          className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:ring-2 focus:ring-red-400"
          required
        />
        <button
          type="submit"
          className="absolute right-3 text-2xl font-extrabold text-red-500 hover:text-red-600"
        >
          →
        </button>
      </form>
    </div>
  );
}
