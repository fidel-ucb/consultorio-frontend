const variantClasses = {
    primary:
        'border-transparent bg-primary text-white hover:ring-3 hover:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60',
    ghost: 'border-primary bg-transparent text-primary hover:bg-primary hover:text-white',
    link: 'border-transparent bg-transparent text-primary hover:underline',
}

const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-[0.92rem]',
}

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-sm border-[1.5px] font-semibold transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
