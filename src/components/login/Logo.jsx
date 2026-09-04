const Logo = ({ variant = 'light' }) => {
    const textClass = variant === 'dark' ? 'text-white' : 'text-neutral'

    return (
        <div className={`flex items-center gap-2 ${variant === 'light' ? 'mb-2' : ''}`}>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-display text-xl font-semibold text-white">
                N
            </div>
            <span className={`font-display text-2xl font-semibold tracking-tight ${textClass}`}>
                Norte
            </span>
        </div>
    )
}

export default Logo
