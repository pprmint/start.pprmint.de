export default function BahnClock({ time, large }: { time: number[], large?: boolean }) {
  const rotateHour = 30 * time[0] + (time[1] / 60) * 30;
  const rotateMinute = 6 * time[1] + 360 * time[0];
  const rotateSecond = (360 / 59) * time[2] + 6;

  return (
    <div className={`relative size-64 ${large && "lg:size-96 border-2"} border border-elevate-1 rounded-full shadow-inner duration-700 ease-in-out`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 186 186"
        className="absolute inset-0 m-2 fill-foreground-2"
      >
        <path d="M89.5 0h7v27h-7zM186 96.5h-27v-7h27zM89.5 159h7v27h-7zM0 89.5h27v7H0zM142.531 14.21l-10.704 18.54-6.062-3.5 10.704-18.54zM175.29 49.531l-18.54 10.704-3.5-6.062 18.54-10.704z" />
        <path d="M89.5 159h7v27h-7zM0 89.5h27v7H0zM171.79 142.531l-18.54-10.704 3.5-6.062 18.54 10.704zM136.469 175.29l-10.704-18.54 6.062-3.5 10.704 18.54zM60.235 156.75l-10.704 18.54-6.062-3.5 10.704-18.54zM32.75 131.827l-18.54 10.704-3.5-6.062 18.54-10.704zM29.25 60.235 10.71 49.531l3.5-6.062 18.54 10.704zM54.173 32.75 43.469 14.21l6.062-3.5 10.704 18.54zM104.71.719l-.836 7.956-3.978-.418.836-7.957zM185.281 104.71l-7.956-.836.418-3.978 7.957.836zM81.29 185.281l.836-7.956 3.978.418-.836 7.957zM.719 81.29l7.956.836-.418 3.978L.3 85.268zM114.292 2.448l-1.663 7.825-3.913-.831 1.663-7.826zM183.552 114.292l-7.825-1.663.831-3.913 7.826 1.663zM71.708 183.552l1.663-7.825 3.913.831-1.663 7.826zM2.448 71.708l7.825 1.663-.831 3.913-7.826-1.663zM123.641 5.17l-2.472 7.608-3.805-1.236 2.472-7.608zM180.83 123.641l-7.608-2.472 1.236-3.805 7.608 2.472zM62.359 180.83l2.472-7.608 3.805 1.236-2.472 7.608zM5.17 62.359l7.608 2.472-1.236 3.805-7.608-2.472zM132.654 8.854l-3.254 7.308-3.654-1.627 3.253-7.308zM177.146 132.654l-7.308-3.254 1.627-3.654 7.308 3.253zM53.346 177.146l3.254-7.308 3.654 1.627-3.253 7.308zM8.854 53.346l7.308 3.254-1.627 3.654-7.308-3.253zM149.282 18.937l-4.702 6.472-3.236-2.351 4.702-6.472zM167.063 149.282l-6.472-4.702 2.351-3.236 6.472 4.702zM36.718 167.063l4.702-6.472 3.236 2.351-4.702 6.472zM18.937 36.718l6.472 4.702-2.351 3.236-6.472-4.702zM156.715 25.226l-5.353 5.945-2.972-2.677 5.353-5.945zM160.774 156.715l-5.945-5.353 2.677-2.972 5.945 5.353zM29.285 160.774l5.353-5.945 2.972 2.677-5.353 5.945zM25.226 29.285l5.945 5.353-2.677 2.972-5.945-5.353zM163.451 32.257l-5.945 5.353-2.677-2.972 5.945-5.353zM153.743 163.451l-5.353-5.945 2.972-2.677 5.353 5.945zM22.549 153.743l5.945-5.353 2.677 2.972-5.945 5.353zM32.257 22.549l5.353 5.945-2.972 2.677-5.353-5.945zM169.414 39.954l-6.472 4.702-2.351-3.236 6.472-4.702zM146.046 169.414l-4.702-6.472 3.236-2.351 4.702 6.472zM16.586 146.046l6.472-4.702 2.351 3.236-6.472 4.702zM39.954 16.586l4.702 6.472-3.236 2.351-4.702-6.472zM178.773 57.001l-7.308 3.253-1.627-3.654 7.308-3.254zM128.999 178.773l-3.253-7.308 3.654-1.627 3.254 7.308zM7.227 128.999l7.308-3.253 1.627 3.654-7.308 3.254zM57.001 7.227l3.253 7.308-3.654 1.627-3.254-7.308zM182.066 66.164l-7.608 2.472-1.236-3.805 7.608-2.472zM119.836 182.066l-2.472-7.608 3.805-1.236 2.472 7.608zM3.934 119.836l7.608-2.472 1.236 3.805-7.608 2.472zM66.164 3.934l2.472 7.608-3.805 1.236-2.472-7.608zM184.384 75.621l-7.826 1.663-.831-3.913 7.825-1.663zM110.379 184.384l-1.663-7.826 3.913-.831 1.663 7.825zM1.616 110.379l7.826-1.663.831 3.913-7.825 1.663zM75.621 1.616l1.663 7.826-3.913.831-1.663-7.825zM185.7 85.268l-7.957.836-.418-3.978 7.956-.836zM100.732 185.7l-.836-7.957 3.978-.418.836 7.956zM.3 100.732l7.957-.836.418 3.978-7.956.836zM85.268.3l.836 7.957-3.978.418L81.29.719z" />
      </svg>
      <div className="absolute inset-0 drop-shadow-md">
        <div
          id="hour"
          className="absolute inset-0 duration-100"
          style={{
            transform: `rotate(${rotateHour}deg)`,
          }}
        >
          <div className={`absolute bg-foreground-2 w-3.5 h-16 top-14 ${large && "lg:w-5 lg:h-28 lg:top-20"} left-1/2 -translate-x-1/2 duration-700 ease-in-out`} />
        </div>
        <div
          id="minute"
          className="absolute inset-0 duration-[0.4s]"
          style={{
            transform: `rotate(${rotateMinute}deg)`,
            transitionTimingFunction: "cubic-bezier(0.3, 2.5, 0, 0.5)",
          }}
        >
          <div className={`absolute bg-foreground-2 w-2.5 h-28 top-4 ${large && "lg:w-4 lg:h-40 lg:top-5"} left-1/2 -translate-x-1/2 duration-700 ease-in-out`} />
        </div>
        {time[2] !== undefined && time[2] !== null && (
          <div
            id="second"
            className={`absolute inset-0 ${time[2] <= 58 && "duration-[0.99s]"}`}
            style={{
              transform: `rotate(${time[2] == 0 ? 6 : time[2] <= 58 ? rotateSecond : 0}deg)`,
              transitionTimingFunction: "cubic-bezier(0.2, 0.2, 0.7, 0.9)",
            }}
          >
            <div className={`absolute bg-accent w-1 h-10 top-2 ${large && "lg:w-2 lg:h-14"} left-1/2 -translate-x-1/2 duration-700 ease-in-out`} />
            <div className={`absolute bg-accent w-1 h-16 top-16 ${large && "lg:w-2 lg:h-20 lg:top-24"} left-1/2 -translate-x-1/2 duration-700 ease-in-out`} />
            <div className={`absolute border-4 border-accent size-6 top-11 ${large && "lg:border-[7px] lg:size-9 lg:top-[60px]"} left-1/2 -translate-x-1/2 rounded-full duration-700 ease-in-out`} />
          </div>
        )}
      </div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 ${large && "lg:size-9"} rounded-full bg-foreground-2 duration-700 ease-in-out`} />
      <div className="absolute inset-0 rounded-full bg-linear-to-b from-elevate-1/25" />
    </div>
  );
}
