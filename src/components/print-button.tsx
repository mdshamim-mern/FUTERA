"use client";
import {Button} from "./ui/button";
export function PrintButton(){return <Button className="print:hidden" onClick={()=>window.print()}>Print / Save as PDF</Button>;}
