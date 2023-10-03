"use client";

import { createContext } from "react";
import { DEFAULT_STATE } from "./auth.const";
import type { AuthContextValue } from "./auth.interface";

export const AuthContext = createContext<AuthContextValue>({ ...DEFAULT_STATE, getAuth: () => null });
