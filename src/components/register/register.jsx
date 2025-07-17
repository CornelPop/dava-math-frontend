
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthLayout } from "@/components/ui/auth-layout"
import { AlertCircle, CheckCircle} from "lucide-react"
import { Link } from "react-router-dom";
import { EmailInputField } from "../common/email-input-field"
import { SubmitButton } from "../common/submit-button"
import { Divider } from "../common/divider"
import { PasswordInputField } from "../common/password-input-field"
import { NameFields } from "./components/name-fields"
import { PasswordStrengthIndicator } from "./components/password-strength-indicator"
import { TermsCheckboxSection } from "./components/terms-checkbox-section"
import { LoginLinkButton } from "./components/login-link-button"
import { ConfirmPasswordField } from "./components/confirm-password-field"


export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const validateForm = () => {
        const newErrors = {}
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain uppercase, lowercase, and number"
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions"
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
            setRegistrationSuccess(true)
        }, 2000)
    }
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }
    const getPasswordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        return strength
    }
    const passwordStrength = getPasswordStrength(formData.password)
    if (registrationSuccess) {
        return (
            <AuthLayout title="Welcome!" subtitle="Account created successfully">
                <Card className="shadow-lg border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Account Created!</h3>
                        <p className="text-green-700 mb-4">
                            Welcome to Mathematical Calculator. You can now sign in to your account.
                        </p>
                        <Link href="/login">
                            <Button className="bg-green-600 hover:bg-green-700">Sign In Now</Button>
                        </Link>
                    </CardContent>
                </Card>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout title="Create Account" subtitle="Join us to access advanced mathematical tools">
            <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <CardTitle className="text-center">Create New Account</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <NameFields
                            firstName={formData.firstName}
                            lastName={formData.lastName}
                            errors={errors}
                            onChange={handleInputChange}
                        />
                        {/* Email Field */}
                        <EmailInputField
                            value={formData.email}
                            onChange={(val) => handleInputChange("email", val)}
                            error={errors.email}
                        />
                        {/* Password Field */}
                        <div className="space-y-2">
                            <PasswordInputField
                                value={formData.password}
                                onChange={(val) => handleInputChange("password", val)}
                                error={errors.password}
                                showPassword={showPassword}
                                toggleVisibility={() => setShowPassword(!showPassword)}
                            />

                            {/* Password Strength Indicator */}
                            {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}

                            {errors.password && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        {/* Confirm Password Field */}
                        <ConfirmPasswordField
                            value={formData.confirmPassword}
                            onChange={(val) => handleInputChange("confirmPassword", val)}
                            error={errors.confirmPassword}
                            show={showConfirmPassword}
                            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                        {/* Terms and Conditions */}
                        <TermsCheckboxSection
                            checked={formData.agreeToTerms}
                            onChange={(checked) => handleInputChange("agreeToTerms", checked)}
                            error={errors.agreeToTerms}
                        />
                        {/* Submit Button */}
                        <SubmitButton isLoading={isLoading} />
                    </form>
                    {/* Divider */}
                    <Divider />
                    {/* Login Link */}
                    <LoginLinkButton />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}