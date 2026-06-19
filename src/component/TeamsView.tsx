import Icons from "../assets/Icons";


const TeamsView = () => (
  <div className="bg-[#F8F8F8] rounded-2xl min-h-screen   flex flex-col items-center justify-center text-center px-6 py-20">
  
    <div >
        {Icons.illustration}
      </div>

    <h2 className="text-[#212123] font-semibold text-[24px] mb-5">
      Assistant Team feature coming soon!
    </h2>
    <p className="text-[#585859] font-normal text-[16px] leading-relaxed max-w-200">
      Group multiple AI assistants to work together across departments. One number,
      smarter routing.
    </p>
  </div>
);

export default TeamsView;