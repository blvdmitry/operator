declare const cli: (argv: {
    theme: string;
    output: string;
    /** Generate a transformed api response to be used as a fallback for affiliates  */
    fallback?: boolean;
}) => Promise<void>;
export default cli;
