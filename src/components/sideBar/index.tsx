import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { setIsLoggedIn } from "../../redux/userSlice";
import Logo from "../../assets/PropertyCRM Logo 1.png";
import { HTTP_CLIENT } from "../../utils/httpClient";
import { store } from "../../redux/store";
import { notifyError, notifySuccess } from "../toast";
import Notification from "../notifications";
import { Avatar } from "antd";
import Bilal from "../../assets/bilal.jpg";
import { defaultLinks22 } from "../../utils/constant";

export default function SideBar({ link }: any) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = () => {
    const { token } = store.getState().user;

    setLoading(true);
    HTTP_CLIENT.post(
      "/auth/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then(() => {
        store.dispatch(setIsLoggedIn(false));
        notifySuccess("Successfully logged out");
        navigate("/");
      })
      .catch((err: any) => {
        console.error(
          "🚀 ~ handleLogout ~ err:",
          err.response?.data?.message || err.message,
        );
        notifyError(err.response?.data?.message || "Logout failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isOpen ? (
        <button
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          className="fixed z-50 p-3 text-xl bg-white rounded-full xl:hidden top-4 right-4 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon="iconamoon:close-bold" className="2xl" />
        </button>
      ) : (
        <button
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          className="absolute z-50 p-3 text-xl bg-white rounded-full xl:hidden top-4 right-4 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon="ic:baseline-menu" className="2xl" />
        </button>
      )}

      <aside
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className={`fixed xl:relative top-0 left-0 h-full overflow-y-auto xl:h-[calc(100vh-32px)] bg-[#F7F7F7] xl:w-[320px] lg:w-1-0 md:w-80 sm:w-90 w-[320px]  flex flex-col xl:rounded-xl rounded-tr-xl rounded-br-xl transition-transform z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        <div className="flex items-center gap-2 p-2">
          <img src={Logo} className="h-auto w-15" alt="logo" />
          <p className="text-lg font-bold text-primary">
            Property <span className="text-[#FF7631]">CRM</span>
          </p>
        </div>
        <div className="flex items-center justify-between h-16 p-2 mt-4 bg-white rounded-lg">
          <div className="bg-white rounded-[9px]  flex gap-2 items-center">
            <Avatar size={40} src={Bilal} />
            <div>
              <p className="text-primary capitalize text-xs leading-3.5 truncate">
                Eng
              </p>
              <p className="text-heading text-sm leading-3.5">Bilal Hassan</p>
              <p className="text-xs text-[#979797] leading-3">
                bilal.hassan2503@gmail.com
              </p>
            </div>
          </div>
          <div className="">
            <Notification />
          </div>
        </div>
        <p className="text-[#979797] text-sm font-normal px-2 mt-7.5">MENU</p>

        <nav
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="flex xl:h-[60%] 2xl:h-[70%] overflow-y-auto p-2 flex-col gap-0 mt-4"
        >
          {link.map((item: any, index: number) => {
            const hasChildren = item.children && item.children.length > 0;
            const isDropdownOpen = openDropdown === item.name;
            const isActive = hasChildren
              ? item.children.some((child: any) =>
                  location.pathname.startsWith(child.path),
                )
              : location.pathname.startsWith(item.path);

            return (
              <div key={index} className="relative w-full ">
                <p
                  onClick={() => {
                    if (hasChildren) {
                      toggleDropdown(item.name);
                    } else {
                      setOpenDropdown(null);
                      onClick(item.path);
                    }
                  }}
                  className={`cursor-pointer text-heading py-2 h-12 text-sm flex items-center gap-2 rounded-xl transition relative ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 w-2 h-12 rounded-r-lg bg-primary"></span>
                  )}
                  {item.name == "Secondary Sale" ? (
                    <span
                      className={`pl-5 ${
                        isActive ? "text-primary" : "text-[#757575]"
                      }`}
                    >
                      <Icon
                        style={{ transform: "scaleX(-1)" }}
                        icon={item.icon}
                        width="20"
                        height="20"
                      />
                    </span>
                  ) : (
                    <span
                      className={`pl-5 ${
                        isActive ? "text-primary" : "text-[#757575]"
                      }`}
                    >
                      <Icon icon={item.icon} width="20" height="20" />
                    </span>
                  )}

                  <span className="text-sm">{item.name}</span>
                  {hasChildren && (
                    <span
                      className={`ml-auto pr-4 ${
                        isActive ? "text-primary" : "text-light"
                      }`}
                    >
                      {isDropdownOpen ? (
                        <Icon icon="formkit:up" className="2xl text-heading" />
                      ) : (
                        <Icon
                          icon="formkit:Down"
                          className="2xl text-heading"
                        />
                      )}
                    </span>
                  )}
                </p>
                {hasChildren && isDropdownOpen && (
                  <div>
                    <div className="pl-5 pr-4 py-2 flex flex-col  mt-2 bg-[#E5EBF7] rounded-xl">
                      {item.children.map((child: any, idx: number) => {
                        const isChildActive = location.pathname.startsWith(
                          child.path,
                        );

                        return (
                          <div
                            key={child.path}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <div
                              className={`h-7
                              ${
                                isChildActive
                                  ? " border-primary  border-l-2"
                                  : " border-light border-l-2"
                              }
                            `}
                            ></div>
                            <p
                              key={idx}
                              onClick={() => onClick(child.path)}
                              className={`cursor-pointer text-sm py-1 pl-3 hover:bg-[#F7F7F7] rounded-md w-full
                              ${
                                isChildActive
                                  ? "text-heading font-medium"
                                  : "text-light"
                              }
                            `}
                            >
                              {child.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <p className="text-[#979797] text-sm font-normal px-2 mt-4">DEFINE</p>

        <nav
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="flex xl:h-[70%] 2xl:h-[80%] overflow-y-auto p-2 flex-col gap-0 mt-4"
        >
          {defaultLinks22.map((item: any, index: number) => {
            const hasChildren = item.children && item.children.length > 0;
            const isDropdownOpen = openDropdown === item.name;
            const isActive = hasChildren
              ? item.children.some((child: any) =>
                  location.pathname.startsWith(child.path),
                )
              : location.pathname.startsWith(item.path);

            return (
              <div key={index} className="relative w-full ">
                <p
                  onClick={() => {
                    if (hasChildren) {
                      toggleDropdown(item.name);
                    } else {
                      setOpenDropdown(null);
                      onClick(item.path);
                    }
                  }}
                  className={`cursor-pointer text-heading py-2 h-12 text-sm flex items-center gap-2 rounded-xl transition relative ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 w-2 h-12 rounded-r-lg bg-primary"></span>
                  )}
                  {item.name == "Secondary Sale" ? (
                    <span
                      className={`pl-5 ${
                        isActive ? "text-primary" : "text-[#757575]"
                      }`}
                    >
                      <Icon
                        style={{ transform: "scaleX(-1)" }}
                        icon={item.icon}
                        width="20"
                        height="20"
                      />
                    </span>
                  ) : (
                    <span
                      className={`pl-5 ${
                        isActive ? "text-primary" : "text-[#757575]"
                      }`}
                    >
                      <Icon icon={item.icon} width="20" height="20" />
                    </span>
                  )}

                  <span className="text-sm">{item.name}</span>
                  {hasChildren && (
                    <span
                      className={`ml-auto pr-4 ${
                        isActive ? "text-primary" : "text-light"
                      }`}
                    >
                      {isDropdownOpen ? (
                        <Icon icon="formkit:up" className="2xl text-heading" />
                      ) : (
                        <Icon
                          icon="formkit:Down"
                          className="2xl text-heading"
                        />
                      )}
                    </span>
                  )}
                </p>
                {hasChildren && isDropdownOpen && (
                  <div>
                    <div className="pl-5 pr-4 py-2 flex flex-col  mt-2 bg-[#E5EBF7] rounded-xl">
                      {item.children.map((child: any, idx: number) => {
                        const isChildActive = location.pathname.startsWith(
                          child.path,
                        );

                        return (
                          <div
                            key={child.path}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <div
                              className={`h-7
                              ${
                                isChildActive
                                  ? " border-primary  border-l-2"
                                  : " border-light border-l-2"
                              }
                            `}
                            ></div>
                            <p
                              key={idx}
                              onClick={() => onClick(child.path)}
                              className={`cursor-pointer text-sm py-1 pl-3 hover:bg-[#F7F7F7] rounded-md w-full
                              ${
                                isChildActive
                                  ? "text-heading font-medium"
                                  : "text-light"
                              }
                            `}
                            >
                              {child.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <button
          disabled={loading}
          onClick={handleLogout}
          className="flex items-center gap-3 pl-5 mt-auto mb-2 text-base font-normal cursor-pointer text-heading"
        >
          <Icon
            icon="clarity:logout-solid"
            width="20"
            height="20"
            color="#7d7d7d"
          />
          <p>Logout</p>
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-30 xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
