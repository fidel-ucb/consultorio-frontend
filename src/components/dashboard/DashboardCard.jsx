const DashboardCard = ({ label, value, detail }) => (
    <article className="rounded-md border border-neutral/20 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-neutral/60 uppercase">{label}</p>
        <p className="mt-1 font-display text-3xl font-semibold text-neutral">{value}</p>
        {detail && <p className="mt-1 text-sm text-neutral/70">{detail}</p>}
    </article>
)

export default DashboardCard
