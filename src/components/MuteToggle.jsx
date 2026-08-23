export default function MuteToggle({ muted, toggleMute }) {
  return (
    <button
      type="button"
      className="font-pixel mute-toggle"
      onClick={toggleMute}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
