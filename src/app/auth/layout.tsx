
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="bg-blue-400 min-h-screen">
        {children}
    </main>
  );
}