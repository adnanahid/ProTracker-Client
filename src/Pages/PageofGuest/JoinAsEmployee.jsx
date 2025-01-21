import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../CustomHooks/UseAxiosPublic";
import { Helmet } from "react-helmet-async";

const JoinAsEmployee = () => {
  const imageHostingKey = import.meta.env.VITE_ImgBB_Api;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const { setUser, signInWithGoogle, userRegistration, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const employeeInfo = {
          name: displayName,
          photo: photoURL,
          email: email,
          role: "n/a",
        };
        axiosPublic
          .post("/add-new-employee", employeeInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        // axiosPublic
        //   .put("/add-new-employee", employeeInfo)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        setUser(user);
        toast.success("Login Successfully!");
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const onSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.userPhoto[0]);

      // Upload the image to ImgBB
      const res = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const userPhoto = res.data.data.url;

      // Extract other form data
      const { fullName, email, password } = data;

      // Register the user
      const result = await userRegistration(email, password);
      const user = result.user;

      // Update user profile
      const updateEmployee = {
        displayName: fullName,
        photoURL: userPhoto,
      };
      await updateUserProfile(updateEmployee);

      // Save employee details in your database
      const employeeInfo = {
        name: fullName,
        photo: userPhoto,
        email: email,
        role: "n/a",
      };
      // await axiosPublic.put("/add-new-employee", employeeInfo);
      axiosPublic
        .post("/add-new-employee", employeeInfo)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Set user in context and provide feedback
      setUser(user);
      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Join as Employee - ProTracker</title>
      </Helmet>
      <section className="max-w-screen-xl mx-auto md:py-36">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              Join As Employee
            </h2>

            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="w-full max-w-[450px] mx-auto"
            >
              {/* Full Name */}
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Full Name must be at least 3 characters",
                    },
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.fullName ? "border-red-500" : "focus:ring-black"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* PhotoURL */}
              <div className="mb-4">
                <label
                  htmlFor="userPhoto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Photo
                </label>
                <input
                  type="file"
                  id="userPhoto"
                  {...register("userPhoto", {
                    required: "userPhoto is required",
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.photoURL ? "border-red-500" : "focus:ring-black"
                  }`}
                  placeholder="Enter your photo"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userPhoto.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-500" : "focus:ring-black"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500" : "focus:ring-black"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.dateOfBirth ? "border-red-500" : "focus:ring-black"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-black text-white focus:ring-black"
                >
                  Sign Up
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-between my-4">
                <span className="w-1/5 border-b lg:w-5/12"></span>
                <span className="text-xs uppercase">or</span>
                <span className="w-1/5 border-b lg:w-5/12"></span>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full px-4 py-2 rounded-md border gap-3"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinAsEmployee;
