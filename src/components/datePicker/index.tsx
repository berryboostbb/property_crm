import { Icon } from "@iconify/react";
import { DatePicker as AntDatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

interface CustomDatePickerProps extends DatePickerProps {
  className?: string;
  label?: string;
  placeholder?: string;
}

export default function DatePicker({
  className = "",
  label = "Date",
  placeholder = "Select the Date",
  ...props
}: CustomDatePickerProps) {
  return (
    <div className="relative w-full">
      <label className="absolute z-10 px-1 text-xs bg-white -top-2 left-5 text-light">
        {label}
      </label>

      <AntDatePicker
        {...props}
        placeholder={placeholder}
        getPopupContainer={(triggerNode) => triggerNode.parentElement!}
        className="w-full px-3 py-2 text-sm rounded-md placeholder:text-light custom-datepicker h-14"
        style={{
          height: "56px",
          width: "100%",
          border: "0.5px solid #0755E9",
          boxShadow: "none",
        }}
        format="YYYY-MM-DD"
        defaultValue={dayjs()}
        suffixIcon={
          <Icon
            icon="fe:calendar"
            className="text-primary"
            style={{ fontSize: "22px", cursor: "pointer" }}
          />
        }
      />
      <style>
        {`
      .custom-datepicker .ant-picker-input input::placeholder {
        color: #7d7d7d; 
        opacity: 1;    
      }
    `}
      </style>
    </div>
  );
}
