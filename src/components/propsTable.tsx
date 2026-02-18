import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import { Fragment } from "react/jsx-runtime";

interface DataProps {
    name: ReactElement | string
    type: ReactElement | string
    default: string
    description: string
}

const PropsTable = ({ data, className }: { data: DataProps[], className?: string }) => {
    return (
        <table className={cn("text-[13px] xl:text-sm", className)}>
            <thead className="text-left">
                <tr>
                    <th className="bg-white px-3 py-2 rounded-l-md">Property</th>
                    <th className="bg-white px-3 py-2">Type</th>
                    <th className="bg-white px-3 py-2">Default</th>
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
                            <td className="bg-white text-slate-800 px-3 py-2">{row.default}</td>
                            <td className="bg-white px-3 py-2 rounded-r-md">{row.description}</td>
                        </tr>
                        <tr className="h-1"></tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

export { PropsTable };
