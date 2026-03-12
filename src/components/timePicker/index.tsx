import { Icon } from "@iconify/react";
import { TimePicker as AntTimePicker } from "antd";
import type { TimePickerProps } from "antd";
import dayjs from "dayjs";

interface CustomTimePickerProps extends TimePickerProps {
  className?: string;
  label?: string;
  placeholder?: string;
}

export default function TimePicker({
  className = "",
  label = "Time",
  placeholder = "Pick a time",
  ...props
}: CustomTimePickerProps) {
  return (
    <div className="relative w-full">
      <label className="absolute z-10 px-1 text-xs bg-white -top-2 left-5 text-light">
        {label}
      </label>

      <AntTimePicker
        {...props}
        placeholder={placeholder}
        className={`custom-timepicker placeholder:text-light rounded-md w-full h-14 px-3 py-2 text-sm ${className}`}
        style={{
          height: "56px",
          width: "100%",
          border: "1px solid #0755E9",
          boxShadow: "none",
        }}
        defaultValue={dayjs()}
        suffixIcon={
          <Icon
            icon="tabler:clock-filled"
            className="text-primary"
            style={{ fontSize: "22px", cursor: "pointer" }}
          />
        }
      />
    </div>
  );
}
