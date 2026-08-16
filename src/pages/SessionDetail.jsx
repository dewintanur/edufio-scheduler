import { useEffect, useMemo, useState } from "react"
import { hasScheduleConflict } from "../utils/schedule"
function SessionDetail({
  registrationData,
  selectedDate,
  sessions,
  editingSessionIndex,
  onNext,
  onBack,
}) {
  const [startTime, setStartTime] = useState("")
  const [location, setLocation] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [material, setMaterial] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
  if (editingSessionIndex === null) {
    return
  }

  const session = sessions[editingSessionIndex]

  if (!session) {
    return
  }

  setStartTime(session.startTime || "")
  setLocation(session.location || "")
  setMeetingLink(session.meetingLink || "")
  setMaterial(session.material || "")
  setError("")
}, [editingSessionIndex, sessions])
  const sessionNumber =
  editingSessionIndex !== null
    ? editingSessionIndex + 1
    : sessions.length + 1
  const totalSessions = registrationData?.packageSize
  const endTime = useMemo(() => {
    if (!startTime || !registrationData?.sessionDuration) {
      return ""
    }

    const [hours, minutes] = startTime.split(":").map(Number)

    const start = new Date()
    start.setHours(hours, minutes, 0, 0)

    start.setMinutes(
      start.getMinutes() +
        Number(registrationData.sessionDuration)
    )

    return `${String(start.getHours()).padStart(2, "0")}:${String(
      start.getMinutes()
    ).padStart(2, "0")}`
  }, [startTime, registrationData])

  const handleSubmit = (event) => {
  event.preventDefault()

  if (!startTime) {
    setError("Jam mulai wajib dipilih.")
    return
  }

  if (
    registrationData.learningMode === "offline" &&
    !location.trim()
  ) {
    setError("Lokasi wajib diisi untuk sesi offline.")
    return
  }

  if (
    registrationData.learningMode === "online" &&
    !meetingLink.trim()
  ) {
    setError("Link Google Meet wajib diisi untuk sesi online.")
    return
  }

  if (!material.trim()) {
    setError("Materi wajib diisi.")
    return
  }

  const sessionData = {
    date: selectedDate,
    startTime,
    endTime,
    location,
    meetingLink,
    material,
  }

  // Cek bentrok dengan sesi yang sudah tersimpan
  const sessionsToCheck =
  editingSessionIndex !== null
    ? sessions.filter(
        (_, index) => index !== editingSessionIndex
      )
    : sessions

const conflict = hasScheduleConflict(
  sessionsToCheck,
  sessionData
)
  if (conflict) {
    setError(
      "Jadwal bentrok dengan sesi yang sudah terjadwal. Silakan pilih jam lain."
    )
    return
  }

  setError("")

  console.log("Session Data:", sessionData)

  onNext(sessionData)
}
  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(`${dateString}T00:00:00`)

    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#004153]">
        Detail sesi
      </h1>

      <p className="mt-2 text-sm leading-6 text-[#242829]/60">
        Tentukan waktu dan detail sesi les.
      </p>
      {editingSessionIndex !== null && (
        <div className="mt-3 rounded-xl bg-[#EAF8FA] px-4 py-3">
          <p className="text-sm font-medium text-[#026C7A]">
            Sedang mengatur Sesi {editingSessionIndex + 1}
          </p>
        </div>
      )}
      {/* Informasi pendaftaran */}
      <div className="mt-4 rounded-2xl bg-[#EAF8FA] p-4">
        <p className="mt-3 text-xs text-[#242829]/50">
          Tanggal
        </p>

        <p className="mt-1 text-sm font-medium">
          {formatDate(selectedDate)},  Sesi {sessionNumber} dari {totalSessions}
        </p>

        <p className="mt-3 text-xs text-[#242829]/50">
          Durasi
        </p>

        <p className="mt-1 text-sm font-medium">
          {registrationData?.sessionDuration} menit
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <span className="mt-0.5 text-red-600">
              ⚠
            </span>

            <p className="text-sm leading-5 text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Jam mulai */}
        <div>
          <label
            htmlFor="startTime"
            className="mb-2 block text-sm font-medium"
          >
            Jam mulai
          </label>

          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(event) => {
              setStartTime(event.target.value)
              setError("")
            }}
            className="w-full rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
          />
        </div>

        {/* Jam selesai */}
        <div>
          <label
            htmlFor="endTime"
            className="mb-2 block text-sm font-medium"
          >
            Jam selesai
          </label>

          <input
            id="endTime"
            type="time"
            value={endTime}
            readOnly
            className="w-full rounded-xl border border-[#E3E3E4] bg-[#F4F6F7] px-4 py-3 text-[#242829]/60 outline-none"
          />

          <p className="mt-2 text-xs text-[#242829]/50">
            Jam selesai dihitung otomatis berdasarkan durasi sesi.
          </p>
        </div>

        {/* Offline */}
        {registrationData.learningMode === "offline" && (
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Lokasi
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value)
                setError("")
              }}
              placeholder="Contoh: Rumah siswa"
              className="w-full rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
            />
          </div>
        )}

        {/* Online */}
        {registrationData.learningMode === "online" && (
          <div>
            <label
              htmlFor="meetingLink"
              className="mb-2 block text-sm font-medium"
            >
              Link Google Meet
            </label>

            <input
              id="meetingLink"
              type="url"
              value={meetingLink}
              onChange={(event) => {
                setMeetingLink(event.target.value)
                setError("")
              }}
              placeholder="https://meet.google.com/..."
              className="w-full rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
            />
          </div>
        )}

        {/* Materi */}
        <div>
          <label
            htmlFor="material"
            className="mb-2 block text-sm font-medium"
          >
            Materi
          </label>

          <textarea
            id="material"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            placeholder="Contoh: Aljabar dasar"
            rows={3}
            className="w-full resize-none rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
          />
        </div>

        
        {/* Tombol */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-[#E3E3E4] px-4 py-3 font-semibold"
          >
            Kembali
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#026C7A] px-4 py-3 font-semibold text-white hover:bg-[#004153]"
          >
            Simpan sesi
          </button>
        </div>
      </form>
    </div>
  )
}

export default SessionDetail