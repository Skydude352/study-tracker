import type { ChangeEvent } from 'react'
import type { PomodoroSettings as PomodoroSettingsType } from './pomodoroTypes'

type PomodoroSettingsProps = {
  settings: PomodoroSettingsType
  disabled: boolean
  onChange: (settings: PomodoroSettingsType) => void
}

function PomodoroSettings({
  settings,
  disabled,
  onChange,
}: PomodoroSettingsProps) {
  const updateSetting =
    (field: keyof PomodoroSettingsType) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...settings, [field]: Number(event.target.value) })
    }

  const fields: Array<{
    key: keyof PomodoroSettingsType
    label: string
    suffix: string
  }> = [
    { key: 'focusMinutes', label: 'Focus', suffix: 'minutes' },
    { key: 'shortBreakMinutes', label: 'Short break', suffix: 'minutes' },
    { key: 'longBreakMinutes', label: 'Long break', suffix: 'minutes' },
    {
      key: 'cyclesBeforeLongBreak',
      label: 'Long break after',
      suffix: 'cycles',
    },
  ]

  return (
    <fieldset className="pomodoro-settings" disabled={disabled}>
      <legend>Timer settings</legend>
      <div className="pomodoro-settings-grid">
        {fields.map((field) => (
          <label key={field.key}>
            <span>{field.label}</span>
            <span className="pomodoro-setting-input">
              <input
                type="number"
                min="1"
                step="1"
                value={settings[field.key]}
                onChange={updateSetting(field.key)}
              />
              {field.suffix}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default PomodoroSettings
