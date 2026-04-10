type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher par titre ou source..."
}: SearchBarProps) {
  return (
    <div className="relative group">
      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-hive-ink/40 transition-colors duration-250 group-focus-within:text-honey-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-hive-line/50 bg-white/70 py-3.5 pl-12 pr-4 text-hive-ink placeholder-hive-ink/50 backdrop-blur-sm transition-all duration-250 focus:border-honey-400/70 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-honey-400/20 focus:shadow-soft"
      />
    </div>
  );
}
