import { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    if (currentStep === stepsConfig.length) {
      setIsComplete(true);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="relative flex justify-between items-center m-[20px]">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`flex flex-col items-center relative ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number w-[40px] h-[40px] rounded-full bg-[#ccc] flex justify-center items-center mb-[5px] z-2">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-[1rem] font-semibold">{step.name}</div>
            </div>
          );
        })}

        <div
          className="absolute top-[25%] left-[0px] h-[6px] bg-[#ccc]"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="h-full bg-[#28a745] duration-[0.2s] ease-linear"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      <div className="flex justify-center">
        <button
          className="flex justify-center rounded bg-[#007bff]  px-8 py-1 text-white disabled:bg-gray-400"
          onClick={handleNext}
          disabled={isComplete}
        >
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};

export default CheckoutStepper;
