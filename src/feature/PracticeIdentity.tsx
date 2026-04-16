import { useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import Input from "../component/input";
import Select from "../component/Select";
import Button from "../component/Botton";
import "./style/practiceIdentity.css";
import Icons from "../assets/Icons";
import FileUpload from "../component/FileInput";
const PracticeIdentity = () => {
  const steps = [
    { id: 1, label: "Account setup" },
    { id: 2, label: "Verify email" },
    { id: 3, label: "Practice identity" },
    { id: 4, label: "Practice details" },
    { id: 5, label: "Compliance & terms" },
  ];
  const [currentStep] = useState(1);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const countryOptions = [
    { label: "Nigeria", value: "nigeria" },
    { label: "Canada", value: "canada" },
    { label: "Brazil", value: "brazil" },
    { label: "Germany", value: "germany" },
    { label: "India", value: "india" },
    { label: "Japan", value: "japan" },
    { label: "Australia", value: "australia" },
    { label: "South Africa", value: "south_africa" },
    { label: "United States", value: "united_states" },
    { label: "France", value: "france" },
  ];

  const stateOptions = [
    { label: "Lagos", value: "lagos" },
    { label: "Kano", value: "kano" },
    { label: "Rivers", value: "rivers" },
    { label: "Oyo", value: "oyo" },
    { label: "Kaduna", value: "kaduna" },
    { label: "Enugu", value: "enugu" },
    { label: "Delta", value: "delta" },
    { label: "Anambra", value: "anambra" },
    { label: "Plateau", value: "plateau" },
    { label: "Kwara", value: "kwara" },
  ];

  return (
    <Onboarding>
      <div className="prctice-identity-general-wrap-box">
        <Step steps={steps} currentStep={currentStep} />
        <div className="practice-identity-bottom-box">
          <div className="practice-identity-header-box">
            <p className="practice-identity-header">Practice Identity</p>
            <p className="practice-identity-subtext">
              We verify every healthcare practice before activating their AI.
            </p>
          </div>
          <div className="practice-identity-input-box">
            <Input
              label="Registered practice / hospital name"
              placeholder="Ex. Lagos University Teaching Hospital"
              required
              hint="Must match the name on your business registration certificate"
            />
            <Input
              label="Business registration number"
              placeholder="Ex. RC-123456 or NPI 1234567890"
              hint="Your government-issued healthcare or business registration number"
              required
            />
            <div className="practice-identity-select-box">
              <Select
                label="Country"
                placeholder="Select country"
                required
                onChange={(value) => setCountry(value)}
                options={countryOptions}
                value={country}
              />
              <Select
                label="City / State*"
                placeholder="Select city "
                required
                onChange={(value) => setState(value)}
                options={stateOptions}
                value={state}
              />
            </div>
          </div>
          <div>
            <FileUpload label="Upload your business registration certificate"  />
          </div>
          <div className="practice-identity-conversa">
            <div className="practice-img-box">
              <figure className="img-box">{Icons.conversa}</figure>
            </div>
            <div className="practice-identity-conversa-img-and-text-box">
              <p className="conversa-header-text">
                Why we need your registration number
              </p>
              <p className="conversa-text">
                Conversa deploys AI to handle patient calls. We verify all
                accounts to protect patient data and comply with healthcare
                regulations. Your information is stored securely and never
                shared.
              </p>
            </div>
          </div>
          <div className="button-box-wrap">
            <div className="left-button-box">
              {" "}
              <Button label="Go Back" variant="grey" icon={Icons.backArrow} />
            </div>
            <div className="right-button-box">
              <Button label="Continue" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </Onboarding>
  );
};
export default PracticeIdentity;
