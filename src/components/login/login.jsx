import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthLayout } from "@/components/ui/auth-layout"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom";
import { EmailInputField } from "../common/email-input-field"
import { PasswordInputField } from "../common/password-input-field"
import { ForgotPasswordLink } from "./components/forgot-password-link"
import { SubmitButton } from "../common/submit-button"
import { Divider } from "../common/divider"
import { RegisterLinkButton } from "./components/register-link-button"

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const validateForm = () => {
        const newErrors = {}
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setLoginSuccess(true)
            // In a real app, you would redirect to the dashboard here
        }, 1500)
    }
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }
    if (loginSuccess) {
        return (
            <AuthLayout title="Welcome Back!" subtitle="Login successful">
                <Card className="shadow-lg border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Login Successful!</h3>
                        <p className="text-green-700 mb-4">Redirecting to your dashboard...</p>
                        <Link href="/math-tool">
                            <Button className="bg-green-600 hover:bg-green-700">Go to Math Tool</Button>
                        </Link>
                    </CardContent>
                </Card>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to your account to continue">
            <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <CardTitle className="text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <EmailInputField
                            value={formData.email}
                            onChange={(val) => handleInputChange("email", val)}
                            error={errors.email}
                        />
                        {/* Password Field */}
                        <PasswordInputField
                            value={formData.password}
                            onChange={(val) => handleInputChange("password", val)}
                            error={errors.password}
                            showPassword={showPassword}
                            toggleVisibility={() => setShowPassword((prev) => !prev)}   ></PasswordInputField>
                        {/* Forgot Password Link */}
                        <ForgotPasswordLink />
                        {/* Submit Button */}
                        <SubmitButton isLoading={isLoading} />
                    </form>
                    {/* Divider */}
                    <Divider />
                    {/* Register Link */}
                    <RegisterLinkButton />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}