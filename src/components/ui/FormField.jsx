const inputClasses =
    'rounded-sm border-[1.5px] border-neutral bg-white px-3.5 py-2.5 text-[0.95rem] text-neutral transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/20'

const FormField = ({ label, as: Component = 'input', className = '', children, ...props }) => {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-neutral uppercase">
                {label}
            </span>
            <Component className={`${inputClasses} ${className}`} {...props}>
                {children}
            </Component>
        </label>
    )
}

export default FormField
