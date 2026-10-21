"use server";
import { resolveBuild } from "@/server/builder";
export async function quoteBuild(input: unknown) { return resolveBuild(input); }
