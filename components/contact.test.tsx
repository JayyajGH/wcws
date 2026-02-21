import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ContactPage from "./contact"; 
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// 1. Mock the reCAPTCHA Library
vi.mock("react-google-recaptcha-v3", () => ({
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useGoogleReCaptcha: vi.fn(),
}));

describe("ContactForm Component", () => {
  const mockExecute = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Set up default reCAPTCHA behavior (resolved token)
    mockExecute.mockResolvedValue("mock-token");
    (useGoogleReCaptcha as vi.Mock).mockReturnValue({
      executeRecaptcha: mockExecute,
    });

    // Mock global fetch
    global.fetch = vi.fn();
  });

  it("handles server errors correctly and displays error-container", async () => {
    // Setup fetch to simulate a 500 error
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: "Server Error" }),
    });

    render(<ContactPage />);
    
    // Fill required fields to satisfy HTML5 validation
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: "Jay" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "jay@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/project details/i), { target: { value: "Test Message" } });

    // Trigger submission
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    // Wait for the error container to appear
    const error = await screen.findByTestId("error-container", {}, { timeout: 2000 });
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/something went wrong/i);
  });

  it("handles successful submission and allows resetting the form", async () => {
    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<ContactPage />);

    // Fill fields
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: "Jay" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "jay@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/project details/i), { target: { value: "Hello" } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    // Verify Success UI appears via Test ID
    const success = await screen.findByTestId("success-container");
    expect(success).toBeInTheDocument();
    expect(screen.getByText(/talk soon/i)).toBeInTheDocument();

    // Test the Reset functionality
    const resetBtn = screen.getByRole("button", { name: /another/i });
    fireEvent.click(resetBtn);

    // Verify we are back to the form state
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.queryByTestId("success-container")).not.toBeInTheDocument();
  });

  it("shows loading state and disables inputs during submission", async () => {
    // Create a promise that stays pending to test loading state
    let resolveFetch: (value: any) => void;
    const pendingPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    (global.fetch as vi.Mock).mockReturnValue(pendingPromise);

    render(<ContactPage />);

    // Fill and Click
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: "Jay" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "jay@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/project details/i), { target: { value: "Wait for it" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Assert UI shows "Sending..." and inputs are disabled
    const loadingBtn = screen.getByRole("button", { name: /sending/i });
    expect(loadingBtn).toBeDisabled();
    expect(screen.getByPlaceholderText(/name/i)).toBeDisabled();

    // Clean up the pending promise to avoid test leaks
    await act(async () => {
      resolveFetch!({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
  });
});
