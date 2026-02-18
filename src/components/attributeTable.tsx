import { ReactElement } from "react";
import { Fragment } from "react/jsx-runtime";

interface DataProps {
    name: ReactElement | string
    type: ReactElement | string
    description: string
}

const AttributeTable = ({ data }: { data: DataProps[] }) => {
    return (
        <table className="text-[13px] xl:text-sm">
            <thead className="text-left">
                <tr>
                    <th className="bg-white px-3 py-2 rounded-l-md">Data Attribute</th>
                    <th className="bg-white px-3 py-2">Values</th>
                    <th className="bg-white px-3 py-2 rounded-r-md">Description</th>
                </tr>
                <tr className="h-2"></tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <Fragment key={index}>
                        <tr>
                            <td className="bg-white text-slate-800 px-3 py-2 rounded-l-md">{row.name}</td>
                            <td className="bg-white text-slate-800 px-3 py-2">{row.type}</td>
                            <td className="bg-white px-3 py-2 rounded-r-md">{row.description}</td>
                        </tr>
                        <tr className="h-1"></tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

export { AttributeTable };
