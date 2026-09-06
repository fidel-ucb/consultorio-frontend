const sizeClasses = {
    sm: 'size-7 text-[0.7rem]',
    md: 'size-9 text-xs',
    lg: 'size-12 text-base',
}

const Avatar = ({ initials, size = 'md', className = '' }) => (
    <div
        className={`grid shrink-0 place-items-center rounded-full bg-primary font-semibold text-white ${sizeClasses[size]} ${className}`}
    >
        {initials}
    </div>
)

export default Avatar
