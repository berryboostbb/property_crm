import { Icon } from "@iconify/react";

export default function SearchInput({ name, placeholder }: any) {
  return (
    <div className="flex items-center w-full gap-3">
      <p className="text-sm font-normal text-heading">{name}</p>
      <div className="relative w-full">
        <Icon
          icon="fluent:search-32-filled"
          className="absolute text-2xl text-light top-2 left-2 "
        />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-2 text-sm border rounded-md border-primary focus:outline-none focus:ring-0 focus:ring-primary placeholder:text-light"
        />
      </div>
    </div>
  );
}
