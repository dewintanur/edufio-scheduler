function Summary({
  registrationData,
  sessions,
  onBack,
  onAddSession,
  onConfirm,
  isConfirmed,
}) {
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

  const totalSessions = Number(registrationData?.packageSize || 0)
  const completedSessions = sessions.length
  const isComplete = completedSessions >= totalSessions
  const remainingSessions = totalSessions - completedSessions

  // =========================
  // KONDISI SETELAH KONFIRMASI
  // =========================
  if (isConfirmed) {
  return (
    <div>
      {/* Header sukses */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8FA] text-2xl font-bold text-[#026C7A]">
          ✓
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#004153]">
          Penjadwalan berhasil
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#242829]/60">
          Semua sesi les berhasil dijadwalkan.
        </p>
      </div>

      {/* Data pendaftaran */}
      <div className="mt-6 rounded-2xl border border-[#E3E3E4] bg-white p-5">
        <h2 className="font-semibold text-[#004153]">
          Data pendaftaran
        </h2>

        <div className="mt-5 space-y-4">
          {/* Siswa */}
          <div>
            <p className="text-xs text-[#242829]/50">
              Siswa
            </p>

            <p className="mt-1 text-sm font-semibold">
              {registrationData?.studentName}
            </p>
          </div>

          {/* Program */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#242829]/50">
              Program
              </p>
              <p className="mt-1 text-sm font-medium">
                {registrationData?.program}
              </p>
            </div>
            {/* Mode */}
            <div>
              <p className="text-xs text-[#242829]/50">
                Mode belajar
              </p>

              <p className="mt-1 text-sm font-medium">
                {registrationData?.learningMode === "online"
                  ? "Online"
                  : "Tutor datang ke lokasi"}
              </p>
            </div>
          </div>

          {/* Paket & durasi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#242829]/50">
                Paket
              </p>

              <p className="mt-1 text-sm font-medium">
                {registrationData?.packageSize} sesi
              </p>
            </div>

            <div>
              <p className="text-xs text-[#242829]/50">
                Durasi
              </p>

              <p className="mt-1 text-sm font-medium">
                {registrationData?.sessionDuration} menit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Jadwal */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#004153]">
            Jadwal sesi
          </h2>

          <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs font-semibold text-[#026C7A]">
            {sessions.length} / {registrationData?.packageSize} sesi
          </span>
        </div>

        <div className="mt-3 space-y-3">
          {sessions.map((session, index) => (
            <div
              key={`${session.date}-${session.startTime}-${index}`}
              className="rounded-2xl border border-[#E3E3E4] bg-white p-5"
            >
              {/* Header sesi */}
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#004153]">
                  Sesi {index + 1}
                </p>

                <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs font-medium text-[#026C7A]">
                  {registrationData?.sessionDuration} menit
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Tanggal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#242829]/50">
                    Tanggal
                  </p>

                    <p className="mt-1 text-sm font-medium">
                      {formatDate(session.date)}
                    </p>
                  </div>
                  {/* Waktu */}
                <div>
                  <p className="text-xs text-[#242829]/50">
                    Waktu
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {session.startTime} - {session.endTime}
                  </p>
                </div>
                </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Lokasi offline */}
                {registrationData?.learningMode === "offline" && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Lokasi
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {session.location}
                    </p>
                  </div>
                )}

                {/* Google Meet online */}
                {registrationData?.learningMode === "online" && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Google Meet
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-[#026C7A]">
                      {session.meetingLink}
                    </p>
                  </div>
                )}

                {/* Materi */}
                {session.material && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Materi
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {session.material}
                    </p>
                  </div>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 rounded-xl bg-[#EAF8FA] px-4 py-3 text-sm text-[#026C7A]">
        ✓ Semua sesi telah dikonfirmasi dan berhasil dijadwalkan.
      </div>
    </div>
  )
}

  // =========================
  // KONDISI SEBELUM KONFIRMASI
  // =========================
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#004153]">
        Ringkasan
      </h1>

      <p className="mt-2 text-sm leading-6 text-[#242829]/60">
        Periksa kembali data pendaftaran dan jadwal sesi.
      </p>

     {/* Data pendaftaran */}
      <div className="mt-4 rounded-2xl border border-[#E3E3E4] bg-gray-100 p-5">
        <div>
          <p className="font-semibold text-[#242829]">
            {registrationData?.studentName}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm">
              {registrationData?.program}
            </p>

            <p className="text-sm">
              {registrationData?.learningMode === "online"
                ? "Online"
                : "Tutor datang ke lokasi"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm">
             {registrationData?.packageSize} sesi
            </p>

            <p className="text-sm">
             {registrationData?.sessionDuration} menit
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          JADWAL SESI
      ========================= */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#004153]">
            Jadwal sesi
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isComplete
                ? "bg-[#EAF8FA] text-[#026C7A]"
                : "bg-[#FFF7E6] text-[#A16207]"
            }`}
          >
            {completedSessions} / {totalSessions} sesi
          </span>
        </div>

        {/* Status sesi */}
        <div
          className={`mt-3 rounded-xl px-4 py-3 text-sm ${
            isComplete
              ? "bg-[#EAF8FA] text-[#026C7A]"
              : "bg-[#FFF7E6] text-[#A16207]"
          }`}
        >
          {isComplete ? (
            <p>
              ✓ Semua sesi sudah dijadwalkan. Silakan periksa
              kembali sebelum melakukan konfirmasi.
            </p>
          ) : (
            <p>
              Masih perlu menambahkan{" "}
              <span className="font-semibold">
                {remainingSessions} sesi
              </span>{" "}
              lagi.
            </p>
          )}
        </div>

        {/* List sesi */}
        <div className="mt-3 space-y-3">
          {sessions.map((session, index) => (
            <div
              key={`${session.date}-${session.startTime}-${index}`}
              className="rounded-2xl border border-[#E3E3E4] bg-white p-5"
            >
              {/* Header sesi */}
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#004153]">
                  Sesi {index + 1}
                </p>

                <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs font-medium text-[#026C7A]">
                  {registrationData?.sessionDuration} menit
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* Tanggal */}
                <div>
                  <p className="text-xs text-[#242829]/50">
                    Tanggal
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(session.date)}
                  </p>
                </div>

                {/* Waktu */}
                <div>
                  <p className="text-xs text-[#242829]/50">
                    Waktu
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {session.startTime} - {session.endTime}
                  </p>
                </div>

                {/* Lokasi */}
                {registrationData?.learningMode === "offline" && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Lokasi
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {session.location}
                    </p>
                  </div>
                )}

                {/* Google Meet */}
                {registrationData?.learningMode === "online" && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Google Meet
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-[#026C7A]">
                      {session.meetingLink}
                    </p>
                  </div>
                )}

                {/* Materi */}
                {session.material && (
                  <div>
                    <p className="text-xs text-[#242829]/50">
                      Materi
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {session.material}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          TAMBAH SESI
      ========================= */}
      {!isComplete && (
        <button
          type="button"
          onClick={onAddSession}
          className="mt-5 w-full rounded-xl border border-[#026C7A] px-4 py-3 font-semibold text-[#026C7A] transition hover:bg-[#EAF8FA]"
        >
          + Tambah sesi
        </button>
      )}

      {/* =========================
          TOMBOL
      ========================= */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-[#E3E3E4] px-4 py-3 font-semibold text-[#242829] transition hover:bg-[#F4F6F7]"
        >
          Kembali
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={!isComplete}
          className={`flex-1 rounded-xl px-4 py-3 font-semibold transition ${
            isComplete
              ? "bg-[#026C7A] text-white hover:bg-[#004153]"
              : "cursor-not-allowed bg-[#E3E3E4] text-[#242829]/40"
          }`}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  )
}

export default Summary