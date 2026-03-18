'use client'

import { MoonStar, SunDim } from "lucide-react";
import { Switch, SwitchThumb } from "@/controls/switch";
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const {setTheme} = useTheme();

    return (
        <Switch className="data-[state=checked]:bg-gray-700" onValueChange={(checked) => setTheme(checked ? 'dark' : 'light')}>
            <SwitchThumb className="shadow-sm data-[state=checked]:shadow-white-sm">
                <SunDim />
                <MoonStar color="white" />
            </SwitchThumb>
        </Switch>
    )
}
