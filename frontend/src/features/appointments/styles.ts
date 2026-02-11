export const appointmentStyles = {
    container: "space-y-4 p-4",
    card: "bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-colors",
    statusBadge: {
        base: "text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider",
        pending: "bg-yellow-500/10 text-yellow-500",
        confirmed: "bg-blue-500/10 text-blue-500",
        completed: "bg-green-500/10 text-green-500",
        cancelled: "bg-red-500/10 text-red-500",
        inprogress: "bg-purple-500/10 text-purple-500"
    }
};
