import React from "react";

const steps = [
  "Giỏ hàng",
  "Đặt hàng",
  "Thanh toán",
  "Hoàn thành đơn"
];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="w-full p-4 bg-white rounded-xl border">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div className="flex-1 flex flex-col items-center" key={index}>
              {/* Line (left side) */}
              {index !== 0 && (
                <div className={`w-full h-1 ${isCompleted ? "bg-black" : "bg-gray-200"}`}></div>
              )}
              {/* Circle */}
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  isCompleted || isActive ? "bg-black border-black" : "bg-white border-gray-300"
                }`}
              ></div>
              {/* Line (right side) */}
              {index !== steps.length - 1 && (
                <div className={`w-full h-1 ${index < currentStep ? "bg-black" : "bg-gray-200"}`}></div>
              )}
              {/* Label */}
              <div className="text-center text-sm mt-2">{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
    