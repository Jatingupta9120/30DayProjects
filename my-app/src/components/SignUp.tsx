"use client";
import  SignupFormDemo  from './ui/signupform';
import BackgroundBeams from './ui/background-beams';
import Header from './Header';

export const SignUpPage = () => (
   <div className="bg-black-200">
    <Header />
  <div className="flex items-center justify-center min-h-screen bg-black">
    <SignupFormDemo />
    {/* <BackgroundBeams /> */}
  </div>
   </div>
);

export { SignUpPage as default };
