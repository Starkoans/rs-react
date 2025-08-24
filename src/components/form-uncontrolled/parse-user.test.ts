import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../source/validation", () => {
	const safeParse = vi.fn(() => ({ success: true, data: null }));
	return { schema: { safeParse } };
});

import { parseUser } from "./parse-user";
import { schema } from "../../source/validation";

beforeEach(() => {
	(schema as any).safeParse.mockReset();
	(schema as any).safeParse.mockReturnValue({ success: true, data: null });
});

describe("parseUser", () => {
	it("converts a correctly filled form and passes it to schema.safeParse", () => {
		const fd = new FormData();
		const file = new File(["img"], "avatar.png", { type: "image/png" });

		fd.set("name", "Olya");
		fd.set("age", "42");
		fd.set("email", "lookoye@example.com");
		fd.set("password", "Secret#123");
		fd.set("confirmPassword", "Secret#123");
		fd.set("gender", "male");
		fd.set("terms", "on");
		fd.set("country", "Kazakhstan");
		fd.set("picture", file);

		parseUser(fd);

		expect((schema as any).safeParse).toHaveBeenCalledTimes(1);
		const arg = (schema as any).safeParse.mock.calls[0][0];

		expect(arg).toEqual({
			name: "Olya",
			age: 42,
			email: "lookoye@example.com",
			password: "Secret#123",
			confirmPassword: "Secret#123",
			gender: "male",
			terms: true,
			country: "Kazakhstan",
			picture: file,
		});
	});

	it("sets age=NaN for empty/missing value", () => {
		const fd1 = new FormData();
		fd1.set("age", "");
		parseUser(fd1);
		let arg = (schema as any).safeParse.mock.calls[0][0];
		expect(Number.isNaN(arg.age)).toBe(true);

		(schema as any).safeParse.mockClear();
		const fd2 = new FormData();
		parseUser(fd2);
		arg = (schema as any).safeParse.mock.calls[0][0];
		expect(Number.isNaN(arg.age)).toBe(true);
	});

	it("valid gender values: male|female, otherwise → undefined", () => {
		const fdOk = new FormData();
		fdOk.set("gender", "female");
		parseUser(fdOk);
		let arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.gender).toBe("female");

		(schema as any).safeParse.mockClear();
		const fdBad = new FormData();
		fdBad.set("gender", "other");
		parseUser(fdBad);
		arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.gender).toBeUndefined();
	});

	it("terms present → true, absent → undefined", () => {
		const fd1 = new FormData();
		fd1.set("terms", "on");
		parseUser(fd1);
		let arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.terms).toBe(true);

		(schema as any).safeParse.mockClear();
		const fd2 = new FormData();
		parseUser(fd2);
		arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.terms).toBeUndefined();
	});

	it("picture: File c size>0 → File; empty/not File → undefined", () => {
		const fd1 = new FormData();
		const ok = new File(["x"], "ok.png", { type: "image/png" });
		fd1.set("picture", ok);
		parseUser(fd1);
		let arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.picture).toBe(ok);

		(schema as any).safeParse.mockClear();
		const fd2 = new FormData();
		const empty = new File([""], "empty.png", { type: "image/png" });
		fd2.set("picture", empty);
		parseUser(fd2);
		arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.picture).toBeUndefined();

		(schema as any).safeParse.mockClear();
		const fd3 = new FormData();
		fd3.set("picture", "not-a-file");
		parseUser(fd3);
		arg = (schema as any).safeParse.mock.calls[0][0];
		expect(arg.picture).toBeUndefined();
	});

	it("returns the result of schema.safeParse as is", () => {
		const result = {
			success: false,
			error: { issues: [{ path: ["name"], message: "Required" }] },
		};
		(schema as any).safeParse.mockReturnValueOnce(result);

		const out = parseUser(new FormData());
		expect(out).toBe(result);
	});
});
