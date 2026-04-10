type FilterSelectProps = {
  label: string;
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
  id: string;
};

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  id
}: FilterSelectProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-hive-ink leading-tight">
        {label}
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-250 hover:bg-honey-50/50"
          >
            <input
              type="checkbox"
              name={id}
              value={option}
              checked={value.includes(option)}
              onChange={() => toggleOption(option)}
              className="h-4 w-4 rounded border-hive-line/70 bg-white text-honey-500 transition-colors cursor-pointer accent-honey-400 checked:border-honey-400/70"
            />
            <span className="text-sm text-hive-ink/80">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
