"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useCallback,
} from "react";
import { ExpressionModule, SelectedExpression } from "./types";

// --- State Definition ---

interface SpeechState {
    isOpen: boolean;
    activeModuleId: string | null;
    selectedItems: SelectedExpression[];
}

// --- Actions ---

type Action =
    | { type: "SET_OPEN"; payload: boolean }
    | { type: "SET_ACTIVE_MODULE"; payload: string | null }
    | { type: "ADD_ITEM"; payload: SelectedExpression }
    | { type: "REMOVE_ITEM"; payload: string } // Remove by unique ID
    | { type: "TOGGLE_ITEM"; payload: { module: ExpressionModule; value: string } }
    | { type: "CLEAR_ALL" };

// --- Context Interface ---

export interface SpeechContextType extends SpeechState {
    setOpen: (isOpen: boolean) => void;
    setActiveModuleId: (id: string | null) => void;
    addItem: (module: ExpressionModule, value: string) => void;
    removeItem: (id: string) => void;
    toggleItem: (module: ExpressionModule, value: string) => void;
    clearAll: () => void;
    // Helper to check if a specific value is selected
    isItemSelected: (moduleId: string, value: string) => boolean;
    // Helper to get all selected items for a specific module
    getItemsForModule: (moduleId: string) => SelectedExpression[];
}

// --- Initial State ---



// --- Reducer ---

function speechReducer(state: SpeechState, action: Action): SpeechState {
    switch (action.type) {
        case "SET_OPEN":
            return {
                ...state,
                isOpen: action.payload,
                // Reset active module when closing to ensure clean state next open
                activeModuleId: !action.payload ? null : state.activeModuleId,
            };
        case "SET_ACTIVE_MODULE":
            return {
                ...state,
                activeModuleId: action.payload
            };
        case "ADD_ITEM":
            return {
                ...state,
                selectedItems: [...state.selectedItems, action.payload],
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                selectedItems: state.selectedItems.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case "TOGGLE_ITEM": {
            const { module, value } = action.payload;
            const existingItem = state.selectedItems.find(
                (item) => item.moduleId === module.id && item.value === value
            );
            if (existingItem) {
                return {
                    ...state,
                    selectedItems: state.selectedItems.filter(
                        (item) => item.id !== existingItem.id
                    ),
                };
            } else {
                const newItem: SelectedExpression = {
                    id: Math.random().toString(36).substr(2, 9), // Simple ID generation
                    moduleId: module.id,
                    prefix: module.prefix,
                    value: value,
                };
                return {
                    ...state,
                    selectedItems: [...state.selectedItems, newItem],
                };
            }
        }
        case "CLEAR_ALL":
            return { ...state, selectedItems: [] };
        default:
            return state;
    }
}

// --- Context Creation ---

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// --- Provider Component ---

interface SpeechProviderProps {
    children: ReactNode;
    initialItems?: SelectedExpression[];
}

export function SpeechProvider({ children, initialItems = [] }: SpeechProviderProps) {
    const [state, dispatch] = useReducer(speechReducer, {
        isOpen: false,
        activeModuleId: null,
        selectedItems: initialItems,
    } satisfies SpeechState);

    // --- Action Creators (wrapped in useCallback for performance) ---

    const setOpen = useCallback((isOpen: boolean) => {
        dispatch({ type: "SET_OPEN", payload: isOpen });
    }, []);

    const setActiveModuleId = useCallback((id: string | null) => {
        dispatch({ type: "SET_ACTIVE_MODULE", payload: id });
    }, []);

    const addItem = useCallback(
        (module: ExpressionModule, value: string) => {
            const newItem: SelectedExpression = {
                id: Math.random().toString(36).substr(2, 9),
                moduleId: module.id,
                prefix: module.prefix,
                value: value,
            };
            dispatch({ type: "ADD_ITEM", payload: newItem });
        },
        []
    );

    const removeItem = useCallback((id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    }, []);

    const toggleItem = useCallback(
        (module: ExpressionModule, value: string) => {
            dispatch({ type: "TOGGLE_ITEM", payload: { module, value } });
        },
        []
    );

    const clearAll = useCallback(() => {
        dispatch({ type: "CLEAR_ALL" });
    }, []);

    // --- Selectors ---

    const isItemSelected = useCallback(
        (moduleId: string, value: string) => {
            return state.selectedItems.some(
                (item) => item.moduleId === moduleId && item.value === value
            );
        },
        [state.selectedItems]
    );

    const getItemsForModule = useCallback(
        (moduleId: string) => {
            return state.selectedItems.filter((item) => item.moduleId === moduleId);
        },
        [state.selectedItems]
    );

    const value: SpeechContextType = {
        ...state,
        setOpen,
        setActiveModuleId,
        addItem,
        removeItem,
        toggleItem,
        clearAll,
        isItemSelected,
        getItemsForModule,
    };

    return (
        <SpeechContext.Provider value={value}>
            {children}
        </SpeechContext.Provider>
    );
}

// --- Hook ---

export function useSpeech() {
    const context = useContext(SpeechContext);
    if (context === undefined) {
        throw new Error("useSpeech must be used within a SpeechProvider");
    }
    return context;
}
