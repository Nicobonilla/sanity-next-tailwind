
type Props = {
    title: string;
    description: string;
};

export function Highlight1({title, description} : Props) {

    return (
        <div className="container mx-auto p-9 py-12 lg:px-60 lg:py-20 text-center">
            <div className="text-2xl px-9 pb-9 font-extrabold">
               {title}
            </div>
            <div className="text-lg font-thin">
            {description}
            </div>
        </div>
    );
};
