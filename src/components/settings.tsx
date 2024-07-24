"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";

function Settings() {
  const lsClock = localStorage.getItem("Clock");
  const Clocks = ["Digital", "None"]
  const [clock, setClock] = useState(
    Clocks.some((clock) => clock === lsClock) ? lsClock : "Digital"
  );
  function handleClockChange(clock: string) {
    setClock(clock);
    localStorage.setItem("Clock", clock);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-neutral-50 hover:text-neutral-950 dark:hover:bg-neutral-900 dark:hover:text-neutral-50 rounded-full duration-100"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path><path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path></svg></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-white/75 dark:bg-neutral-950/75 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 rounded-xl shadow-2xl bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 size-screen md:w-xl md:h-max md:max-h-screen">
          <Dialog.Title className="text-2xl md:text-3xl text-neutral-950 dark:text-white-50 font-bold">Settings</Dialog.Title>
          <Dialog.Description>Make changes to the start page here. Make sure to click on Save once you're done.</Dialog.Description>
          <fieldset className="my-6 flex items-center justify-between">
            <label className="text-neutral-950" htmlFor="clock">
              Clock design
            </label>
            <Select.Root
              value={clock || undefined}
              defaultValue="Digital"
              onValueChange={(value: string) => handleClockChange(value)}
            >
              <Select.Trigger
                className="group relative inline-flex items-center justify-between h-full w-44 px-3 overflow-clip ease-in-out outline-none"
                aria-label="Search engine"
              >
                <Select.Value />
                <Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 md:group-hover:opacity-100 md:group-data-[state='open']:opacity-100 duration-200">
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
                <Select.Content className="overflow-hidden bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 rounded-lg shadow-xl dark:shadow-neutral-950 border border-neutral-50 dark:border-neutral-800">
                  <Select.Viewport className="p-1">
                    {Clocks.map((clock, index) => (
                      <Select.Item
                        key={index}
                        value={clock}
                        className="relative px-2 py-1 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer select-none outline-none duration-100"
                      >
                        <Select.ItemText asChild>
                          <div className="flex gap-3 items-center">
                            {clock}
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
          <fieldset className="my-6 flex items-center justify-between">
            <label className="text-neutral-950" htmlFor="hideSec">
              Hide seconds
            </label>

          </fieldset>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 hover:text-neutral-950 hover:bg-neutral-50 dark:bg-neutral-800 p-2 duration-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M6.793 7.5 3.646 4.354l.708-.708L7.5 6.793l3.146-3.147.708.708L8.207 7.5l3.147 3.146-.708.708L7.5 8.207l-3.146 3.147-.708-.708z"></path></svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default dynamic(() => Promise.resolve(Settings), {
  ssr: false,
});
