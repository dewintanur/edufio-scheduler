import { useState } from "react"

function Registration({ onNext }) {
  const [form, setForm] = useState({
    studentName: "",
    program: "",
    packageSize: "",
    sessionDuration: "",
    learningMode: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }

 const validateForm = () => {
  const newErrors = {}

  if (!form.studentName.trim()) {
    newErrors.studentName = "Nama siswa wajib diisi."
  }

  if (!form.program) {
    newErrors.program = "Program wajib dipilih."
  }

  if (!form.packageSize) {
    newErrors.packageSize = "Paket sesi wajib dipilih."
  }

  if (!form.sessionDuration) {
    newErrors.sessionDuration = "Durasi sesi wajib dipilih."
  }

  if (!form.learningMode) {
    newErrors.learningMode = "Mode belajar wajib dipilih."
  }

  return newErrors
}

const handleSubmit = (event) => {
  event.preventDefault()

  const validationErrors = validateForm()

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  setErrors({})

  onNext(form)
}

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#004153]">
        Pendaftaran
      </h1>

      <p className="mt-2 text-sm leading-6 text-[#242829]/60">
        Isi data siswa dan pilih paket les.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Nama siswa */}
        <div>
          <label
            htmlFor="studentName"
            className="mb-2 block text-sm font-medium text-[#242829]"
          >
            Nama siswa
          </label>

          <input
            id="studentName"
            name="studentName"
            type="text"
            value={form.studentName}
            onChange={handleChange}
            placeholder="Masukkan nama siswa"
            className="w-full rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
          />
          {errors.studentName && (
            <p className="mt-2 text-xs text-red-600">
                {errors.studentName}
            </p>
            )}
        </div>

        {/* Program */}
        <div>
          <label
            htmlFor="program"
            className="mb-2 block text-sm font-medium text-[#242829]"
          >
            Program
          </label>

          <select
            id="program"
            name="program"
            value={form.program}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#E3E3E4] bg-white px-4 py-3 outline-none focus:border-[#026C7A] focus:ring-2 focus:ring-[#99DFEC]"
            >
            <option value="">Pilih program</option>
            <option value="Les Privat SD">Les Privat SD</option>
            <option value="Les Privat SMP">Les Privat SMP</option>
            <option value="Les Privat SMA">Les Privat SMA</option>
            </select>

            {errors.program && (
            <p className="mt-2 text-xs text-red-600">
                {errors.program}
            </p>
            )}
        </div>

        {/* Paket */}
        <div>
          <p className="mb-2 text-sm font-medium text-[#242829]">
            Jumlah sesi dalam paket
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[4, 8, 12].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setForm((previousForm) => ({
                    ...previousForm,
                    packageSize: String(size),
                  }))
                }
                className={`
                  rounded-xl border px-3 py-3 text-sm font-semibold
                  transition
                  ${
                    form.packageSize === String(size)
                      ? "border-[#026C7A] bg-[#026C7A] text-white"
                      : "border-[#E3E3E4] bg-white text-[#242829]"
                  }
                `}
              >
                {size} sesi
              </button>
            ))}
            {errors.packageSize && (
            <p className="col-span-3 text-xs text-red-600">
                {errors.packageSize}
            </p>
            )}
          </div>
        </div>

        {/* Durasi */}
        <div>
          <p className="mb-2 text-sm font-medium text-[#242829]">
            Durasi per sesi
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[60, 90, 120].map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() =>
                  setForm((previousForm) => ({
                    ...previousForm,
                    sessionDuration: String(duration),
                  }))
                }
                className={`
                  rounded-xl border px-3 py-3 text-sm font-semibold
                  transition
                  ${
                    form.sessionDuration === String(duration)
                      ? "border-[#026C7A] bg-[#026C7A] text-white"
                      : "border-[#E3E3E4] bg-white text-[#242829]"
                  }
                `}
              >
                {duration} menit
              </button>
            ))}
            {errors.sessionDuration && (
            <p className="col-span-3 text-xs text-red-600">
                {errors.sessionDuration}
            </p>
            )}
          </div>
        </div>

        {/* Mode */}
        <div>
          <p className="mb-2 text-sm font-medium text-[#242829]">
            Mode belajar
          </p>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E3E3E4] bg-white p-4">
              <input
                type="radio"
                name="learningMode"
                value="offline"
                checked={form.learningMode === "offline"}
                onChange={handleChange}
                className="h-4 w-4 accent-[#026C7A]"
              />

              <span className="text-sm">
                Tutor datang ke lokasi
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E3E3E4] bg-white p-4">
              <input
                type="radio"
                name="learningMode"
                value="online"
                checked={form.learningMode === "online"}
                onChange={handleChange}
                className="h-4 w-4 accent-[#026C7A]"
              />

              <span className="text-sm">
                Online
              </span>
            </label>
            {errors.learningMode && (
            <p className="text-xs text-red-600">
                {errors.learningMode}
            </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#026C7A] px-4 py-3 font-semibold text-white transition hover:bg-[#004153]"
        >
          Lanjut
        </button>
      </form>
    </div>
  )
}

export default Registration