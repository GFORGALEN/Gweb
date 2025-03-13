import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <LoginForm />
    </div>
  );
}