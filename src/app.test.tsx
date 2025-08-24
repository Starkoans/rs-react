import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

vi.mock("./App.module.css", () => ({
  default: {
    buttons: "buttons",
    uncontrolled: "uncontrolled",
    controlled: "controlled",
    userCards: "userCards",
    userCard: "userCard",
  },
}));

vi.mock("./store/store", () => ({
  useStore: (selector: any) =>
    selector({
      userControlled: {
        name: "Controlled User",
        age: 30,
        email: "c@example.com",
        country: "Austria",
        gender: "male",
        password: "Ctrl#123",
        confirmPassword: "Ctrl#123",
        terms: true,
        picture: "https://example.com/ctrl.png",
      },
      userUncontrolled: {
        name: "Uncontrolled User",
        age: 28,
        email: "u@example.com",
        country: "France",
        gender: "female",
        password: "Unctrl#123",
        confirmPassword: "Unctrl#123",
        terms: false,
        picture: "https://example.com/unctrl.png",
      },
    }),
}));


vi.mock("./components/modal/modal", () => ({
  Modal: ({ open, onClose, children }: any) =>
    open ? (
      <div role="dialog">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null,
}));

vi.mock("./components/form-controlled/form-controlled", () => ({
  SignUpFormControlled: ({ onSubmit }: any) => (
    <div data-testid="form-controlled">
      Controlled Form
      <button onClick={onSubmit}>Submit Controlled</button>
    </div>
  ),
}));
vi.mock("./components/form-uncontrolled/form-uncontrolled", () => ({
  SignUpFormUncontrolled: ({ onSubmit }: any) => (
    <div data-testid="form-uncontrolled">
      Uncontrolled Form
      <button onClick={onSubmit}>Submit Uncontrolled</button>
    </div>
  ),
}));

vi.mock("./components/user-card/user-card", () => ({
  UserCard: ({ user }: any) => (
    <div data-testid="user-card">{user?.name ?? "No name"}</div>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("App", () => {
  it("Renders buttons for opening forms and user cards", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /open uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open controlled form/i })
    ).toBeInTheDocument();

    const cards = screen.getAllByTestId("user-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Uncontrolled User");
    expect(cards[1]).toHaveTextContent("Controlled User");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens modal with UNcontrolled form and closes on submit", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /open uncontrolled form/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("form-uncontrolled")).toBeInTheDocument();
    expect(screen.queryByTestId("form-controlled")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /submit uncontrolled/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens modal with controlled form and closes on submit", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /open controlled form/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("form-controlled")).toBeInTheDocument();
    expect(screen.queryByTestId("form-uncontrolled")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /submit controlled/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("switches the form inside the open modal when the second button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /open uncontrolled form/i })
    );
    expect(screen.getByTestId("form-uncontrolled")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /open controlled form/i })
    );

    expect(screen.getByTestId("form-controlled")).toBeInTheDocument();
    expect(screen.queryByTestId("form-uncontrolled")).not.toBeInTheDocument();
  });

  it("closes the modal with the Close button in the Modal stub", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /open uncontrolled form/i })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
