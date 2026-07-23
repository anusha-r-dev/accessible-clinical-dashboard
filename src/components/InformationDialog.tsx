import { useEffect, useRef } from 'react'
import type { InformationDialogType } from '../types/clinical'

type InformationDialogProps = {
  type: InformationDialogType
  onClose: () => void
}

export function InformationDialog({
  type,
  onClose,
}: InformationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="information-dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close()
        }
      }}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <span className="dialog-icon" aria-hidden="true">
            {type === 'profile' ? 'AM' : 'i'}
          </span>
          <div>
            <p className="eyebrow">
              {type === 'profile' ? 'Synthetic profile' : 'Data transparency'}
            </p>
            <h2 id="dialog-title">
              {type === 'profile'
                ? 'Avery Morgan'
                : 'What does synthetic data mean?'}
            </h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            aria-label="Close dialog"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
        </div>

        {type === 'profile' ? (
          <ProfileInformation />
        ) : (
          <DataInformation />
        )}

        <button
          className="dialog-done"
          type="button"
          onClick={() => dialogRef.current?.close()}
        >
          Got it
        </button>
      </div>
    </dialog>
  )
}

function ProfileInformation() {
  return (
    <>
      <p className="dialog-introduction">
        Avery Morgan is a fictional identity created only to demonstrate the
        dashboard experience.
      </p>
      <dl className="profile-details">
        <div>
          <dt>Profile ID</dt>
          <dd>S-1042</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>46 years</dd>
        </div>
        <div>
          <dt>Collection date</dt>
          <dd>23 July 2026</dd>
        </div>
        <div>
          <dt>Panels</dt>
          <dd>CBC, BMP, HbA1c</dd>
        </div>
      </dl>
    </>
  )
}

function DataInformation() {
  return (
    <>
      <p className="dialog-introduction">
        Synthetic data is invented information that resembles realistic data
        without representing an actual person.
      </p>
      <ul className="data-principles">
        <li>
          <strong>No real patient information</strong>
          <span>
            Names, identifiers, dates, and results are entirely fictional.
          </span>
        </li>
        <li>
          <strong>No employer or proprietary data</strong>
          <span>
            The project uses original code and independently created examples.
          </span>
        </li>
        <li>
          <strong>Educational use only</strong>
          <span>
            Results demonstrate interface behavior and are not medical
            guidance.
          </span>
        </li>
      </ul>
    </>
  )
}
