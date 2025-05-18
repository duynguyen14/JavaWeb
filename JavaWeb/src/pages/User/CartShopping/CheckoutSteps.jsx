import React from "react";

const steps = [
  { label: "Giỏ hàng" },
  { label: "Đặt hàng" },
  { label: "Thanh toán" },
  { label: "Hoàn thành đơn" },
];

const CheckoutSteps = ({ currentStep = 1 }) => {
  return (
    <div className="w-full rounded-xl p-4 mb-10">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -z-10 transform -translate-y-1/2" />

        {steps.map((step, index) => {
          const isActive = index + 1 <= currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1 text-center">
              {/* Dot */}
              <div
                className={`w-5 h-5 rounded-full border-4 ${
                  isActive ? "bg-black border-black" : "bg-white border-gray-300"
                }`}
              />
              {/* Label */}
              <span className={`mt-2 text-sm ${isActive ? "text-black font-medium" : "text-gray-500"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
