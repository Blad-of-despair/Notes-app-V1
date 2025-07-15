import AuthWrapper from "@/components/AuthWrapper";

export default function NotesLayout({ children }) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
}
