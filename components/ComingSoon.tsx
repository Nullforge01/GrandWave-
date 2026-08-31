export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="content">
      <div className="page-head">
        <h1>{title}</h1>
        <p>This section of GrandWave is still brewing — check back soon.</p>
      </div>
    </div>
  );
}
