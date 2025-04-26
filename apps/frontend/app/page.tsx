"use client"

import Dashboard from "./(dashboard)/dashboard";
import { useThemeClasses } from "./Style/theme";

export default function Home() {
    const { bgClass } = useThemeClasses();
  return (
    <div className={`${bgClass}`}>
      <Dashboard />
    </div>
  );
}
