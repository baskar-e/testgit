import { cn } from "@/lib/utils";
import { DataProps } from "@/types";
import { Fragment } from "react/jsx-runtime";

const PropsTable = ({ data, className }: { data: DataProps[], className?: string }) => {
    return (
        <div className="@container rounded-md overflow-x-auto no-scrollbar">
            <table className={cn("text-[13px] xl:text-sm w-full @max-[640px]:w-160", className)}>
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
                                <td className="bg-white px-3 py-2 rounded-l-md">{row.name}</td>
                                <td className="bg-white px-3 py-2">{row.type}</td>
                                <td className="bg-white px-3 py-2">{row.default}</td>
                                <td className="bg-white px-3 py-2 rounded-r-md text-ash">{row.description}</td>
                            </tr>
                            <tr className="h-1"></tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { PropsTable };
