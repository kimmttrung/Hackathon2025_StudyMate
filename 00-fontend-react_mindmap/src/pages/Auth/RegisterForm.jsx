import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from "@/utils/axios.customize";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordView = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordView = () => setShowConfirmPassword(!showConfirmPassword);

    // validate
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        if (!email && !password && !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        // validate
        const isvaliEmail = validateEmail(email);
        if (!isvaliEmail) {
            toast.error('Invlid email address');
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post(`/api/register`, { email, password })
            console.log(res);
            if (res.success) {
                toast.success("Create new user success");
                navigate("/login")
            } else {
                toast.error(res.data.msg || "Register failed");
            }
        } catch (error) {
            // xử lý lỗi trả về từ backend
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
                console.log(">>> Error", err.response.data.msg);
            } else {
                toast.error("Register failed");
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Email Field */}
            <div className="w-full relative">
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            {/* Password Field */}
            <div className="w-full relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {showPassword ? (
                    <FaRegEyeSlash
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={togglePasswordView}
                    />
                ) : (
                    <FaRegEye
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={togglePasswordView}
                    />
                )}
            </div>

            {/* Confirm Password Field */}
            <div className="w-full relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister(e)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {showConfirmPassword ? (
                    <FaRegEyeSlash
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={toggleConfirmPasswordView}
                    />
                ) : (
                    <FaRegEye
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={toggleConfirmPasswordView}
                    />
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 bg-[#71da90] rounded-xl mt-2 hover:bg-[#0FC446] text-base font-bold text-white transition-all"
                onClick={handleRegister}
            >
                Create new account
            </button>

            <span
                className="cursor-pointer text-sm md:text-base mt-2 text-center text-indigo-500 hover:underline"
                onClick={() => navigate("/")}
            >
                Go to home page
            </span>
        </div>
    );
};

export default RegisterForm;
