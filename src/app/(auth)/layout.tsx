export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center">
      {children}
    </div>
  );
}
