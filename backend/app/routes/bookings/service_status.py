import enum

class ServiceStatus(enum.Enum):
    pending = "Pending"
    confirmed = "Confirmed"
    en_route = "En Route"
    arrived = "Arrived"
    in_progress = "In Progress"
    completed = "Completed"
    cancelled = "Cancelled"
    rescheduled = "Rescheduled"
