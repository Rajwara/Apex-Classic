/* Splits text into word spans for the scrubbed word-by-word reveal. */
export default function Words({ text, className }: { text: string; className: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <p className={className} data-words>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  );
}
