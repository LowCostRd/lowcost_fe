import usaIcon from "../assets/onboarding/flag/usa.svg";
import australiaIcon from "../assets/onboarding/flag/australia.svg";
import brazilIcon from "../assets/onboarding/flag/brazil.svg";
import canadaIcon from "../assets/onboarding/flag/canada.svg";
import franceIcon from "../assets/onboarding/flag/france.svg";
import germanyIcon from "../assets/onboarding/flag/germany.svg";
import irelandIcon from "../assets/onboarding/flag/ireland.svg";
import japanIcon from "../assets/onboarding/flag/japan.svg";
import netherlandsIcon from "../assets/onboarding/flag/netherland.svg";
import newZealandIcon from "../assets/onboarding/flag/newzeeland.svg";
import saudiIcon from "../assets/onboarding/flag/saudi.svg";
import singaporeIcon from "../assets/onboarding/flag/singapor.svg";
import southafricaIcon from "../assets/onboarding/flag/southafrica.svg";
import switzerlandIcon from "../assets/onboarding/flag/switzerland.svg";
import uaeIcon from "../assets/onboarding/flag/uae.svg";
import ukIcon from "../assets/onboarding/flag/uk.svg";
import deleteIcon from "../assets/general//trash (1).svg";
import downloadIcon from "../assets/general/Upload.svg";


const Icons = {
  google: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_5684_39446)">
        <path
          fill="#4285F4"
          d="M23.768 12.276c0-.816-.066-1.636-.207-2.438H12.242v4.62h6.482a5.55 5.55 0 0 1-2.399 3.647v2.999h3.867c2.271-2.09 3.576-5.177 3.576-8.828"
        ></path>
        <path
          fill="#34A853"
          d="M12.24 24.001c3.236 0 5.965-1.062 7.954-2.897l-3.867-2.998c-1.076.732-2.465 1.146-4.084 1.146-3.13 0-5.785-2.112-6.737-4.951h-3.99v3.09a12 12 0 0 0 10.723 6.61"
        ></path>
        <path
          fill="#FBBC04"
          d="M5.505 14.3a7.2 7.2 0 0 1 0-4.594v-3.09H1.519a12.01 12.01 0 0 0 0 10.776z"
        ></path>
        <path
          fill="#EA4335"
          d="M12.24 4.75a6.52 6.52 0 0 1 4.603 1.799l3.425-3.426A11.53 11.53 0 0 0 12.24 0 12 12 0 0 0 1.516 6.615l3.986 3.09C6.45 6.863 9.108 4.75 12.239 4.75"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5684_39446">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  ),
  microsoft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="#FFBA08" d="M12.602 12.584h11.4v11.414h-11.4z"></path>
      <path fill="#05A6F0" d="M0 12.584h11.4v11.414H0z"></path>
      <path fill="#81BC06" d="M12.602 0h11.4v11.414h-11.4z"></path>
      <path fill="#F35325" d="M0 0h11.4v11.414H0z"></path>
    </svg>
  ),
  closeEye: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#9498B8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m12.107 7.893-4.216 4.216a2.98 2.98 0 1 1 4.217-4.217"
      ></path>
      <path
        stroke="#9498B8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.848 4.807c-1.458-1.1-3.125-1.7-4.85-1.7-2.942 0-5.683 1.734-7.592 4.734-.75 1.175-.75 3.15 0 4.325a12 12 0 0 0 2.259 2.641M7.016 16.274c.95.4 1.958.617 2.983.617 2.942 0 5.683-1.734 7.592-4.734.75-1.175.75-3.15 0-4.325a14 14 0 0 0-.884-1.225"
      ></path>
      <path
        stroke="#9498B8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.928 10.584a2.97 2.97 0 0 1-2.35 2.35M7.89 12.107l-6.226 6.225M18.334 1.666 12.11 7.891"
      ></path>
    </svg>
  ),
  openEye: (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="#9498B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 3.333c-2.942 0-5.683 1.734-7.592 4.734-.75 1.175-.75 3.15 0 4.325C4.317 15.392 7.058 17.126 10 17.126c2.942 0 5.683-1.734 7.592-4.734.75-1.175.75-3.15 0-4.325C15.683 5.067 12.942 3.333 10 3.333z"
    ></path>
    <path
      stroke="#9498B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 13.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666z"
    ></path>
  </svg>
),
SpinningIcon : (
  <span className="flex items-center justify-center">
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    </span>
),
usaIcon : usaIcon,
australiaIcon  : australiaIcon,
canadaIcon : canadaIcon,
brazilIcon : brazilIcon,
franceIcon : franceIcon,
germanyIcon : germanyIcon,
irelandIcon : irelandIcon,
japanIcon : japanIcon,
netherlandsIcon : netherlandsIcon,
newZealandIcon : newZealandIcon,
saudiIcon : saudiIcon,
singaporeIcon : singaporeIcon,
southafricaIcon : southafricaIcon,
switzerlandIcon : switzerlandIcon,
uaeIcon : uaeIcon,
ukIcon : ukIcon,
deleteIcon : deleteIcon,
uploadIcon : downloadIcon,
search: (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 16.5L15 15" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

),
filter: (
<svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 4.875H12" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 4.875H1.5" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 7.5C8.94975 7.5 10.125 6.32475 10.125 4.875C10.125 3.42525 8.94975 2.25 7.5 2.25C6.05025 2.25 4.875 3.42525 4.875 4.875C4.875 6.32475 6.05025 7.5 7.5 7.5Z" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 13.125H13.5" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 13.125H1.5" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 15.75C11.9497 15.75 13.125 14.5747 13.125 13.125C13.125 11.6753 11.9497 10.5 10.5 10.5C9.05025 10.5 7.875 11.6753 7.875 13.125C7.875 14.5747 9.05025 15.75 10.5 15.75Z" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

),
chevron: (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9181 15.0508L13.3981 8.53078C12.6281 7.76078 11.3681 7.76078 10.5981 8.53078L4.07812 15.0508" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
person: (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#5B0AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.40625 22C3.40625 18.13 7.25625 15 11.9962 15C12.9562 15 13.8863 15.13 14.7563 15.37" stroke="#5B0AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z" stroke="#5B0AFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.4878 17.9805H16.5078" stroke="#5B0AFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 16.5195V19.5095" stroke="#5B0AFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
),
team: (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.9981 14.6288C11.9381 14.6188 11.8681 14.6188 11.8081 14.6288C10.4281 14.5788 9.32812 13.4488 9.32812 12.0488C9.32812 10.6188 10.4781 9.46875 11.9081 9.46875C13.3381 9.46875 14.4881 10.6288 14.4881 12.0488C14.4781 13.4488 13.3781 14.5888 11.9981 14.6288Z" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.08875 17.7794C7.67875 18.7194 7.67875 20.2594 9.08875 21.1994C10.6888 22.2694 13.3087 22.2694 14.9087 21.1994C16.3187 20.2594 16.3187 18.7194 14.9087 17.7794C13.3187 16.7194 10.6888 16.7194 9.08875 17.7794Z" stroke="#212123" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
),
dots: (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="19" cy="12" r="1.7" />
  </svg>
),
illustration: (
  <svg width="251" height="240" viewBox="0 0 251 240" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="32.5" y1="2.18557e-08" x2="32.5" y2="240" stroke="#DFDFE1"/>
<line x1="56.5" y1="2.18557e-08" x2="56.5" y2="240" stroke="#DFDFE1"/>
<line x1="80.5" y1="2.18557e-08" x2="80.5" y2="240" stroke="#DFDFE1"/>
<line x1="104.5" y1="2.18557e-08" x2="104.5" y2="240" stroke="#DFDFE1"/>
<line x1="128.5" y1="2.18557e-08" x2="128.5" y2="240" stroke="#DFDFE1"/>
<line x1="152.5" y1="2.18557e-08" x2="152.5" y2="240" stroke="#DFDFE1"/>
<line x1="176.5" y1="2.18557e-08" x2="176.5" y2="240" stroke="#DFDFE1"/>
<line x1="200.5" y1="2.18557e-08" x2="200.5" y2="240" stroke="#DFDFE1"/>
<line x1="224.5" y1="2.18557e-08" x2="224.5" y2="240" stroke="#DFDFE1"/>
<line x1="248.5" y1="2.18557e-08" x2="248.5" y2="240" stroke="#DFDFE1"/>
<line x1="248" y1="48.5" x2="8" y2="48.5" stroke="#DFDFE1"/>
<line x1="248" y1="72.5" x2="8" y2="72.5" stroke="#DFDFE1"/>
<line x1="248" y1="96.5" x2="8" y2="96.5" stroke="#DFDFE1"/>
<line x1="248" y1="120.5" x2="8" y2="120.5" stroke="#DFDFE1"/>
<line x1="248" y1="144.5" x2="8" y2="144.5" stroke="#DFDFE1"/>
<line x1="248" y1="168.5" x2="8" y2="168.5" stroke="#DFDFE1"/>
<line x1="248" y1="192.5" x2="8" y2="192.5" stroke="#DFDFE1"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint0_linear_4265_29724)"/>
<rect width="251" height="240" fill="url(#paint1_linear_4265_29724)"/>
<rect x="251" width="240" height="251" transform="rotate(90 251 0)" fill="url(#paint2_linear_4265_29724)"/>
<rect width="240" height="251" transform="matrix(0 -1 -1 0 251 240)" fill="url(#paint3_linear_4265_29724)"/>
<rect width="251" height="240" fill="url(#paint4_linear_4265_29724)"/>
<rect width="251" height="240" transform="matrix(1 0 0 -1 0 240)" fill="url(#paint5_linear_4265_29724)"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint6_linear_4265_29724)"/>
<rect x="251" y="240" width="251" height="240" transform="rotate(180 251 240)" fill="url(#paint7_linear_4265_29724)"/>
<rect x="123.839" y="81.3321" width="78.9616" height="81.5" rx="17.25" transform="rotate(29 123.839 81.3321)" fill="#F7F7F7" stroke="#D6D6DC" stroke-width="1.5"/>
<rect x="83.75" y="103.75" width="81.5" height="81.5" rx="17.25" fill="#F7F7F7" stroke="#D6D6DC" stroke-width="1.5"/>
<path d="M133.253 137.443C133.166 137.428 133.064 137.428 132.976 137.443C130.964 137.37 129.359 135.722 129.359 133.68C129.359 131.595 131.036 129.918 133.122 129.918C135.207 129.918 136.884 131.61 136.884 133.68C136.87 135.722 135.266 137.37 133.253 137.443Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M131.755 148.06C133.753 148.395 135.955 148.045 137.501 147.01C139.557 145.639 139.557 143.393 137.501 142.022C135.94 140.987 133.709 140.637 131.711 140.987" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M115.709 137.443C115.797 137.428 115.899 137.428 115.986 137.443C117.999 137.37 119.603 135.722 119.603 133.68C119.603 131.595 117.926 129.918 115.841 129.918C113.755 129.918 112.078 131.61 112.078 133.68C112.093 135.722 113.697 137.37 115.709 137.443Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M117.21 148.06C115.212 148.395 113.01 148.045 111.464 147.01C109.408 145.639 109.408 143.393 111.464 142.022C113.024 140.987 115.256 140.637 117.254 140.987" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M124.495 148.334C124.408 148.319 124.306 148.319 124.218 148.334C122.206 148.261 120.602 146.613 120.602 144.571C120.602 142.486 122.279 140.809 124.364 140.809C126.449 140.809 128.127 142.5 128.127 144.571C128.112 146.613 126.508 148.275 124.495 148.334Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M120.253 152.929C118.197 154.3 118.197 156.546 120.253 157.916C122.586 159.477 126.407 159.477 128.741 157.916C130.797 156.546 130.797 154.3 128.741 152.929C126.422 151.383 122.586 151.383 120.253 152.929Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_4265_29724" x1="14.5" y1="120" x2="82.5" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_4265_29724" x1="29" y1="120" x2="92" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_4265_29724" x1="290.681" y1="126.023" x2="338.969" y2="125.586" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_4265_29724" x1="47.5" y1="126" x2="87.9689" y2="125.572" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_4265_29724" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_4265_29724" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint6_linear_4265_29724" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint7_linear_4265_29724" x1="303" y1="281.5" x2="335" y2="312.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F8F8F8" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
),
greenDots: (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_3503_10895)">
<circle cx="9" cy="8.99609" r="6" fill="#29996A"/>
</g>
<circle cx="9" cy="8.99609" r="6" fill="#29996A"/>
<g opacity="0.5" filter="url(#filter1_f_3503_10895)">
<circle cx="9" cy="9" r="5" fill="#80FFC0"/>
</g>
<g opacity="0.3" filter="url(#filter2_f_3503_10895)">
<circle cx="9" cy="9" r="3.5" fill="#C7FFE3"/>
</g>
<g opacity="0.3" filter="url(#filter3_f_3503_10895)">
<circle cx="9" cy="9" r="2" fill="#F5FFF9"/>
</g>
<defs>
<filter id="filter0_f_3503_10895" x="2.5" y="2.49609" width="13" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_3503_10895"/>
</filter>
<filter id="filter1_f_3503_10895" x="0" y="0" width="18" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_3503_10895"/>
</filter>
<filter id="filter2_f_3503_10895" x="0.5" y="0.5" width="17" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_3503_10895"/>
</filter>
<filter id="filter3_f_3503_10895" x="4" y="4" width="10" height="10" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_3503_10895"/>
</filter>
</defs>
</svg>

),
warning : (
  <svg width="251" height="240" viewBox="0 0 251 240" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="32.5" y1="2.18557e-08" x2="32.5" y2="240" stroke="#DFDFE1"/>
<line x1="56.5" y1="2.18557e-08" x2="56.5" y2="240" stroke="#DFDFE1"/>
<line x1="80.5" y1="2.18557e-08" x2="80.5" y2="240" stroke="#DFDFE1"/>
<line x1="104.5" y1="2.18557e-08" x2="104.5" y2="240" stroke="#DFDFE1"/>
<line x1="128.5" y1="2.18557e-08" x2="128.5" y2="240" stroke="#DFDFE1"/>
<line x1="152.5" y1="2.18557e-08" x2="152.5" y2="240" stroke="#DFDFE1"/>
<line x1="176.5" y1="2.18557e-08" x2="176.5" y2="240" stroke="#DFDFE1"/>
<line x1="200.5" y1="2.18557e-08" x2="200.5" y2="240" stroke="#DFDFE1"/>
<line x1="224.5" y1="2.18557e-08" x2="224.5" y2="240" stroke="#DFDFE1"/>
<line x1="248.5" y1="2.18557e-08" x2="248.5" y2="240" stroke="#DFDFE1"/>
<line x1="248" y1="48.5" x2="8" y2="48.5" stroke="#DFDFE1"/>
<line x1="248" y1="72.5" x2="8" y2="72.5" stroke="#DFDFE1"/>
<line x1="248" y1="96.5" x2="8" y2="96.5" stroke="#DFDFE1"/>
<line x1="248" y1="120.5" x2="8" y2="120.5" stroke="#DFDFE1"/>
<line x1="248" y1="144.5" x2="8" y2="144.5" stroke="#DFDFE1"/>
<line x1="248" y1="168.5" x2="8" y2="168.5" stroke="#DFDFE1"/>
<line x1="248" y1="192.5" x2="8" y2="192.5" stroke="#DFDFE1"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint0_linear_7371_50394)"/>
<rect width="251" height="240" fill="url(#paint1_linear_7371_50394)"/>
<rect x="251" width="240" height="251" transform="rotate(90 251 0)" fill="url(#paint2_linear_7371_50394)"/>
<rect width="240" height="251" transform="matrix(0 -1 -1 0 251 240)" fill="url(#paint3_linear_7371_50394)"/>
<rect width="251" height="240" fill="url(#paint4_linear_7371_50394)"/>
<rect width="251" height="240" transform="matrix(1 0 0 -1 0 240)" fill="url(#paint5_linear_7371_50394)"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint6_linear_7371_50394)"/>
<rect x="251" y="240" width="251" height="240" transform="rotate(180 251 240)" fill="url(#paint7_linear_7371_50394)"/>
<rect x="123.835" y="81.3321" width="78.9616" height="81.5" rx="17.25" transform="rotate(29 123.835 81.3321)" fill="white" stroke="#D6D6DC" stroke-width="1.5"/>
<rect x="83.75" y="103.75" width="81.5" height="81.5" rx="17.25" fill="white" stroke="#D6D6DC" stroke-width="1.5"/>
<path d="M124.5 140.125V147.417" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M124.5 158.223H115.663C110.603 158.223 108.488 154.607 110.938 150.188L115.488 141.992L119.775 134.292C122.371 129.611 126.63 129.611 129.225 134.292L133.513 142.007L138.063 150.203C140.513 154.621 138.384 158.238 133.338 158.238H124.5V158.223Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M124.492 151.793H124.505" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_7371_50394" x1="14.5" y1="120" x2="82.5" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_7371_50394" x1="29" y1="120" x2="92" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_7371_50394" x1="290.681" y1="126.023" x2="338.969" y2="125.586" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_7371_50394" x1="47.5" y1="126" x2="87.9689" y2="125.572" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint6_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint7_linear_7371_50394" x1="303" y1="281.5" x2="335" y2="312.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>

),
conversaLogo: (
 <svg width="153" height="31" viewBox="0 0 153 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50.8123 18.1395L53.6467 18.9566C53.3403 19.9525 52.8551 20.8973 52.1656 21.7655C50.5314 23.7828 48.0544 24.7532 45.5009 24.7532C42.8452 24.7532 40.3938 23.7062 38.8616 21.7655C37.3295 19.8759 36.7422 17.5777 36.7422 15.1774C36.7677 12.7004 37.355 10.4022 38.8616 8.56368C40.4448 6.57191 42.8962 5.60156 45.5009 5.60156C48.131 5.60156 50.5824 6.59745 52.1656 8.56368C52.9828 9.5851 53.4935 10.7597 53.8254 11.8833L50.8633 12.394C50.659 11.6279 50.3526 10.9129 49.893 10.3256C48.8716 8.99779 47.2117 8.30833 45.5009 8.30833C43.79 8.30833 42.1302 8.99779 41.1598 10.3256C40.1129 11.6279 39.8064 13.441 39.8064 15.1774C39.8064 16.9138 40.1129 18.7013 41.1598 20.0291C42.1302 21.357 43.79 22.0464 45.5009 22.0209C47.2117 22.0464 48.8716 21.357 49.893 20.0291C50.3015 19.4673 50.608 18.829 50.8123 18.1395Z" fill="#5B0AFF"/>
<path d="M62.6879 24.7532C60.6705 24.7532 58.7554 23.9871 57.5041 22.4805C56.3295 21.025 55.8699 19.3141 55.8699 17.4756C55.8699 15.5859 56.4061 13.824 57.5041 12.4706C58.7299 10.9896 60.6705 10.198 62.6879 10.198C64.6796 10.198 66.6203 10.9385 67.846 12.4706C69.0462 13.9261 69.5058 15.637 69.5058 17.4756C69.5058 19.3907 69.0207 20.9995 67.846 22.4805C66.5948 24.0127 64.7307 24.7532 62.6879 24.7532ZM65.5734 20.7186C66.2373 19.8504 66.4671 18.6502 66.4671 17.4756C66.4671 16.3009 66.2373 15.0752 65.5734 14.207C64.9094 13.3388 63.837 12.9047 62.6879 12.9047C61.5132 12.9047 60.4407 13.3388 59.8023 14.207C59.1384 15.0752 58.9086 16.3009 58.9086 17.4756C58.9086 18.6502 59.1384 19.8504 59.8023 20.7186C60.4407 21.5868 61.5132 22.0464 62.6879 22.0464C63.837 22.0464 64.9094 21.5868 65.5734 20.7186Z" fill="#5B0AFF"/>
<path d="M82.837 11.5769C84.5734 13.0835 84.8543 15.0752 84.8287 17.5266V24.3702H81.9177V17.5266C81.9177 15.969 81.7134 14.5901 80.7431 13.7474C80.1813 13.2367 79.3641 12.9813 78.3938 13.0069C77.6533 13.0324 77.0149 13.2622 76.4786 13.6708C75.9168 14.1304 75.5338 14.8454 75.3806 15.6626C75.2274 16.3775 75.2018 17.3734 75.2018 18.3438V24.3702H72.3163V10.581H74.8699V11.7556L74.9465 11.679C76.019 10.7342 77.449 10.2746 78.7513 10.2235C80.1813 10.1469 81.7389 10.6576 82.837 11.5769Z" fill="#5B0AFF"/>
<path d="M96.5048 10.581H99.3904L94.3599 24.3702H91.4743L86.4694 10.581H89.3549L92.9299 20.7952L96.5048 10.581Z" fill="#5B0AFF"/>
<path d="M103.679 18.2672C103.781 19.1609 104.011 20.0547 104.521 20.7186C105.185 21.5868 106.258 22.0464 107.407 22.0464C108.556 22.0464 109.603 21.5868 110.267 20.7186C110.42 20.5143 110.497 20.3355 110.599 20.1568L113.459 21.3825C113.229 21.7911 112.974 22.1741 112.667 22.5316C111.365 24.0382 109.399 24.8298 107.407 24.7532C105.39 24.6766 103.474 23.9871 102.223 22.4805C101.049 21.025 100.563 19.2631 100.589 17.4756C100.64 15.6115 101.074 13.8751 102.223 12.4706C103.474 10.964 105.39 10.198 107.407 10.198C109.424 10.198 111.314 10.9385 112.565 12.4706C113.714 13.8751 114.199 15.6626 114.199 17.4756C114.199 17.7309 114.174 18.0118 114.148 18.2672H103.679ZM107.407 12.9047C106.258 12.8792 105.185 13.3388 104.521 14.2326C104.138 14.7177 103.909 15.3306 103.781 15.969H111.007C110.88 15.3306 110.65 14.7177 110.267 14.2326C109.603 13.3388 108.556 12.8792 107.407 12.9047Z" fill="#5B0AFF"/>
<path d="M123.625 10.2235C124.34 10.1724 125.055 10.3001 125.77 10.5555V13.2367C125.106 12.9813 124.264 12.8536 123.37 12.9047C122.323 12.9558 121.506 13.3133 120.969 13.8751C120.101 14.7433 119.897 15.9179 119.897 17.3224V24.3702H117.011V10.581H119.565V12.5472C119.897 11.9854 120.331 11.5003 120.918 11.0917C121.71 10.5044 122.68 10.249 123.625 10.2235Z" fill="#5B0AFF"/>
<path d="M138.592 14.207L135.783 14.8965C135.579 14.2581 135.043 13.6197 134.43 13.3133C133.945 13.0579 133.357 12.9047 132.719 12.9047C132.055 12.9047 131.442 13.0324 130.983 13.2622C130.497 13.5431 130.293 13.9006 130.293 14.2326C130.293 14.4879 130.37 14.6922 130.497 14.8454C130.778 15.1518 131.289 15.3817 132.081 15.6115C132.77 15.8158 133.613 16.02 134.455 16.2499C135.553 16.5818 136.294 16.7861 137.162 17.5011C138.235 18.3693 138.796 19.4673 138.694 20.7952C138.592 22.0464 137.877 23.1445 136.805 23.8339C135.707 24.5489 134.353 24.7532 132.974 24.7532C131.11 24.7532 129.476 24.2425 128.25 22.9402C127.561 22.1486 126.897 20.7186 126.795 19.9014L129.553 19.2375C129.578 19.7993 129.859 20.6164 130.319 21.0761C131.008 21.8421 131.978 22.0209 132.949 22.0209C133.715 22.0209 134.736 21.8677 135.221 21.4846C135.579 21.2038 135.707 20.9229 135.783 20.5398C135.783 20.1823 135.681 19.8759 135.4 19.595C135.017 19.2375 134.43 19.0332 133.715 18.829C133 18.6247 132.259 18.4459 131.417 18.2161C130.268 17.9097 129.45 17.6033 128.71 16.9904C127.791 16.3009 127.357 15.2284 127.357 14.2836C127.357 12.6749 128.403 11.3471 129.782 10.7342C130.829 10.2746 131.825 10.1724 132.77 10.198C133.715 10.198 134.762 10.4022 135.681 10.8874C137.034 11.5513 138.107 12.8026 138.592 14.207Z" fill="#5B0AFF"/>
<path d="M143.731 14.3858L141.101 13.1345C141.203 13.0069 141.305 12.8026 141.433 12.6494C142.659 10.964 144.523 10.2235 146.693 10.2235C149.221 10.2235 151.29 11.0917 152.362 13.0835C152.822 13.9517 153.001 14.8965 153.001 15.7136V24.3702H150.473V21.8421C150.115 22.7104 149.221 23.502 148.455 23.9105C147.434 24.4978 146.234 24.7532 145.11 24.7277C143.731 24.7021 142.327 24.0127 141.586 23.0423C140.948 22.123 140.616 21.408 140.616 20.31C140.616 18.8545 141.458 17.4756 142.761 16.7095C144.267 15.8924 145.544 15.8158 147.587 15.5093L150.064 15.1518C149.936 14.4879 149.553 13.9006 148.991 13.5176C148.353 13.0579 147.51 12.8792 146.642 12.9047C145.595 12.9047 144.65 13.2111 144.038 13.9772C143.935 14.1049 143.808 14.2581 143.731 14.3858ZM150.141 17.5011C149.63 17.5777 148.762 17.7309 147.255 18.0118C145.442 18.3182 143.527 18.6502 143.476 20.1313C143.45 21.1527 144.344 22.072 145.621 22.0975C147.23 22.123 149.221 21.2804 149.809 19.5439C150.141 18.7523 150.141 18.0629 150.141 17.5011Z" fill="#5B0AFF"/>
<path d="M4.53198 25.0589C4.17353 25.3769 4.139 25.9272 4.47662 26.2671C5.80647 27.6064 7.37289 28.6917 9.09913 29.4667C11.0895 30.3604 13.2471 30.8211 15.4289 30.8185C17.6107 30.8159 19.7671 30.35 21.7554 29.4515C23.7437 28.5531 25.5185 27.2427 26.9624 25.607L25.6616 24.4587C24.3802 25.9102 22.8053 27.0731 21.0409 27.8703C19.2765 28.6676 17.363 29.0811 15.4268 29.0834C13.4907 29.0857 11.5761 28.6768 9.80982 27.8838C8.30776 27.2094 6.94206 26.2703 5.77692 25.1136C5.43688 24.776 4.89043 24.741 4.53198 25.0589Z" fill="#5B0AFF"/>
<path d="M26.9128 25.6099L22.717 21.4141L21.2701 22.5715L25.6106 26.9121C26.4209 26.2176 26.8163 25.7546 26.9128 25.6099Z" fill="#5B0AFF"/>
<path d="M22.9325 9.13057C21.5911 7.49128 19.9045 6.32487 17.8517 5.80236C15.799 5.27986 13.6329 5.42876 11.671 6.22722C9.70908 7.02568 8.05458 8.43169 6.9501 10.2391C5.84562 12.0465 5.34925 14.1603 5.53379 16.2704L7.36329 16.1104C7.21296 14.3913 7.61734 12.6692 8.51716 11.1967C9.41699 9.72422 10.7649 8.57874 12.3633 7.92823C13.9616 7.27773 15.7264 7.15642 17.3987 7.5821C19.0711 8.00779 20.563 8.95806 21.6559 10.2936L22.9325 9.13057Z" fill="#5B0AFF"/>
<path d="M8.4526 21.1082C8.06041 21.4297 8.00028 22.0118 8.3567 22.3725C9.61697 23.6481 11.2044 24.5623 12.9528 25.0091C14.9988 25.5321 17.1583 25.3878 19.1166 24.5974C21.0748 23.807 22.7294 22.4117 23.8391 20.615C24.9488 18.8183 25.4556 16.7142 25.2857 14.6093L23.4551 14.7571C23.5936 16.4719 23.1807 18.1862 22.2766 19.65C21.3725 21.1137 20.0245 22.2504 18.4292 22.8944C16.8338 23.5383 15.0744 23.6559 13.4075 23.2299C12.0384 22.8799 10.7905 22.1783 9.78397 21.2016C9.42003 20.8484 8.84478 20.7867 8.4526 21.1082Z" fill="#5B0AFF"/>
<path d="M25.3178 14.6112V15.8081C25.3178 16.106 25.0764 16.3474 24.7785 16.3474H20.2539C19.7744 16.3474 19.3858 15.9587 19.3858 15.4793C19.3858 14.9999 19.7744 14.6112 20.2539 14.6112H25.3178Z" fill="#5B0AFF"/>
<path d="M5.4961 16.3474V15.1505C5.4961 14.8526 5.73755 14.6112 6.03538 14.6112H10.56C11.0395 14.6112 11.4282 14.9999 11.4282 15.4793C11.4282 15.9587 11.0395 16.3474 10.56 16.3474H5.4961Z" fill="#5B0AFF"/>
<path d="M27.0197 5.27859C24.905 2.85485 22.0848 1.15365 18.9545 0.413497C15.8243 -0.32666 12.5409 -0.0686643 9.56462 1.15131C6.58837 2.37129 4.06853 4.49209 2.35835 7.21636C0.802264 9.69519 -0.0124885 12.5606 0.00014471 15.4755C0.00222132 15.9546 0.416029 16.3189 0.894293 16.2899C1.37256 16.2609 1.73384 15.8494 1.73519 15.3702C1.74237 12.8173 2.46445 10.3109 3.82792 8.13889C5.34552 5.72139 7.58162 3.83941 10.2227 2.75681C12.8638 1.67421 15.7775 1.44526 18.5553 2.10207C21.3331 2.75888 23.8356 4.26852 25.7122 6.41933L27.0197 5.27859Z" fill="#5B0AFF"/>
<path d="M27.0559 5.28097L21.7026 10.3449C21.4615 10.0314 20.8056 9.28872 20.1111 8.82573L21.7026 7.81295L25.6091 3.90648C25.7538 4.00293 26.2457 4.41287 27.0559 5.28097Z" fill="#5B0AFF"/>
<rect x="16.9258" y="13.6016" width="1.73621" height="3.6171" rx="0.868104" fill="#5B0AFF"/>
<rect x="14.6133" y="11.8633" width="1.73621" height="7.08952" rx="0.868104" fill="#5B0AFF"/>
<rect x="12.1523" y="13.6016" width="1.73621" height="3.6171" rx="0.868104" fill="#5B0AFF"/>
</svg>
 
),
desktopIcon : (
  <svg width="251" height="240" viewBox="0 0 251 240" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="32.5" y1="2.18557e-08" x2="32.5" y2="240" stroke="#DFDFE1"/>
<line x1="56.5" y1="2.18557e-08" x2="56.5" y2="240" stroke="#DFDFE1"/>
<line x1="80.5" y1="2.18557e-08" x2="80.5" y2="240" stroke="#DFDFE1"/>
<line x1="104.5" y1="2.18557e-08" x2="104.5" y2="240" stroke="#DFDFE1"/>
<line x1="128.5" y1="2.18557e-08" x2="128.5" y2="240" stroke="#DFDFE1"/>
<line x1="152.5" y1="2.18557e-08" x2="152.5" y2="240" stroke="#DFDFE1"/>
<line x1="176.5" y1="2.18557e-08" x2="176.5" y2="240" stroke="#DFDFE1"/>
<line x1="200.5" y1="2.18557e-08" x2="200.5" y2="240" stroke="#DFDFE1"/>
<line x1="224.5" y1="2.18557e-08" x2="224.5" y2="240" stroke="#DFDFE1"/>
<line x1="248.5" y1="2.18557e-08" x2="248.5" y2="240" stroke="#DFDFE1"/>
<line x1="248" y1="48.5" x2="8" y2="48.5" stroke="#DFDFE1"/>
<line x1="248" y1="72.5" x2="8" y2="72.5" stroke="#DFDFE1"/>
<line x1="248" y1="96.5" x2="8" y2="96.5" stroke="#DFDFE1"/>
<line x1="248" y1="120.5" x2="8" y2="120.5" stroke="#DFDFE1"/>
<line x1="248" y1="144.5" x2="8" y2="144.5" stroke="#DFDFE1"/>
<line x1="248" y1="168.5" x2="8" y2="168.5" stroke="#DFDFE1"/>
<line x1="248" y1="192.5" x2="8" y2="192.5" stroke="#DFDFE1"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint0_linear_7371_50394)"/>
<rect width="251" height="240" fill="url(#paint1_linear_7371_50394)"/>
<rect x="251" width="240" height="251" transform="rotate(90 251 0)" fill="url(#paint2_linear_7371_50394)"/>
<rect width="240" height="251" transform="matrix(0 -1 -1 0 251 240)" fill="url(#paint3_linear_7371_50394)"/>
<rect width="251" height="240" fill="url(#paint4_linear_7371_50394)"/>
<rect width="251" height="240" transform="matrix(1 0 0 -1 0 240)" fill="url(#paint5_linear_7371_50394)"/>
<rect width="251" height="240" transform="matrix(-1 0 0 1 251 0)" fill="url(#paint6_linear_7371_50394)"/>
<rect x="251" y="240" width="251" height="240" transform="rotate(180 251 240)" fill="url(#paint7_linear_7371_50394)"/>
<rect x="123.835" y="81.3321" width="78.9616" height="81.5" rx="17.25" transform="rotate(29 123.835 81.3321)" fill="white" stroke="#D6D6DC" stroke-width="1.5"/>
<rect x="83.75" y="103.75" width="81.5" height="81.5" rx="17.25" fill="white" stroke="#D6D6DC" stroke-width="1.5"/>
<path d="M116.393 129.918H132.595C137.787 129.918 139.085 131.216 139.085 136.393V145.624C139.085 150.816 137.787 152.099 132.61 152.099H116.393C111.216 152.114 109.918 150.816 109.918 145.639V136.393C109.918 131.216 111.216 129.918 116.393 129.918Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M124.5 152.113V159.084" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M109.918 145.957H139.085" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M117.938 159.082H131.063" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_7371_50394" x1="14.5" y1="120" x2="82.5" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_7371_50394" x1="29" y1="120" x2="92" y2="120" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_7371_50394" x1="290.681" y1="126.023" x2="338.969" y2="125.586" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_7371_50394" x1="47.5" y1="126" x2="87.9689" y2="125.572" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint6_linear_7371_50394" x1="52" y1="41.5" x2="84" y2="72.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint7_linear_7371_50394" x1="303" y1="281.5" x2="335" y2="312.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
),
searchCancel : (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.70703 2.70703L10.2899 10.2899" stroke="#6B7280" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.71015 10.2899L10.293 2.70703" stroke="#6B7280" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)
};
export default Icons;
