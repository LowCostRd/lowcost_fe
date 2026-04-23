import type { Specialty } from "../type/assistant";


const AssistantModal = ({
    item,
    onClose,
    onContinue,
  }: {
    item: Specialty;
    onClose: () => void;
    onContinue: () => void;
  }) => {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "24px",
          animation: "fadeIn 0.15s ease",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "380px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            animation: "slideUp 0.2s ease",
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 22px 20px",
              borderBottom: "1px solid #f0f0f4",
            }}


          >
            <span className="text-[#1F2937] font-semibold text-[20px]" >
              {item.title}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#1F2937",
                lineHeight: 1,
                padding: "4px 6px",
                borderRadius: "6px",
                fontFamily: "inherit",
              }}
            >
              ✕
            </button>
          </div>
  
          {/* Modal Body */}
          <div >
            {/* Icon + badge */}
            <div className="relative px-10 pt-7" >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#F9FAFB",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  marginBottom: "14px",
                }}
              >
                <img src={item.icon} alt={item.title} className="w-14 h-14" />
              </div>
              {item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "280px",
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "2px 9px",
                    borderRadius: "999px",
                    background: "#F7F3FF",
                    color: "#5B0AFF",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
  
            <p className="px-10 text-[#1F2937] font-normal text-[14px]">
              {item.modalDescription}
            </p>
  
            {/* Divider + handles */}
            <div className="mt-5">
            <hr className="border-[#F2F2F2] w-full" />
          </div>

            <div className="py-10 px-10">
              <p className="text-[#1F2937] text-[16px] font-semibold">
                What your assistant will handle
              </p>
              <ul style={{ listStyle: "none", marginTop: "16px" }}>
                {item.handles.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: 400,
                      marginBottom: i < item.handles.length - 1 ? "10px" : 0,
                    }}
                  >
                    <span style={{ color: "#6B7280", fontWeight: 400, fontSize: "12px", flexShrink: 0 }}>✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="pb-8">
            <hr className="border-[#F2F2F2] w-full" />
          </div>
          {/* Footer */}
          <div className="flex justify-end px-10 pb-8">
            <button
              onClick={onContinue}

              className="w-50 bg-[#5B0AFF] text-white border-none rounded-[100px] p-4 font-semibold text-[14px] cursor-pointer"
           
            >
              Continue
            </button>
          </div>
        </div>
  
    
      </div>
    );
  };

  export default AssistantModal;