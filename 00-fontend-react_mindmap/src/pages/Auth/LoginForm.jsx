import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialButton from "./Social";
import { toast } from 'react-toastify';
import axios from "@/utils/axios.customize";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const togglePasswordView = () => setShowPassword(!showPassword);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitLogin = async () => {
        // validate
        const isvaliEmail = validateEmail(email);
        if (!isvaliEmail) {
            toast.error("Invalid email address");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }
        if (!email && !password) {
            toast.error("Invalid email and password");
            return;
        }
        try {
            const res = await axios.post(`/api/login`, { email, password });
            console.log(">>> check res", res);
            if (res.success) {
                toast.success(
                    "Login success! Welcome to MickeAI", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light"
                })
                navigate("/user/dashboard");
            }
        } catch {

        }


    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex items-center gap-2 bg-white p-2 rounded-xl">
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                />
            </div>

            <div className="w-full flex items-center gap-2 p-2 bg-white rounded-xl relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                />
                {showPassword ? (
                    <FaRegEyeSlash
                        className="absolute right-5 cursor-pointer"
                        onClick={togglePasswordView}
                    />
                ) : (
                    <FaRegEye
                        className="absolute right-5 cursor-pointer"
                        onClick={togglePasswordView}
                    />
                )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        // checked={rememberMe}
                        // onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4"
                    />
                    Ghi nhớ đăng nhập
                </label>
                <span
                    // onClick={() => navigate("/forgot-password")}
                    className="cursor-pointer text-indigo-500"
                >
                    Quên mật khẩu?
                </span>
            </div>

            <button
                type="submit"
                className="w-full p-3 bg-[#71da90] rounded-xl mt-2 hover:bg-[#0FC446] text-base md:text-sm text-white font-bold"
                onClick={handleSubmitLogin}
            >
                Đăng nhập
            </button>

            <h3
                onClick={() => navigate("/")}
                className="cursor-pointer text-sm md:text-base mt-2 text-center"
            >
                Về trang chủ
            </h3>

            <div className="flex items-center justify-evenly mt-4 gap-3">
                <SocialButton icon="G" text="Google" />
                <SocialButton icon="f" text="Facebook" className="[&>div:first-child]:bg-blue-600 [&>div:first-child]:text-white" />
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
                <span>Bạn chưa có tài khoản?</span>
                <span
                    className="ml-1 text-indigo-500 cursor-pointer"
                    onClick={() => navigate("/register")}
                >
                    Đăng ký ngay
                </span>
            </div>
        </div>
    );
};

export default LoginForm;
