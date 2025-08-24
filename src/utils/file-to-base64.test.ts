import { describe, it, expect, vi, afterEach } from "vitest";
import { fileToBase64 } from "./file-to-base64";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("fileToBase64", () => {
	it("returns data URL and calls readAsDataURL with the transferred file", async () => {
		class MockFileReader {
			static instances: MockFileReader[] = [];
			result: string | ArrayBuffer | null = null;
			onload: ((ev: Event) => void) | null = null;
			onerror: ((ev: unknown) => void) | null = null;
			readAsDataURL = vi.fn((file: Blob) => {
				this.result = "data:image/png;base64,Zm9v"; 
				Promise.resolve().then(() => this.onload?.(new Event("load")));
			});
			constructor() {
				MockFileReader.instances.push(this);
			}
		}
		vi.stubGlobal("FileReader", MockFileReader);

		const file = new File(["foo"], "avatar.png", { type: "image/png" });

		const result = await fileToBase64(file);
		expect(result).toBe("data:image/png;base64,Zm9v");

		expect(MockFileReader.instances).toHaveLength(1);
		expect(MockFileReader.instances[0].readAsDataURL).toHaveBeenCalledWith(
			file
		);
	});

	it("rejects the promise on FileReader error", async () => {
		class MockFileReader {
			result: string | ArrayBuffer | null = null;
			onload: ((ev: Event) => void) | null = null;
			onerror: ((err: unknown) => void) | null = null;
			readAsDataURL = vi.fn((_file: Blob) => {
				Promise.resolve().then(() => this.onerror?.(new Error("read failed")));
			});
		}
		vi.stubGlobal("FileReader", MockFileReader);

		const file = new File(["x"], "x.png", { type: "image/png" });

		await expect(fileToBase64(file)).rejects.toThrow("read failed");
	});

	it("ensures the result is a string type", async () => {
		class MockFileReader {
			result: string | ArrayBuffer | null = null;
			onload: ((ev: Event) => void) | null = null;
			onerror: ((err: unknown) => void) | null = null;
			readAsDataURL = vi.fn((_file: Blob) => {
				this.result = "data:image/jpeg;base64,YmFy"; // "bar"
				Promise.resolve().then(() => this.onload?.(new Event("load")));
			});
		}
		vi.stubGlobal("FileReader", MockFileReader);

		const file = new File(["bar"], "pic.jpg", { type: "image/jpeg" });
		const result = await fileToBase64(file);
		expect(typeof result).toBe("string");
		expect(result).toBe("data:image/jpeg;base64,YmFy");
	});
});
