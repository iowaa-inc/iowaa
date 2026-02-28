import { useState, ReactNode, useRef, useLayoutEffect } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";

interface SimpleAccordionProps {
    open?: boolean;
    onToggle?: (open: boolean) => void;
    label: ReactNode;
    children: ReactNode;
    actions?: ReactNode;
    className?: string;
}

// Helper for measuring height dynamically so we can animate with Tailwind
function useAccordionHeight(open: boolean) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<string>(open ? "auto" : "0px");

    useLayoutEffect(() => {
        if (!ref.current) return;
        if (open) {
            // set to scrollHeight, then to auto after transition for flexibility
            setHeight(ref.current.scrollHeight + "px");
            const timeout = setTimeout(() => setHeight("auto"), 350);
            return () => clearTimeout(timeout);
        } else {
            // set to current height then 0 to animate close
            if (ref.current) {
                setHeight(ref.current.scrollHeight + "px");
                requestAnimationFrame(() => setHeight("0px"));
            } else {
                setHeight("0px");
            }
        }
    }, [open]);

    return { ref, height };
}

export function SimpleAccordion({
    open: controlledOpen,
    onToggle,
    label,
    children,
    actions,
    className = "",
}: SimpleAccordionProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(true);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = (val: boolean) => {
        if (onToggle) onToggle(val);
        if (!isControlled) setUncontrolledOpen(val);
    };

    const { ref, height } = useAccordionHeight(open);

    return (
        <div className={`w-full flex flex-col gap-1 ${className}`}>
            <div className="flex w-full justify-between items-center mb-1">
                <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={() => setOpen(!open)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={open}
                >
                    {open ? (
                        <RiArrowDownSLine className="w-4 h-4 text-muted-foreground transition-all" />
                    ) : (
                        <RiArrowRightSLine className="w-4 h-4 text-muted-foreground transition-all" />
                    )}
                    <label className="text-sm text-muted-foreground cursor-pointer">
                        {label}
                    </label>
                </div>
                {actions}
            </div>
            <div
                ref={ref}
                className={`transition-[max-height,opacity] duration-350 ease-in-out overflow-hidden ${open ? "opacity-100" : "opacity-80"}`}
                // Why opacity-80 instead of 0? To minimize flicker and content jank for tailwind, can set to 0 if desired.
                style={{
                    maxHeight: height,
                }}
                aria-hidden={!open}
            >
                <div className="py-0.5">{children}</div>
            </div>
        </div>
    );
}
