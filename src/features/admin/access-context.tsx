"use client";
import {createContext,useContext} from "react";
const Access=createContext(false);
export const useDemoReadOnly=()=>useContext(Access);
export function AdminAccess({readOnly,children}:{readOnly:boolean;children:React.ReactNode}){return <Access.Provider value={readOnly}>{children}</Access.Provider>;}
