import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <AuthForm submitLabel="Create Account" />
    </div>
  );
}
