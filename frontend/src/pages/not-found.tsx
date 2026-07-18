export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground">Page not found</p>
    </div>
  );
}