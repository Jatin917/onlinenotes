"use client"

import { useRecoilValue } from "recoil";
import { themeAtom } from "../state/themeAtom";

// Hook to use theme-based classes
export function useThemeClasses() {
    const theme = useRecoilValue(themeAtom);

    return {
        bgClass: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
        cardClass: theme === "dark" ? "bg-gray-800 shadow-lg" : "bg-white shadow",
        headingClass: theme === "dark" ? "text-gray-100" : "text-gray-800",
        textClass: theme === "dark" ? "text-gray-300" : "text-gray-600",
        mutedTextClass: theme === "dark" ? "text-gray-400" : "text-gray-500",
        borderClass: theme === "dark" ? "border-gray-700" : "border-gray-200",
        inputBgClass: theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300",
        inputTextClass: theme === "dark" ? "text-white" : "text-gray-800",
        primaryBtnClass: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondaryBtnClass: theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800",
        tabClass: theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700",
        activeTabClass: theme === "dark" ? "border-indigo-500 text-indigo-400" : "border-indigo-600 text-indigo-600",
        hoverBgClass: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100",
        iconClass: theme === "dark" ? "text-gray-400" : "text-gray-500",
    };
}
