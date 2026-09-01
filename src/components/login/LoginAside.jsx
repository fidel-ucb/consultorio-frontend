const LoginAside = () => {
    return (
        <aside className="relative hidden flex-1 overflow-hidden md:block">
            <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/7176053/pexels-photo-7176053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Sesión de terapia"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-br from-[rgba(31,51,41,0.55)] to-[rgba(51,85,67,0.35)] p-12">
                <blockquote className="max-w-md font-display text-2xl leading-snug font-medium text-white">
                    &ldquo;El primer paso hacia el bienestar es permitirse pedir
                    ayuda.&rdquo;
                </blockquote>
            </div>
        </aside>
    )
}

export default LoginAside
