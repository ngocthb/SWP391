// SWP391/src/Components/client/Login/Login.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { useDispatch } from "react-redux";
import api from "../../../config/axios";
import { message } from "antd";

// Mock the necessary modules
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../../config/axios");

describe("Login Component", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<Login />);
    expect(screen.getByLabelText(/User name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/LOG IN/i)).toBeInTheDocument();
  });

  test("submits form with valid credentials", async () => {
    api.post.mockResolvedValueOnce({
      data: { token: "fakeToken", role: "ADMIN" },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/User name/i), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "testPassword" },
    });
    fireEvent.click(screen.getByText(/LOG IN/i));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("login", {
        username: "testUser",
        password: "testPassword",
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_ROLE",
        payload: "ADMIN",
      });
      // Add navigation assertions if using a router
    });
  });

  test("shows error message on failed login", async () => {
    const errorMessage = "Invalid credentials";
    api.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });
    jest.spyOn(message, "error");

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/User name/i), {
      target: { value: "wrongUser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongPassword" },
    });
    fireEvent.click(screen.getByText(/LOG IN/i));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  test("handles Google login", async () => {
    // Mock Google login functionality
    const mockSignInWithPopup = jest.fn().mockResolvedValue({
      user: { displayName: "Test User" },
      credential: { accessToken: "fakeGoogleToken" },
    });
    jest.mock("firebase/auth", () => ({
      getAuth: jest.fn(),
      signInWithPopup: mockSignInWithPopup,
      GoogleAuthProvider: { credentialFromResult: jest.fn() },
    }));

    render(<Login />);
    fireEvent.click(screen.getByText(/Sign in with Google/i));

    await waitFor(() => {
      expect(mockSignInWithPopup).toHaveBeenCalled();
      // Add assertions for user state or navigation if necessary
    });
  });
});
