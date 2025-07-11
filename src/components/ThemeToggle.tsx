import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/contexts/ThemeProvider";
import {Toggle} from "@/components/ui/toggle";
import {cn} from "@/lib/utils";
import {useTranslation} from "react-i18next";

interface ThemeToggleProps {
    className?: string;
    variant?: "default" | "outline";
}

export function ThemeToggle({className, variant = "default"}: ThemeToggleProps) {
    const {theme, toggleTheme} = useTheme();
    const {t} = useTranslation();

    return (
        <Toggle
            variant={variant}
            pressed={theme === "dark"}
            onPressedChange={toggleTheme}
            aria-label={t('settings.theme')}
            className={cn("w-10 p-2", className)}
        >
            {theme === "dark" ? (
                <Moon className="h-4 w-4"/>
            ) : (
                <Sun className="h-4 w-4"/>
            )}
        </Toggle>
    );
}
