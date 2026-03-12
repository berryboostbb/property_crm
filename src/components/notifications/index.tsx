import { useState } from "react";

import { Icon } from "@iconify/react";

interface NotificationType {
  id: string;
  title: string;
  message: string;
  read: boolean;
  removing?: boolean;
}
const dummyNotifications: NotificationType[] = [
  {
    id: "1",
    title: "New Order",
    message: "A new order has been placed.",
    read: false,
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Your payment has been successfully received.",
    read: true,
  },
  {
    id: "3",
    title: "Account Update",
    message: "Your profile information was updated.",
    read: false,
  },
];
export default function Notification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationType[]>(dummyNotifications);
  const handleOpen = () => {
    setOpen((prev) => !prev);

    if (!open) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, removing: true } : n)),
    );

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  };

  return (
    <div className="relative">
      <div
        onClick={handleOpen}
        className="w-10 h-10 cursor-pointer bg-[#E5EBF7] rounded-full flex items-center justify-center relative"
      >
        <Icon icon="bxs:bell" className="text-xl text-primary" />
        <span className="absolute w-1.5 h-1.5 bg-red-500 rounded-full top-2.5 right-2.5"></span>
      </div>
      <div className="fixed top-20 right-0 bg-[#E5EBF7] w-64 md:w-90  shadow-xl rounded-xl overflow-hidden z-9999">
        <div className="p-3 font-medium border-b">Notifications</div>
        <div className="p-4 space-y-2 overflow-y-auto max-h-80">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                className={`p-3 flex justify-between text-sm rounded-md border transition-all duration-300 ${
                  note.removing
                    ? "opacity-0 translate-x-10"
                    : note.read
                      ? "bg-secondary"
                      : "bg-[#EAF0FF] border-primary"
                }`}
              >
                <div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-xs text-gray-600">{note.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(note.id)}
                  className="text-gray-500 transition hover:text-red-500"
                >
                  <Icon icon="eva:close-fill" className="text-lg" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">
              No notifications
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
