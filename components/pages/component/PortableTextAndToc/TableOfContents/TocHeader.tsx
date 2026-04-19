import { IoIosArrowDown } from 'react-icons/io';

interface TocHeaderProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const TocHeader = ({ isExpanded, toggleExpanded }: TocHeaderProps) => {
  return (
    <button
      aria-expanded={isExpanded}
      className="flex w-full cursor-pointer items-center justify-between p-1 text-left"
      onClick={toggleExpanded}
      type="button"
    >
      <h2 className="border-l-4 border-red-500 py-1 pl-4 font-semibold">
        Tabla de contenido
      </h2>
      <div className="pr-20 md:hidden">
        <div
          className={`inline-block transition-transform duration-300 ${
            isExpanded ? '-rotate-90' : 'rotate-0'
          }`}
        >
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </button>
  );
};
