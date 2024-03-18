import React from "react";

//<Icon iconName =""/>

const Icon = ({ iconName }) => {
  const icons = {
    add: (
      <svg
        className="add"
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        fill="currentColor"
        aria-hidden="true"
        viewBox="0 -960 960 960"
      >
        <path d="M450.001-450.001h-200q-12.75 0-21.375-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.625-8.615 21.375-8.615h200v-200q0-12.75 8.628-21.375 8.629-8.625 21.384-8.625 12.756 0 21.371 8.625 8.615 8.625 8.615 21.375v200h200q12.75 0 21.375 8.628 8.625 8.629 8.625 21.384 0 12.756-8.625 21.371-8.625 8.615-21.375 8.615h-200v200q0 12.75-8.628 21.375-8.629 8.625-21.384 8.625-12.756 0-21.371-8.625-8.615-8.625-8.615-21.375v-200Z" />
      </svg>
    ),
    back: (
      <svg
        className="back"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill-rule="evenodd"
        focusable="false"
        data-icon="close"
        width="1rem"
        height="1rem"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="m127.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L65.078-428.77Q54.23-439.616 49-453.077 43.77-466.539 43.77-480q0-13.461 5.23-26.923 5.231-13.461 16.078-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L127.384-480Z" />
      </svg>
    ),
    close: (
      <svg
        className="close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill-rule="evenodd"
        focusable="false"
        data-icon="close"
        width="1rem"
        height="1rem"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z" />
      </svg>
    ),
    lightbulb: (
      <svg
        className="lightbulb"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M480-96.924q-30.307 0-52.269-21-21.961-21-23.885-51.307h152.308q-1.924 30.307-23.885 51.307-21.962 21-52.269 21ZM360-224.617q-12.769 0-21.384-8.615-8.615-8.616-8.615-21.384 0-12.769 8.615-21.385 8.615-8.615 21.384-8.615h240q12.769 0 21.384 8.615 8.615 8.616 8.615 21.385 0 12.768-8.615 21.384-8.615 8.615-21.384 8.615H360Zm-23.846-115.384q-62.845-39.077-99.499-102.115Q200.001-505.154 200.001-580q0-116.922 81.538-198.461Q363.078-859.999 480-859.999q116.922 0 198.461 81.538Q759.999-696.922 759.999-580q0 74.846-36.654 137.884-36.654 63.038-99.499 102.115H336.154ZM354-400h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
      </svg>
    ),
    location: (
      <svg
        className="location"
        style={{ width: "2rem" }}
        xmlns="http://www.w3.org/2000/svg"
        class="w-fit "
        height="2rem"
        width="2rem"
        viewBox="0 -960 960 960"
      >
        <path
          d="M480-179.461q117.384-105.076 179.654-201.577 62.269-96.5 62.269-169.039 0-109.384-69.5-179.846T480-800.385q-102.923 0-172.423 70.462t-69.5 179.846q0 72.539 62.269 169.039Q362.616-284.537 480-179.461Zm0 57.075q-11.692 0-23.384-4.038-11.692-4.039-21.154-12.5-53.845-49.615-100.768-102.191-46.923-52.577-81.577-105.115-34.654-52.539-54.846-104.154-20.193-51.616-20.193-99.693 0-138.46 89.577-224.191Q357.231-859.999 480-859.999t212.345 85.731q89.577 85.731 89.577 224.191 0 48.077-20.193 99.501-20.192 51.423-54.654 104.154-34.461 52.73-81.384 105.115-46.923 52.384-100.769 101.998-9.323 8.462-21.189 12.693-11.867 4.23-23.733 4.23Zm0-435.306Zm.068 72.307q29.855 0 51.047-21.26 21.192-21.26 21.192-51.115t-21.26-51.047q-21.26-21.192-51.115-21.192t-51.047 21.26q-21.192 21.26-21.192 51.115t21.26 51.047q21.26 21.192 51.115 21.192Z"
          fill="currentColor"
        />
      </svg>
    ),
    mapempty: (
      <svg
        className="mapempty"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7 20.75C13.6046 20.7479 13.5102 20.7311 13.42 20.7L8.76 18.85L3.93 20.7C3.81747 20.7422 3.69634 20.7564 3.57709 20.7413C3.45785 20.7262 3.34407 20.6823 3.2456 20.6134C3.14713 20.5445 3.06693 20.4526 3.01194 20.3457C2.95696 20.2389 2.92883 20.1202 2.93 20V5.99999C2.92994 5.84849 2.97577 5.70051 3.06145 5.57556C3.14713 5.45061 3.26865 5.35454 3.41 5.29999L8.52 3.29999C8.67529 3.24509 8.84471 3.24509 9 3.29999L13.77 5.15999L19.47 3.28999C19.5814 3.25128 19.7006 3.24015 19.8173 3.25757C19.934 3.27499 20.0447 3.32042 20.14 3.38999C20.237 3.45921 20.3158 3.55081 20.3697 3.65701C20.4237 3.76321 20.4512 3.88087 20.45 3.99999V18C20.4499 18.1568 20.4006 18.3096 20.3091 18.437C20.2177 18.5643 20.0886 18.6598 19.94 18.71L13.94 20.71C13.8631 20.7379 13.7818 20.7514 13.7 20.75ZM8.76 17.29C8.85656 17.2896 8.95208 17.31 9.04 17.35L13.72 19.2L19 17.42V4.99999L14 6.66999C13.8344 6.72491 13.6556 6.72491 13.49 6.66999L8.76 4.79999L4.41 6.46999V18.91L8.5 17.34C8.58301 17.308 8.67105 17.2911 8.76 17.29Z"
          fill="#000000"
        />
      </svg>
    ),
    route: (
      <svg
        className="route"
        style={{ width: "2rem" }}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M360-130.001q-62.154 0-106.076-43.923Q210.001-217.846 210.001-280v-333.924q-35-13-57.5-41.576-22.5-28.577-22.5-64.369 0-45.888 32.07-78.009t77.884-32.121q45.814 0 77.929 32.121t32.115 78.009q0 35.792-22.5 64.369-22.5 28.576-57.5 41.576V-280q0 37.125 26.46 63.563 26.46 26.438 63.616 26.438t63.541-26.438q26.385-26.438 26.385-63.563v-400q0-62.154 43.923-106.076Q537.846-829.999 600-829.999q62.154 0 106.076 43.923Q749.999-742.154 749.999-680v333.924q35 13 57.5 41.576 22.5 28.577 22.5 64.369 0 45.888-32.07 78.009t-77.884 32.121q-45.814 0-77.929-32.121t-32.115-78.009q0-35.792 22.5-64.869 22.5-29.076 57.5-41.076V-680q0-37.125-26.46-63.563-26.46-26.438-63.616-26.438t-63.541 26.438Q509.999-717.125 509.999-680v400q0 62.154-43.923 106.076Q422.154-130.001 360-130.001ZM240-669.999q20.846 0 35.424-14.577 14.577-14.578 14.577-35.424t-14.577-35.424Q260.846-770.001 240-770.001t-35.424 14.577Q189.999-740.846 189.999-720t14.577 35.424q14.578 14.577 35.424 14.577Zm480 480q20.846 0 35.424-14.577 14.577-14.578 14.577-35.424t-14.577-35.424Q740.846-290.001 720-290.001t-35.424 14.577Q669.999-260.846 669.999-240t14.577 35.424q14.578 14.577 35.424 14.577ZM240-720Zm480 480Z" />
      </svg>
    ),
    search: (
      <svg
        className="search"
        style={{ opacity: "50%" }}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M380.769-335.386q-102.461 0-173.537-71.076Q136.155-477.539 136.155-580q0-102.461 71.077-173.538 71.076-71.076 173.537-71.076 102.461 0 173.538 71.076Q625.384-682.461 625.384-580q0 42.846-14.385 81.846-14.385 39-38.385 67.846l230.155 230.154q8.307 8.308 8.499 20.885.193 12.576-8.499 21.268-8.693 8.692-21.077 8.692-12.384 0-21.076-8.692L530.461-388.155q-30 24.769-69 38.769t-80.692 14Zm0-59.998q77.308 0 130.962-53.654Q565.385-502.692 565.385-580q0-77.308-53.654-130.962-53.654-53.654-130.962-53.654-77.308 0-130.962 53.654Q196.154-657.308 196.154-580q0 77.308 53.653 130.962 53.654 53.654 130.962 53.654Z" />
      </svg>
    ),
    settings: (
      <svg
        className="settings"
        style={{ width: "2rem" }}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M435.693-100.001q-20.462 0-35.346-13.577-14.884-13.577-18.115-33.422l-9.769-74.847q-16.077-5.385-32.962-15.077-16.885-9.693-30.193-20.77L240-228.232q-18.846 8.307-37.884 1.615t-29.576-24.307l-45.077-78.154q-10.538-17.615-6.077-37.268 4.462-19.653 20.461-32.422l59.924-45.001q-1.385-8.923-1.962-17.923-.577-9-.577-17.923 0-8.539.577-17.347.577-8.808 1.962-19.269l-59.924-45.001q-15.999-12.769-20.269-32.614-4.269-19.846 6.27-37.461l44.692-77q10.538-17.23 29.576-24.115 19.038-6.884 37.884 1.423l68.923 29.078q14.462-11.462 30.885-20.962 16.424-9.501 32.27-15.27L382.232-813q3.231-19.845 18.115-33.422 14.884-13.577 35.346-13.577h88.614q20.462 0 35.346 13.577 14.884 13.577 18.115 33.422l9.769 75.232q18 6.538 32.578 15.269 14.577 8.731 29.423 20.578l70.847-29.078q18.846-8.307 37.884-1.423 19.038 6.885 29.576 24.115l44.692 77.385q10.538 17.615 6.077 37.268-4.462 19.653-20.461 32.422l-61.462 46.154q2.154 9.693 2.346 18.116.192 8.423.192 16.962 0 8.154-.384 16.577-.385 8.423-2.77 19.27l60.309 45.385q15.999 12.769 20.653 32.422 4.654 19.653-5.885 37.268l-45.307 77.769q-10.538 17.615-29.769 24.308-19.23 6.692-38.076-1.616l-68.462-29.462q-14.846 11.847-30.308 20.962-15.462 9.116-31.693 14.885L577.768-147q-3.231 19.845-18.115 33.422-14.884 13.577-35.346 13.577h-88.614ZM440-160h78.615L533-267.154q30.615-8 55.961-22.731 25.346-14.73 48.885-37.884L737.231-286l39.384-68-86.769-65.385q5-15.538 6.808-30.461 1.807-14.923 1.807-30.154 0-15.615-1.807-30.154-1.808-14.538-6.808-29.692L777.385-606 738-674l-100.539 42.385q-20.076-21.462-48.115-37.923-28.039-16.462-56.731-23.308L520-800h-79.385l-13.23 106.769q-30.616 7.231-56.539 22.154-25.923 14.923-49.461 38.462L222-674l-39.385 68L269-541.615q-5 14.23-7 29.615-2 15.385-2 32.385Q260-464 262-449q2 15 6.615 29.615l-86 65.385L222-286l99-42q22.769 23.385 48.692 38.308 25.923 14.923 57.308 22.923L440-160Zm40.461-200.001q49.923 0 84.961-35.038Q600.46-430.078 600.46-480t-35.038-84.961q-35.038-35.038-84.961-35.038-50.537 0-85.268 35.038-34.73 35.039-34.73 84.961t34.73 84.961q34.731 35.038 85.268 35.038ZM480-480Z" />
      </svg>
    ),
    train: (
      <svg
        className="train"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M180.001-347.693V-720q0-46.076 25-73.73 25-27.654 66.731-42.23 41.73-14.577 95.961-19.308 54.23-4.731 112.307-4.731 62.154 0 116.807 4.731 54.654 4.731 95.461 19.308 40.808 14.576 64.269 42.23 23.462 27.654 23.462 73.73v372.307q0 53.615-37.039 90.653-37.038 37.039-90.653 37.039l33.847 33.847q13.154 13.153 6.269 29.653-6.884 16.5-25.499 16.5-5.461 0-10.423-1.923-4.961-1.924-8.807-5.77l-72.308-72.307H384.614l-72.308 72.307q-3.846 3.846-8.807 5.77-4.962 1.923-10.423 1.923-18 0-25.192-16.5t5.962-29.653l33.847-33.847q-53.615 0-90.653-37.039-37.039-37.038-37.039-90.653ZM480-800q-111.77 0-163.078 14.039-51.307 14.038-65.846 36.731h460.309q-12.692-23.924-64.308-37.347Q595.462-800 480-800ZM240-539.999h210.001v-149.232H240v149.232ZM652.307-480H240h480-67.693Zm-142.308-59.999H720v-149.232H509.999v149.232ZM340-327.693q22.538 0 37.423-14.884 14.884-14.885 14.884-37.423 0-22.538-14.884-37.423-14.885-14.884-37.423-14.884-22.538 0-37.423 14.884-14.884 14.885-14.884 37.423 0 22.538 14.884 37.423 14.885 14.884 37.423 14.884Zm280 0q22.538 0 37.423-14.884 14.884-14.885 14.884-37.423 0-22.538-14.884-37.423-14.885-14.884-37.423-14.884-22.538 0-37.423 14.884-14.884 14.885-14.884 37.423 0 22.538 14.884 37.423 14.885 14.884 37.423 14.884ZM307.693-280h344.614Q681-280 700.5-299.5 720-319 720-347.693V-480H240v132.307Q240-319 259.5-299.5 279-280 307.693-280ZM480-749.23h231.385-460.309H480Z" />
      </svg>
    ),
    filter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        height="24"
        width="24"
        style={{ opacity: "50%" }}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    ),
  };
  return icons[iconName];
};

export default Icon;
