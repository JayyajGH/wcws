import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactPage from './contact';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

// 1. Mock reCAPTCHA locally
vi.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useGoogleReCaptcha: () => ({
    executeRecaptcha: vi.fn().mockResolvedValue('mock-aws-safe-token'),
  }),
}));

class ContactPageFactory extends ComponentFactory<Record<string, never>> {
  protected component = ContactPage;
  constructor() { super({}); }
}

const factory = new ContactPageFactory();

describe('Contact Page API Integration', () => {
  const API_URL = "https://h95xjanbk7.execute-api.eu-west-1.amazonaws.com/default/contactHandler";

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.clearAllMocks();
  });

  it('submits the correct payload to the AWS Lambda endpoint', async () => {
    // 2. Mock a successful AWS Response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    factory.render();

    // Fill form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Mr Tester' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'hello@wcws.co.uk' } });
    fireEvent.change(screen.getByLabelText(/how can i help/i), { target: { value: 'I need a website.' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      // 3. Verify the fetch call details
      expect(global.fetch).toHaveBeenCalledWith(API_URL, expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Mr Tester",
          email: "hello@wcws.co.uk",
          message: "I need a website.",
          recaptchaToken: "mock-aws-safe-token"
        })
      }));
    });

    expect(screen.getByTestId('success-container')).toBeInTheDocument();
  });

  it('handles AWS server-side errors (500) gracefully', async () => {
    // 1. Mock the failure response
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Internal Server Error" }),
    });

    factory.render();

    // 2. FILL THE FORM (Required to trigger the submission logic)
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/how can i help/i), { target: { value: 'Broken test fix' } });

    // 3. Click Submit
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // 4. Wait for the error container to appear
    // Use findBy instead of getBy to account for the async nature of fetch
    const errorContainer = await screen.findByTestId('error-container');
    expect(errorContainer).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    
    // Verify inputs are re-enabled
    expect(screen.getByLabelText(/full name/i)).not.toBeDisabled();
  });

  it('resets form state when "Send another message" is clicked', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    factory.render();

    // MUST fill the form fields because they are 'required'
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/how can i help/i), { target: { value: 'Testing reset' } });

    // Trigger submission
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // findByRole will now successfully wait for the async submission to finish
    const resetButton = await screen.findByRole('button', { 
      name: /send another message/i 
    });

    expect(resetButton).toBeInTheDocument();

    // Click reset
    fireEvent.click(resetButton);

    // Verify form returns to idle
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    });
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});
