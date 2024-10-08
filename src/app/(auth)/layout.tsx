const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center min-h-screen py-10 mt-15 bg-gray-950">
            {children}
        </div>
    )
}

export default AuthLayout