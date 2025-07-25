import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/schema/contactSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  resetContactState,
} from "@/features/contact/contactSlice";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Phone,
  User,
  MapPin,
  Globe,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const dispatch = useDispatch();
  const {
    isLoading: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useSelector((state) => state.contact);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    dispatch(submitContactForm(data));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Message sent successfully");
      reset();
      dispatch(resetContactState());
    } else if (isError && error) {
      toast.error(error);
      dispatch(resetContactState());
    }
}, [isSuccess, isError, error, dispatch, reset]);

  return (
    <div className="bg-white py-6 px-3 flex justify-center items-center">
      <div className="max-w-xl mx-auto w-full">
        <Card className="shadow-xl border-gray-300 bg-white">
          <CardHeader className="text-center space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Get In Touch
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Name Field */}
              <FormRow
                label="Full Name"
                icon={<User className="w-4 h-4 text-indigo-500" />}
                id="name"
                register={register}
                error={errors.name}
                placeholder="Enter your full name"
              />

              {/* Email and Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormRow
                  label="Email Address"
                  icon={<Mail className="w-4 h-4 text-indigo-500" />}
                  id="email"
                  type="email"
                  register={register}
                  error={errors.email}
                  placeholder="your@email.com"
                />
                <FormRow
                  label="Mobile Number"
                  icon={<Phone className="w-4 h-4 text-indigo-500" />}
                  id="mobile"
                  register={register}
                  error={errors.mobile}
                  placeholder="9876543210"
                />
              </div>

              {/* State and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormRow
                  label="State"
                  icon={<MapPin className="w-4 h-4 text-indigo-500" />}
                  id="state"
                  register={register}
                  error={errors.state}
                  placeholder="Enter your state"
                />
                <FormRow
                  label="Country"
                  icon={<Globe className="w-4 h-4 text-indigo-500" />}
                  id="country"
                  register={register}
                  error={errors.country}
                  placeholder="Enter your country"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm text-gray-800"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us how we can help you..."
                  className="h-[100px] overflow-y-scroll resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm"
                />
                <p className="text-sm text-red-500 min-h-[18px]">
                  {errors.message?.message}
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-200 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormRow({
  label,
  icon,
  id,
  register,
  error,
  placeholder,
  type = "text",
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="flex items-center gap-2 text-sm text-gray-800"
      >
        {icon}
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        placeholder={placeholder}
        className="h-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm"
      />
      <p className="text-sm text-red-500 min-h-[18px]">
        {error?.message || ""}
      </p>
    </div>
  );
}
