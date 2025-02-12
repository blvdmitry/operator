declare const useThemeMode: () => {
    mode: import("../types/theme").Mode;
    setMode: (mode: import("../types/theme").Mode) => void;
    invertMode: () => void;
};
export default useThemeMode;
