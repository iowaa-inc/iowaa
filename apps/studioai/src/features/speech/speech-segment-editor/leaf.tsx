import { RenderLeafProps } from "slate-react";
import { CustomText } from "./libs/editor-types";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if ((leaf as CustomText).isDropTarget) {
        return (
            <span
                {...attributes}
                className="bg-blue-100 border-l-2 border-blue-600 transition-colors duration-75"
                data-cy="drop-target"
            >
                {children}
            </span>
        );
    }
    return <span {...attributes}>{children}</span>;
};
