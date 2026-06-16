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

)
};
export default Icons;
