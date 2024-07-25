"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";

function Settings() {
  // Theme
  const { theme, setTheme } = useTheme();
  const Themes = [
    {
      text: "light",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="currentColor"
        >
          <path d="M7.5 4.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 7.5 5.9M7 1h1v3H7zM10.328 5.379l-.707-.707 2.122-2.122.707.707zM11 8V7h3v1zM9.621 10.328l.707-.707 2.122 2.122-.707.707zM7 11h1v3H7zM3.257 12.45l-.707-.707 2.122-2.122.707.707zM1 8V7h3v1zM2.55 3.257l.707-.707 2.122 2.122-.707.707z"></path>
        </svg>
      ),
    },
    {
      text: "system",
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="currentColor"
            className="hidden md:block"
          >
            <path d="M4.761 10H2.5A1.5 1.5 0 0 1 1 8.5v-5A1.5 1.5 0 0 1 2.5 2h10A1.5 1.5 0 0 1 14 3.5v5a1.5 1.5 0 0 1-1.5 1.5h-2.261L11 11.904V13H4v-1.096zm4.4 0H5.839l-.8 2h4.922zM13 3.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="currentColor"
            className="block md:hidden"
          >
            <path d="M12 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-10A1.5 1.5 0 0 1 4.5 1h6A1.5 1.5 0 0 1 12 2.5m-1 0a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"></path>
            <circle cx="7.5" cy="11.5" r=".75"></circle>
          </svg>
        </>
      ),
    },
    {
      text: "dark",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="currentColor"
        >
          <path d="M9.031 1.767a.5.5 0 0 1 .938 0l.341.923.923.341a.5.5 0 0 1 0 .938l-.923.341-.341.923a.5.5 0 0 1-.938 0L8.69 4.31l-.923-.341a.5.5 0 0 1 0-.938l.923-.341zM12.031 5.267a.5.5 0 0 1 .938 0l.206.558.558.206a.5.5 0 0 1 0 .938l-.558.206-.206.558a.5.5 0 0 1-.938 0l-.206-.558-.558-.206a.5.5 0 0 1 0-.938l.558-.206zM3.162 2.193a.985.985 0 0 1 1.727.37c.456 1.537 1.397 3.28 2.832 4.716 1.438 1.437 3.185 2.379 4.718 2.821.367.093.65.386.73.756a1 1 0 0 1-.365.998l-.008.006c-2.705 1.962-6.514 1.729-8.95-.706s-2.668-6.246-.691-8.953zm9.025 8.875-.011-.003c-1.682-.484-3.592-1.509-5.162-3.079-1.563-1.564-2.587-3.464-3.086-5.148a5.905 5.905 0 0 0 .626 7.608c2.076 2.077 5.32 2.281 7.633.622"></path>
        </svg>
      ),
    },
  ];

  // Clock design
  const lsClock = localStorage.getItem("clock");
  const Clocks = ["Digital", "Digital (no animations)", "Analog", "None"];
  const [clock, setClock] = useState(
    Clocks.some((clock) => clock === lsClock) ? lsClock : "Digital"
  );
  function handleClockChange(clock: string) {
    setRefresh(true);
    setClock(clock);
    localStorage.setItem("clock", clock);
  }

  // Hide seconds
  const lsHideSec = localStorage.getItem("hideSec");
  const [hideSec, setHideSec] = useState(lsHideSec === "true" ? true : false);
  function handleHideSecChange() {
    setRefresh(true);
    if (lsHideSec) {
      localStorage.removeItem("hideSec");
      setHideSec(false);
    } else {
      localStorage.setItem("hideSec", "true");
      setHideSec(true);
    }
  }

  // Refresh page after changing certain settings.
  const [refresh, setRefresh] = useState(false);

  return (
    <Dialog.Root onOpenChange={() => refresh && location.reload()}>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-neutral-50 hover:text-neutral-950 dark:hover:bg-neutral-900 dark:hover:text-neutral-50 rounded-full duration-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="currentColor"
          >
            <path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path>
            <path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path>
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-white/75 dark:bg-neutral-950/75 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 rounded-xl shadow-2xl bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 size-full max-w-2xl md:h-max md:max-h-screen">
          <Dialog.Title className="text-2xl md:text-3xl text-neutral-950 dark:text-neutral-50 font-bold">
            Settings
          </Dialog.Title>
          <Dialog.Description className="pb-3">
            Make changes to the start page here.
          </Dialog.Description>
          <fieldset className="flex items-center justify-between my-3 h-10">
            <label
              className="text-neutral-950 dark:text-neutral-50"
              htmlFor="theme"
            >
              Theme
            </label>
            <Select.Root
              value={theme}
              defaultValue="theme"
              onValueChange={(value: string) => setTheme(value)}
            >
              <Select.Trigger
                className="group capitalize relative inline-flex items-center justify-between w-56 px-3 h-10 overflow-clip ease-in-out outline-none border border-neutral-100 dark:border-neutral-900 dark:hover:border-neutral-800 rounded-lg duration-100 hover:text-neutral-950 dark:hover:text-neutral-50"
                aria-label="Site theme"
              >
                <Select.Value />
                <Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="currentColor"
                  >
                    <path d="M3 5.957V4.543l4.5 4.5 4.5-4.5v1.414l-4.5 4.5z"></path>
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 rounded-lg shadow-xl dark:shadow-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <Select.Viewport className="p-1">
                    {Themes.map((theme, index) => (
                      <Select.Item
                        key={index}
                        value={theme.text}
                        className="relative px-2 py-1 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer select-none outline-none duration-100"
                      >
                        <Select.ItemText asChild>
                          <div className="flex gap-3 items-center">
                            {theme.icon}
                            {theme.text}
                          </div>
                        </Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="currentColor"
                          >
                            <path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
                          </svg>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </fieldset>
          <hr className="dark:border-neutral-900" />
          <fieldset className="flex items-center justify-between my-3 h-10">
            <div className="">
              <label
                className="text-neutral-950 dark:text-neutral-50"
                htmlFor="clock"
              >
                Clock design
              </label>
              <p className="text-xs">Requires page refresh.</p>
            </div>
            <Select.Root
              value={clock || undefined}
              defaultValue="Digital"
              onValueChange={(value: string) => handleClockChange(value)}
            >
              <Select.Trigger
                className="group relative inline-flex items-center justify-between w-56 px-3 h-10 overflow-clip ease-in-out outline-none border border-neutral-100 dark:border-neutral-900 dark:hover:border-neutral-800 rounded-lg duration-100 hover:text-neutral-950 dark:hover:text-neutral-50"
                aria-label="Clock design"
              >
                <Select.Value />
                <Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="currentColor"
                  >
                    <path d="M3 5.957V4.543l4.5 4.5 4.5-4.5v1.414l-4.5 4.5z"></path>
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 rounded-lg shadow-xl dark:shadow-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <Select.Viewport className="p-1">
                    {Clocks.map((clock, index) => (
                      <Select.Item
                        key={index}
                        value={clock}
                        className="relative px-2 py-1 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer select-none outline-none duration-100"
                      >
                        <Select.ItemText>{clock}</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="currentColor"
                          >
                            <path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
                          </svg>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </fieldset>
          <hr className="dark:border-neutral-900" />
          <fieldset className="flex items-center justify-between my-3 h-10">
            <div className="">
              <label
                className="text-neutral-950 dark:text-neutral-50"
                htmlFor="hideSec"
              >
                Hide seconds
              </label>
              <p className="text-xs">Requires page refresh.</p>
            </div>
            <Switch.Root
              className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-neutral-950 dark:data-[state=checked]:bg-neutral-50 outline-none rounded-full border border-neutral-100 data-[state=unchecked]:hover:border-neutral-200 data-[state=unchecked]:hover:dark:border-neutral-800 dark:border-neutral-900 data-[state=checked]:border-neutral-950 dark:data-[state=checked]:border-neutral-50 duration-200"
              id="hideSec"
              checked={hideSec}
              onCheckedChange={handleHideSecChange}
            >
              <Switch.Thumb className="relative block size-5 data-[state=unchecked]:bg-neutral group-hover:data-[state=unchecked]:bg-neutral-950 dark:group-hover:data-[state=unchecked]:bg-neutral-50 dark:data-[state=unchecked]:bg-neutral data-[state=checked]:bg-white dark:data-[state=checked]:bg-neutral-950 rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7">
                <div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=checked]:left-2.5 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-white dark:group-data-[state=unchecked]:ring-neutral-950 group-data-[state=checked]:ring-neutral-950 dark:group-data-[state=checked]:ring-neutral-50 duration-200 ease-out" />
              </Switch.Thumb>
            </Switch.Root>
          </fieldset>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 hover:text-neutral-950 hover:bg-neutral-50 hover:dark:bg-neutral-800 hover:dark:text-neutral-50 p-2 duration-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
              >
                <path d="M6.793 7.5 3.646 4.354l.708-.708L7.5 6.793l3.146-3.147.708.708L8.207 7.5l3.147 3.146-.708.708L7.5 8.207l-3.146 3.147-.708-.708z"></path>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default dynamic(() => Promise.resolve(Settings), {
  ssr: false,
});
