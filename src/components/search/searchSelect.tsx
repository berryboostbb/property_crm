import { Icon } from "@iconify/react";
import { useState } from "react";

type SearchSelectProps = {
  placeholder?: string;
  options: string[];
  onChange?: (value: string) => void;
};

export default function SearchSelect({
  placeholder = "Select option",
  options,
  onChange,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-10 px-3 text-sm border rounded-md cursor-pointer border-primary"
      >
        {selected ? (
          <span className="text-heading">{selected}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {open ? (
          <Icon icon="icon-park-outline:up" className="text-light" />
        ) : (
          <Icon icon="icon-park-outline:down" className="text-light" />
        )}
      </div>
      {open && (
        <div className="absolute left-0 z-50 w-full py-2 bg-white border rounded-md shadow-md top-11 border-primary">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
