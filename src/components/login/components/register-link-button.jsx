import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import React from "react"

export const RegisterLinkButton = () => {
    return (
        <div className="mt-4 text-center">
            <Link to="/register">
                <Button variant="outline" className="w-full bg-transparent">
                    Create New Account
                </Button>
            </Link>
        </div>
    )
}