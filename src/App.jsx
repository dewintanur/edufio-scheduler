import { useState } from "react"
import StepIndicator from "./components/StepIndicator"

import Registration from "./pages/Registration"
import SelectDate from "./pages/SelectDate"
import SessionDetail from "./pages/SessionDetail"
import Summary from "./pages/Summary"
import { hasScheduleConflict } from "./utils/schedule"
function App() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const [registrationData, setRegistrationData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [sessions, setSessions] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [editingSessionIndex, setEditingSessionIndex] = useState(null)

 console.log("Sessions:", sessions)
 const handleConfirm = () => {
  setIsConfirmed(true)
}
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Registration
            onNext={(data) => {
              setRegistrationData(data)
              setCurrentStep(2)
            }}
          />
        )

      case 2:
        return (
          <SelectDate
            editingSessionIndex={editingSessionIndex}
            selectedDate={selectedDate}
            sessions={sessions}
            onBack={() => {
              if (editingSessionIndex !== null) {
                setCurrentStep(4)
                return
              }

              setCurrentStep(1)
            }}
            onNext={(date) => {
              setSelectedDate(date)
              setCurrentStep(3)
            }}
          />
        )

      case 3:
        return (
          <SessionDetail
            registrationData={registrationData}
            selectedDate={selectedDate}
            sessions={sessions}
            editingSessionIndex={editingSessionIndex}
            onBack={() => {
              setCurrentStep(2)
            }}
            onNext={(sessionData) => {
              setSessions((previousSessions) => {
                // MODE EDIT
                if (editingSessionIndex !== null) {
                  return previousSessions.map((session, index) =>
                    index === editingSessionIndex
                      ? sessionData
                      : session
                  )
                }

                // MODE TAMBAH SESI
                return [
                  ...previousSessions,
                  sessionData,
                ]
              })

              setEditingSessionIndex(null)
              setCurrentStep(4)
            }}
          />
        )

      case 4:
        return (
          <Summary
            registrationData={registrationData}
            sessions={sessions}
            onBack={() => {
              const lastSessionIndex = sessions.length - 1

              if (lastSessionIndex < 0) {
                return
              }

              setEditingSessionIndex(lastSessionIndex)
              setSelectedDate(
                sessions[lastSessionIndex].date
              )
              setCurrentStep(3)
            }}
            onAddSession={() => {
              setEditingSessionIndex(null)
              setSelectedDate(null)
              setCurrentStep(2)
            }}
            onConfirm={handleConfirm}
            isConfirmed={isConfirmed}
          />
        )
      default:
        return null
    }
  }
  

  return (
    <main className="min-h-screen bg-[#F9FAFD]">
      <div className="mx-auto min-h-screen w-full max-w-md px-5 py-8">

        <header className="mb-8">
          <p className="text-sm font-medium text-[#026C7A]">
            Edufio
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#004153]">
            Penjadwalan Sesi Les
          </h1>
        </header>

        <StepIndicator currentStep={currentStep} />

        {renderCurrentStep()}

      </div>
    </main>
  )
}

export default App