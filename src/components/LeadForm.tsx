"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormSchema } from "@/lib/validations/lead";
import { useState, useEffect } from "react";
import Image from "next/image";

const visaOptions = [
  { id: "O-1", label: "O-1" },
  { id: "EB-1A", label: "EB-1A" },
  { id: "EB-2-NIW", label: "EB-2 NIW" },
  { id: "dont-know", label: "I don't know" },
];

interface LeadFormProps {
  onSuccess: (success: boolean) => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      linkedinProfile: "",
      visasOfInterest: [],
      additionalInfo: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("resume", file || undefined);
  };

  const onSubmit = async (data: LeadFormSchema) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "visasOfInterest") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "resume" && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      });

      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      onSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    setIsSuccess(false);
    onSuccess(false);
  };

  if (!mounted) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl text-black font-semibold text-center mb-4">
          Thank You
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Go Back to Homepage
          </button>
          <div className="max-w-2xl mx-auto mt-8 text-center space-y-2">
            <a
              href="/admin/login"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Admin Login
            </a>
            <div className="text-xs text-gray-400">
              Username: admin | Password: your-secure-password
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="space-y-6">
          <div>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            id="country"
            placeholder="Country"
            {...register("country")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <input
            type="url"
            id="linkedinProfile"
            placeholder="LinkedIn Profile URL"
            {...register("linkedinProfile")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm"
          />
          {errors.linkedinProfile && (
            <p className="mt-1 text-sm text-red-600">
              {errors.linkedinProfile.message?.toString()}
            </p>
          )}
        </div>

        <div className="space-y-3 pb-4">
          <div className="flex flex-col items-center">
            <Image
              src="/dice.png"
              alt="Dice Icon"
              width={72}
              height={72}
              className="mb-6"
            />
            <p className="text-xl font-bold text-gray-900 mb-6">
              Visa categories of interest
            </p>
          </div>
          <div className="flex flex-col space-y-4 max-w-xs">
            {visaOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={option.id}
                  value={option.id}
                  {...register("visasOfInterest")}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label
                  htmlFor={option.id}
                  className="text-base text-gray-700 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.visasOfInterest && (
            <p className="mt-1 text-sm text-red-600">
              {errors.visasOfInterest.message?.toString()}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-col items-center">
            <Image
              src="/heart.png"
              alt="Heart Icon"
              width={72}
              height={72}
              className="mb-6"
            />
            <p className="text-xl font-bold text-gray-900 mb-6">
              How can we help you?
            </p>
          </div>
          <textarea
            id="additionalInfo"
            placeholder="What is your current status and when does it expire? What is your goal and timeline? Any other relevant details?"
            {...register("additionalInfo")}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors placeholder:text-gray-400 text-gray-900 text-sm resize-none"
          />
          {errors.additionalInfo && (
            <p className="mt-1 text-sm text-red-600">
              {errors.additionalInfo.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-gray-900 text-sm
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-black file:text-white
                hover:file:bg-gray-800
                file:cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload your Resume/CV (PDF, DOC, or DOCX)
            </p>
          </div>
          {errors.resume && (
            <p className="mt-1 text-sm text-red-600">
              {errors.resume.message?.toString()}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium mt-8"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <div className="max-w-2xl mx-auto mt-8 text-center space-y-2">
          <a
            href="/admin/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Admin Login
          </a>
          <div className="text-xs text-gray-400">
            Demo Credentials - Username: admin | Password: your-secure-password
          </div>
        </div>
      </div>
    </div>
  );
}
