"use client";
import {useState} from "react";
import {Moon,Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
export function ThemeToggle({initialTheme}:{initialTheme:"light"|"dark"}){
 const [theme,setTheme]=useState(initialTheme);
 return <Button variant="ghost" size="icon" aria-label={`Switch to ${theme==="dark"?"light":"dark"} mode`} onClick={()=>{const next=theme==="dark"?"light":"dark";setTheme(next);document.documentElement.dataset.theme=next;document.cookie=`futera-theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;}}>{theme==="dark"?<Sun aria-hidden="true"/>:<Moon aria-hidden="true"/>}</Button>;
}
