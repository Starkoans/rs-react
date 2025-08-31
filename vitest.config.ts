import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		setupFiles: ["./src/__tests__/setup-tests.ts"],
		globals: true,
		environment: "jsdom",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{js,jsx,ts,tsx}"],
			exclude: [
				"src/main.tsx",
				"src/source/**",
				"src/**/*.test.{js,jsx,ts,tsx}",
				"src/**/messages.ts",
				"src/index.{js,jsx,ts,tsx}",
				"src/__tests__/setupTests.{js,ts}",
				"src/**/*.d.ts",
			],
			thresholds: {
				statements: 80,
				branches: 50,
				functions: 50,
				lines: 50,
			},
		},
	},
});
