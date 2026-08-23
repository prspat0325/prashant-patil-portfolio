export default function ConsoleDpad({ onUp, onDown, onSelect }) {
  return (
    <div className="console-dpad" aria-label="Menu navigation">
      <div className="dpad-cross">
        <button type="button" className="dpad-btn dpad-up" aria-label="Move up" onClick={onUp}>▲</button>
        <button type="button" className="dpad-btn dpad-down" aria-label="Move down" onClick={onDown}>▼</button>
      </div>
      <button type="button" className="dpad-a" aria-label="Select" onClick={onSelect}>A</button>
    </div>
  )
}
