"use client";
import { useAuth, useSignIn } from '@clerk/clerk-react';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import cn from "../../lib/utils";
import Header from "../Header";
import Input from "./input";
import Label from "./label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import BackgroundBeams from './background-beams';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoaded } = useSignIn();
  const isLoading = !isLoaded;
  const navigate = useNavigate();

  const { isSignedIn } = useAuth();

  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!signIn) return;

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });
      
      if (result.status === "complete") {
        navigate("/dashboard");
      } else {
        console.log("Sign in status:", result.status);
        setError('Unable to complete sign in');
      }
    } catch (err: any) {
      console.error("Error signing in:", err);
      if (err.errors && err.errors.length > 0) {
        const clerkError = err.errors[0];
        switch (clerkError.code) {
          case "form_identifier_not_found":
            setError("No account found with this email");
            break;
          case "form_password_incorrect": 
            setError("Incorrect password");
            break;
          default:
            setError(clerkError.message || "An error occurred during sign in");
        }
      } else {
        setError(err.message || 'An error occurred during sign in');
      }
    }
  };

  const signInWithGithub = async () => {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err: any) {
      console.error("Error signing in with Github:", err);
      setError(err.message || 'An error occurred during Github sign in');
    }
  };

  const signInWithGoogle = async () => {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err: any) {
      console.error("Error signing in with Google:", err);
      setError(err.message || 'An error occurred during Google sign in');
    }
  };

  return (
    <div className="bg-black-200">
       <Header />
       <BackgroundBeams />
      <div className="flex items-center justify-center min-h-screen bg-black-50">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome back to Jedex99
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 mt-8">
            <button
              className="flex items-center justify-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={signInWithGithub}
            >
              <IconBrandGithub className="w-5 h-5" />
              <span>Sign in with Github</span>
            </button>

            <button
              className="flex items-center justify-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={signInWithGoogle}
            >
              <IconBrandGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="projectmayhem@fc.com"
                required
                aria-label="Email address"
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                aria-label="Password"
              />
            </LabelInputContainer>

            <button
              className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// LabelInputContainer component
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

// Bottom gradient effect for button hover
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export { SignInForm as default };