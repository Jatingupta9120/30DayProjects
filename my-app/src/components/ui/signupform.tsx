"use client";
import React, { useState } from "react";
import Label from "../ui/label";
import Input from "../ui/input";
import cn from "../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// Component for the Signup form
export const SignupFormDemo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, isLoaded } = useSignUp();
  const isLoading = !isLoaded;
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!firstname || !lastname || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one uppercase letter, one number, and one special character.");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Ensure signUp is initialized
    if (!signUp) {
      setError("Sign up is not initialized");
      return;
    }

    try {
      // Sign up user with Clerk API
      await signUp.create({
        firstName: firstname.trim(),
        lastName: lastname.trim(),
        emailAddress: email.trim().toLowerCase(),
        password,
      });

      console.log({
        firstName: firstname.trim(),
        lastName: lastname.trim(),
        emailAddress: email.trim().toLowerCase(),
        password,
      });

      // After successful creation, prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // Navigate to verification page
      navigate("/verify-email");
    } catch (err: any) {
      console.error("Error signing up:", err);
      if (err.errors && err.errors.length > 0) {
        const clerkError = err.errors[0];
        console.error('Clerk Error:', clerkError); // Log detailed Clerk error
        switch (clerkError.code) {
          case "form_identifier_exists":
            setError("An account with this email already exists");
            break;
          case "form_password_pwned":
            setError("This password has been compromised. Please choose a different one");
            break;
          case "form_password_validation_failed":
            setError("Password must be at least 8 characters long and contain mixed case letters, numbers, and symbols");
            break;
          default:
            setError(clerkError.message || "An error occurred during sign up");
        }
      } else {
        setError(err.message || "An error occurred during sign up");
      }
    }
  };

  // Sign-up with Github
  const signUpWithGithub = async () => {
    if (!signUp) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err: any) {
      console.error("Error signing up with Github:", err);
      setError(err.message || 'An error occurred during Github sign up');
    }
  };

  // Sign-up with Google
  const signUpWithGoogle = async () => {
    if (!signUp) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err: any) {
      console.error("Error signing up with Google:", err);
      setError(err.message || 'An error occurred during Google sign up');
    }
  };


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black bg-black-200">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 bg-black-200">
        Welcome to Jedex99
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create your account to get started
      </p>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 ">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            type="email"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up →'}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* Social sign-up buttons */}
        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={signUpWithGithub}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Continue with GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={signUpWithGoogle}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
};

// Bottom Gradient Effect for buttons
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// LabelInputContainer Component - Used for wrapping form inputs with labels
const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignupFormDemo;