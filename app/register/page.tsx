import { Metadata } from "next";
import { RegisterModal } from "./register-modal";

export const metadata: Metadata = {
  title: `Sign up for Gonote`,
};

export default function Register() {
  return (
    <div className="flex h-screen w-screen justify-center">
      <RegisterModal />
    </div>
  );
}
