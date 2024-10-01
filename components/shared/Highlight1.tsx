
type Props = {
    title: string;
    description: string;
};

export function Highlight1({title, description} : Props) {

    return (
        <div className="p-9 py-12  bg-white text-center">
            <div className="text-2xl px-9 pb-9 font-bold">
               {title}
            </div>
            <div className="text-lg font-light text-slate-900">
            {description}
            </div>
        </div>
    );
};
