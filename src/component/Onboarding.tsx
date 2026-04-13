interface OnboardingProps {
  children?: React.ReactNode;
}
import logo from "../assets/general/Logo (5).png";
import "./styles/style.scss";
const Onboarding = ({ children }: OnboardingProps) => {
  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-box-wrapper">
        <div className="onboarding-logo-box">
          <img src={logo} alt="Logo" />
        </div>
        <div className="onboarding-content-box">
          <div className="onboarding-content-top">
            <p className="top-content-header-text">
              Every Patient Call Answered,
            </p>
            <p className="top-content-header-text">
              Every Time,{" "}
              <span className="top-content-highlight">Automatically</span>
            </p>
            <p className="top-content-body-text">
              Conversa answers, books, and handles patient calls around the
              clock.
            </p>
          </div>
          <div className="onboarding-content-bottom"></div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default Onboarding;
