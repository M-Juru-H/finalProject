import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Car, Phone, MapPin } from "lucide-react";

const CarGarageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    carType: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    isError: false,
    isLoading: false,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    if (!formData.carType.trim()) {
      newErrors.carType = "Car type is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitStatus({ message: "", isError: false, isLoading: true });
    try {
      const response = await fetch(
        "http://localhost:8080/appointments/create-appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({ message: "Appointment saved successfully!", isError: false, isLoading: false });
        setFormData({ customerName: "", carType: "", phoneNumber: "", address: "" });
      } else {
        setErrors(data.errors || {});
        setSubmitStatus({ message: "Error saving appointment", isError: true, isLoading: false });
      }
    } catch (error) {
      setSubmitStatus({ message: "Network error occurred", isError: true, isLoading: false });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Car Garage Appointment</h2>
            <p className="text-blue-100 mt-2">Schedule your vehicle service</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {submitStatus.message && (
              <div
                className={`p-4 rounded-lg text-center font-medium ${
                  submitStatus.isError 
                    ? "bg-red-100 text-red-700" 
                    : "bg-green-100 text-green-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {[
              { 
                name: "customerName", 
                icon: <User className="text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />,
                label: "Full Name" 
              },
              { 
                name: "carType", 
                icon: <Car className="text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />,
                label: "Car Model" 
              },
              { 
                name: "phoneNumber", 
                icon: <Phone className="text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />,
                label: "Contact Number" 
              },
              { 
                name: "address", 
                icon: <MapPin className="text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />,
                label: "Service Address" 
              }
            ].map(({ name, icon, label }) => (
              <div key={name} className="relative">
                <label 
                  htmlFor={name} 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {label}
                </label>
                <div className="relative">
                  {icon}
                  <input
                    type={name === "phoneNumber" ? "tel" : "text"}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors[name] 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                </div>
                {errors[name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitStatus.isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center space-x-2"
            >
              {submitStatus.isLoading ? (
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Book Appointment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarGarageForm;