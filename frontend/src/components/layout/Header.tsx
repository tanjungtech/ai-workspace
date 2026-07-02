export default function Header() {
  const today = new Date().toLocaleDateString();

  return (
    <header>
      <h1>AI Workspace</h1>

      <div>{today}</div>
    </header>
  );
}