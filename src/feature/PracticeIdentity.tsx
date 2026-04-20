import { useRef, useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import type { StepConfig } from "../type/general";
import arrLeft from "../assets/general/arrow-left.png";
import shieldTick from "../assets/onboarding/shield-tick.png";
import { Link } from "react-router";
import Icons from "../assets/Icons";
import { State } from 'country-state-city';
import Select from "../component/Select";

const COUNTRIES = [
  { name: "Australia", flag: Icons.australiaIcon },
  { name: "Brazil", flag: Icons.brazilIcon },
  { name: "Canada", flag: Icons.canadaIcon },
  { name: "France", flag: Icons.franceIcon },
  { name: "Germany", flag: Icons.germanyIcon },
  { name: "Ireland", flag: Icons.irelandIcon },
  { name: "Japan", flag: Icons.japanIcon },
  { name: "Netherlands", flag: Icons.netherlandsIcon },
  { name: "New Zealand", flag: Icons.newZealandIcon },
  // { name: "Saudi Arabia", flag: Icons.saudiIcon },
  // { name: "Singapore", flag: Icons.singaporeIcon },
  { name: "South Africa", flag: Icons.southafricaIcon },
  { name: "Switzerland", flag: Icons.switzerlandIcon },
  // { name: "United Arab Emirates", flag: Icons.uaeIcon },
  { name: "United States", flag: Icons.usaIcon },
  { name: "United Kingdom", flag: Icons.ukIcon },
  { name: "Other", flag: "" },
];

const COUNTRY_TO_ISO: Record<string, string> = {
  "Australia": "AU", "Brazil": "BR", "Canada": "CA", "France": "FR",
  "Germany": "DE", "Ireland": "IE", "Japan": "JP", "Netherlands": "NL",
  "New Zealand": "NZ","South Africa": "ZA", "Switzerland": "CH", 
  "United States": "US", "United Kingdom": "GB", "Other": "",
};

const PracticeIdentity = () => {
  const STEPS: StepConfig[] = [
    { id: 1, label: "Account setup" },
    { id: 2, label: "Verify email" },
    { id: 3, label: "Practice identity" },
    { id: 4, label: "Practice details" },
    { id: 5, label: "Compliance & terms" },
  ];

  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [country, setCountry] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [errors, setErrors] = useState({ 
    name: false, 
    regNumber: false, 
    country: false, 
    state: false 
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic states list
  const isoCode = COUNTRY_TO_ISO[country] || "";
  const statesList = isoCode
    ? State.getStatesOfCountry(isoCode).map((s) => s.name).sort()
    : [];

 const handleFileChange = (file: File | null) => {
  if (!file) return;

  setLogo(file);

  const reader = new FileReader();
  reader.onload = (e) => setLogoPreview(e.target?.result as string);
  reader.readAsDataURL(file);


  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleContinue = () => {
    const newErrors = {
      name: name.trim() === "",
      regNumber: regNumber.trim() === "",
      country: country === "",
      state: stateValue.trim() === "",
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      console.log("Form is valid, proceeding...");
      // TODO: Add your navigation logic here
    }
  };

  const isFormComplete = 
    name.trim() !== "" &&
    regNumber.trim() !== "" &&
    country !== "" &&
    stateValue.trim() !== "";

  return (
    <div>
      <Onboarding>
        <div className="w-full">
           <div className="sticky top-0 z-50">
          <Step steps={STEPS} currentStep={3} />
          <hr className="border-gray-200 w-full" />
          </div>
          

          <div className="mt-30 w-full max-w-180.5 mx-auto">
            <h1 className="font-semibold text-[28px] text-[#1F2937] mb-3" style={{ letterSpacing: 1 }}>
              Practice Identity
            </h1>
            <p className="text-[14px] font-normal text-[#1F2937] mb-10">
              We verify every healthcare practice before activating their AI.
            </p>

            {/* Practice name */}
            <div className="mb-6">
              <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                Registered practice / hospital name*
              </label>
              <input
                type="text"
                placeholder="Ex. New York General hospital"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: false }));
                }}
                className={`w-full h-16 px-8 border rounded-lg text-[14px] text-[#1F2937] placeholder-[#9498B8] focus-within:border-[#5B0AFF] caret-[#5B0AFF] outline-none transition
                  ${errors.name ? "border-[#CA2044] bg-[#FFF1F4]" : "border-[#94A3B8]"}`}
              />
              {errors.name ? (
                <p className="text-[13px] text-[#CA2044] mt-1">Practice name is required</p>
              ) : (
                <p className="text-[13px] text-[#606671] mt-2">Must match the name on your business registration certificate</p>
              )}
            </div>

            {/* Registration number */}
            <div className="mb-6">
              <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                Business registration number*
              </label>
              <input
                type="text"
                placeholder="Ex. RC-123456 or NPI 1234567890"
                value={regNumber}
                onChange={(e) => {
                  setRegNumber(e.target.value);
                  if (errors.regNumber) setErrors((p) => ({ ...p, regNumber: false }));
                }}
                className={`w-full h-16 px-8 border rounded-lg text-[14px] text-[#1F2937] placeholder-[#9498B8] outline-none transition focus-within:border-[#5B0AFF] caret-[#5B0AFF]
                  ${errors.regNumber ? "border-[#CA2044] bg-[#FFF1F4]" : "border-[#94A3B8]"}`}
              />
              {errors.regNumber ? (
                <p className="text-[13px] text-[#CA2044] mt-1">Registration number is required</p>
              ) : (
                <p className="text-[13px] text-[#606671] mt-2">Your government-issued healthcare or business registration number</p>
              )}
            </div>

                {/* Country & State - Fixed Alignment */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Country Select */}
                  <Select
                    label="Country"
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setStateValue(""); 
                      setErrors((p) => ({ ...p, country: false, state: false }));
                    }}
                    options={COUNTRIES.map(c => ({
                      label: c.name,
                      value: c.name,
                      flag: c.flag || undefined,
                    }))}
                    placeholder="Select country"
                    error={errors.country ? "Please select a country" : undefined}
                    required
                  />

                  {/* State / City Field - Use Select consistently */}
                  <Select
                    label="City / State "
                    value={stateValue}
                    onChange={(val) => {
                      setStateValue(val);
                      setErrors((p) => ({ ...p, state: false }));
                    }}
                    options={
                      country === "Other"
                        ? [] // or handle differently
                        : statesList.map(s => ({ label: s, value: s }))
                    }
                    placeholder={country ? "Select city / state" : "Select country first"}
                    error={errors.state ? 
                      (country === "Other" ? "Please enter a city / state" : "Please select a city / state") 
                      : undefined
                    }
                    required
                    
                    // optional: disable until country is selected
                  />

                  {/* Fallback input for "Other" - shown separately if needed */}
                  {country === "Other" && (
                    <div className="col-span-2"> {/* or keep in second column if preferred */}
                      <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                        City / State 
                      </label>
                      <input
                        type="text"
                        placeholder="Enter city / state"
                        value={stateValue}
                        onChange={(e) => {
                          setStateValue(e.target.value);
                          if (errors.state) setErrors((p) => ({ ...p, state: false }));
                        }}
                        className={`w-full h-16 px-5 border rounded-lg text-[14px] text-[#1F2937] placeholder-[#9498B8] outline-none transition
                          ${errors.state ? "border-[#CA2044] bg-[#FFF1F4]" : "border-[#94A3B8]"}`}
                      />
                      {errors.state && (
                        <p className="text-[13px] text-[#CA2044] mt-1">Please enter a city / state</p>
                      )}
                    </div>
                  )}
                </div>

            {/* Practice logo */}
            <div className="mb-8">
              <label className="block text-[14px] font-semibold text-[#1F2937]">
                Practice logo <span className="font-normal">(optional)</span>
              </label>
              <p className="text-[13px] text-[#606671] mt-1 mb-4">
                Appears on appointment confirmations and patient-facing emails.<br />
                PNG, JPG or SVG, max 5MB.
              </p>

              {logo ? (
                <div className="flex items-center gap-4 px-5 py-4">
                  <img src={logoPreview} alt="logo preview" className="w-30 h-30 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#1F2937]">{logo.name}</p>
                    <div className="mt-1">
                      <p className="text-[12px] text-[#6B7280]">File type: {logo.type.split("/")[1]}</p>
                      <p className="text-[12px] text-[#6B7280]">File size: {Math.round(logo.size / 1024)}kb</p>
                    </div>
                  </div>
             

                  <button
                      type="button"
                      onClick={() => {
                        setLogo(null);
                        setLogoPreview("");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""; 
                        }
                      }}
                      className="flex items-center gap-1 text-[#CA2044] text-[14px] font-medium cursor-pointer"
                    >

                          <img src={Icons.deleteIcon} alt="Delete" className="w-5 h-5" />
                          Delete
                   </button>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#94A3B8] text-center rounded-lg p-10 flex flex-col items-center justify-center gap-5 cursor-pointer hover:bg-[#F3EDFF] transition bg-[#F7F6FA]"
                >
                  <img src={Icons.uploadIcon} alt="Upload" className="w-18 h-18" />
                  <p className="text-[14px] text-[#212123] flex font-medium flex-col">
                    Drag and drop your file here{" "}
                    <span>or <span className="text-[#5B0AFF]">click to browse</span></span>
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Info box */}
            <div className="bg-[#F7F6FA] rounded-lg px-6 py-6 flex gap-4 mb-12">
              <img src={shieldTick} alt="Security" className="w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-[15px] font-medium text-[#1F2937] mb-1">Why we need your registration number</h4>
                <p className="text-[12px] text-[#6B7280] leading-relaxed">
                  Conversa deploys AI to handle patient calls. We verify all accounts to protect patient data and comply with healthcare regulations. Your information is stored securely and never shared.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-20">
              <Link to="/verify-email">
                <button className="flex items-center gap-2 h-16.5 px-8 bg-[#F7F6FA] rounded-lg text-[14px] font-semibold text-[#6B7280] cursor-pointer">
                  <img src={arrLeft} alt="" className="w-7 h-7" />
                  Go Back
                </button>
              </Link>
              <button
                onClick={handleContinue}
                className={`flex-1 h-16.5 font-semibold rounded-lg text-[14px] text-white cursor-pointer transition
                  ${isFormComplete ? "bg-[#5B0AFF]" : "bg-[#9B6AFF]"}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Onboarding>
    </div>
  );
};

export default PracticeIdentity;