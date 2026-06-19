import type { ReactNode } from "react";
import Icons from "../assets/Icons";

interface DesktopOnlyProps {
  children: ReactNode;
}

const DesktopOnly = ({ children }: DesktopOnlyProps) => {
  return (
    <>
      {/* Mobile & Tablet */}
      <div className="lg:hidden relative h-screen overflow-hidden">
        {/* Logo */}
        <div className="absolute top-10 left-10">
          {Icons.conversaLogo}
        </div>

        {/* Center Content */}
        <div className="h-full flex items-center justify-center px-6">
          <div className="text-center">
            <div className="flex justify-center mb-0">
              {Icons.warning}
            </div>

            <h1 className="text-3xl font-semibold mt-6 mb-3 text-[#212123]">
              Desktop Only
            </h1>

            <p className="text-[#585859] max-w-md  ">
              Sernio is currently available on desktop devices only.
              Please continue on a desktop or laptop to set up and manage your assistant.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {children}
      </div>
    </>
  );
};

export default DesktopOnly;