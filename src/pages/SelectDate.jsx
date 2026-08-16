import { useEffect, useMemo, useState } from "react"
import { isDateSelectable } from "../utils/date"

function SelectDate({
  onNext,
  onBack,
  editingSessionIndex,
  selectedDate: initialSelectedDate,
  sessions,
}) {
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [selectedDate, setSelectedDate] = useState(
    initialSelectedDate || ""
  )

  // =========================================
  // MODE EDIT
  // =========================================
  useEffect(() => {
    if (editingSessionIndex !== null) {
      const session = sessions?.[editingSessionIndex]

      if (session?.date) {
        setSelectedDate(session.date)

        const date = new Date(`${session.date}T00:00:00`)

        setCurrentMonth(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          )
        )
      }
    } else {
      setSelectedDate(initialSelectedDate || "")
    }
  }, [
    editingSessionIndex,
    sessions,
    initialSelectedDate,
  ])

  const monthName = currentMonth.toLocaleDateString(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    }
  )

  const daysInMonth = useMemo(() => {
    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate()
  }, [currentMonth])

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    )
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    )
  }

  const handleSelectDate = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )

    if (!isDateSelectable(date)) {
      return
    }

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    setSelectedDate(formattedDate)
  }

  const handleNext = () => {
    if (!selectedDate) {
      return
    }

    onNext(selectedDate)
  }

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#004153]">
        Pilih tanggal
      </h1>

      <p className="mt-2 text-sm leading-6 text-[#242829]/60">
        Pilih tanggal untuk sesi les.
      </p>

      {/* =========================================
          INFO MODE EDIT
      ========================================= */}
      {editingSessionIndex !== null && (
        <div className="mt-4 rounded-xl bg-[#EAF8FA] px-4 py-3">
          <p className="text-sm font-medium text-[#026C7A]">
            Sedang mengubah Sesi{" "}
            {editingSessionIndex + 1}
          </p>

          <p className="mt-1 text-xs text-[#242829]/60">
            Pilih tanggal baru untuk sesi ini.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[#E3E3E4] bg-white p-5">

        {/* Header kalender */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={previousMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3E3E4]"
          >
            ←
          </button>

          <h2 className="font-semibold capitalize text-[#004153]">
            {monthName}
          </h2>

          <button
            type="button"
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3E3E4]"
          >
            →
          </button>
        </div>

        {/* Nama hari */}
        <div className="mt-6 grid grid-cols-7 text-center">
          {[
            "Min",
            "Sen",
            "Sel",
            "Rab",
            "Kam",
            "Jum",
            "Sab",
          ].map((day) => (
            <div
              key={day}
              className="text-xs font-medium text-[#242829]/50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Tanggal */}
        <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
          {Array.from({
            length: firstDayOfMonth,
          }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {days.map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            )

            const selectable =
              isDateSelectable(date)

            const formattedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(day).padStart(
              2,
              "0"
            )}`

            const isSelected =
              selectedDate === formattedDate

            return (
              <button
                key={day}
                type="button"
                disabled={!selectable}
                onClick={() =>
                  handleSelectDate(day)
                }
                className={`
                  mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm
                  ${
                    isSelected
                      ? "bg-[#026C7A] font-semibold text-white"
                      : selectable
                        ? "text-[#242829] hover:bg-[#99DFEC]/40"
                        : "cursor-not-allowed text-[#242829]/20"
                  }
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Informasi */}
        <div className="mt-6 space-y-2 text-xs text-[#242829]/60">
          <p>
            <span className="font-semibold text-[#026C7A]">
              ●
            </span>{" "}
            Tanggal yang bisa dipilih mulai H+3
          </p>

          <p>
            Tanggal sebelum batas minimum tidak
            dapat dipilih.
          </p>
        </div>

        {/* Tombol */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-[#E3E3E4] px-4 py-3 font-semibold"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedDate}
            className={`
              flex-1 rounded-xl px-4 py-3 font-semibold text-white
              ${
                selectedDate
                  ? "bg-[#026C7A] hover:bg-[#004153]"
                  : "cursor-not-allowed bg-[#E3E3E4] text-[#242829]/40"
              }
            `}
          >
            {editingSessionIndex !== null
              ? "Lanjut edit"
              : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectDate