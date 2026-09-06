const variantClasses = {
    active: 'bg-primary/15 text-primary',
    pending: 'bg-warning/15 text-warning',
    inactive: 'bg-neutral/10 text-neutral/70',
    info: 'bg-accent/15 text-accent',
}

const Badge = ({ variant = 'active', children }) => (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant]}`}>
        {children}
    </span>
)

export default Badge
