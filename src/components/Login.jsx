import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    const strength = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    
    if (pwd.length < 6 || strength < 2) {
      return { text: "Weak", color: "text-red-500", bg: "bg-red-500" };
    }
    if (pwd.length < 10 || strength < 3) {
      return { text: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
    }
    return { text: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(state === "login" ? "Login successful!" : "Account created successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/forgot-password", { email });
      if (data.success) {
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
          {/* Close Button */}
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dull p-6 text-center rounded-t-2xl">
            <h2 className="text-2xl font-bold text-white">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-white/90 mt-1 text-sm">
              {state === "login" ? "Login to continue" : "Join bookNow today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="p-6 space-y-4">
            {/* Name Field (Register only) */}
            {state === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  type="text"
                  required
                />
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                type="email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {state === "register" && password && passwordStrength && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Password strength:</span>
                    <span className={`font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          passwordStrength.text === "Weak"
                            ? "33%"
                            : passwordStrength.text === "Fair"
                            ? "66%"
                            : "100%",
                      }}
                      className={`h-full ${passwordStrength.bg} transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Forgot Password (Login only) */}
            {/* {state === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-sm text-primary hover:underline disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>
            )} */}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dull text-white rounded-lg font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>{state === "register" ? "Create Account" : "Login"}</span>
              )}
            </motion.button>

            {/* Toggle State */}
            <div className="text-center pt-4 border-t border-gray-200">
              {state === "register" ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setState("login")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setState("register")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;