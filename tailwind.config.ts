import type { Config } from "tailwindcss";
import { tailwindPlugin, getUDSContent } from "@yahoo/uds/tailwind/plugin";
import { defaultTokensConfig } from "@yahoo/uds/defaultTokensConfig";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        ...getUDSContent(),
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [tailwindPlugin({ config: defaultTokensConfig })],
};
export default config;
