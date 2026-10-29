// Column edges, so labels, pipes and interfaces line up with the nodes
const UE = { x: 0, width: 70 }
const GNODEB = { x: 240, width: 80 }
const UPF = { x: 500, width: 80 }
const DATA_NETWORK = { x: 650, width: 90 }
const RADIO_PIPE = { x: 78, width: 154 }
const N3_PIPE = { x: 328, width: 164 }
const NODE_TOP = 32
const NODE_HEIGHT = 244

function Node({ x, width, label }: { x: number; width: number; label: string }) {
  return (
    <>
      <rect
        x={x}
        y={NODE_TOP}
        width={width}
        height={NODE_HEIGHT}
        rx={6}
        className="fill-muted stroke-border"
      />
      <text
        x={x + width / 2}
        y={NODE_TOP + 20}
        textAnchor="middle"
        className="fill-foreground font-medium"
      >
        {label}
      </text>
    </>
  )
}

function Span({ x1, x2, label }: { x1: number; x2: number; label: string }) {
  return (
    <>
      <text x={(x1 + x2) / 2} y={12} textAnchor="middle" className="fill-muted-foreground">
        {label}
      </text>
      <path d={`M${x1} 15v8M${x1} 19H${x2}M${x2} 15v8`} className="stroke-muted-foreground/60" />
    </>
  )
}

function Pipe({
  x,
  width,
  y,
  height,
  label,
}: {
  x: number
  width: number
  y: number
  height: number
  label: string
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        className="fill-background stroke-muted-foreground/60"
      />
      <text x={x + width / 2} y={y + 17} textAnchor="middle" className="fill-muted-foreground">
        {label}
      </text>
    </>
  )
}

// A QoS Flow runs from the UE to the UPF; past the UPF, packets travel over N6 in both directions.
function QosFlow({ y, label }: { y: number; label: string }) {
  const left = UE.x + 36
  const right = UPF.x + UPF.width - 18
  return (
    <>
      <rect
        x={left}
        y={y - 10}
        width={right - left}
        height={20}
        rx={4}
        className="fill-background stroke-accent [fill-opacity:0.9]"
      />
      <text x={(left + right) / 2} y={y + 4.5} textAnchor="middle" className="fill-foreground font-medium">
        {label}
      </text>
      <line
        x1={UPF.x + UPF.width + 8}
        y1={y}
        x2={DATA_NETWORK.x - 8}
        y2={y}
        markerStart="url(#qos-model-arrow)"
        markerEnd="url(#qos-model-arrow)"
        className="stroke-muted-foreground"
      />
    </>
  )
}

function Interface({ x, label }: { x: number; label: string }) {
  return (
    <>
      <line
        x1={x}
        y1={NODE_TOP + NODE_HEIGHT + 4}
        x2={x}
        y2={294}
        strokeDasharray="3 3"
        className="stroke-muted-foreground/60"
      />
      <text x={x} y={310} textAnchor="middle" className="fill-muted-foreground">
        {label}
      </text>
    </>
  )
}

export function QosModelDiagram() {
  return (
    <figure className="my-8">
      {/* Scrolls on narrow screens so labels stay readable instead of shrinking */}
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 740 316"
          role="img"
          aria-labelledby="qos-model-title qos-model-desc"
          fontSize={13}
          className="w-full min-w-150"
        >
          <title id="qos-model-title">PDU Session</title>
          <desc id="qos-model-desc">
            A PDU Session between the UE and the UPF carries three QoS Flows. QoS Flows 1 and 2
            share DRB 1 and QoS Flow 3 uses DRB 2 between the UE and the gNodeB. All three
            flows share one N3 GTP-U tunnel, identified by its TEID, between the gNodeB and the
            UPF. The UPF exchanges their packets with the Data Network over N6.
          </desc>
          <defs>
            <marker
              id="qos-model-arrow"
              viewBox="0 0 8 8"
              refX={7}
              refY={4}
              markerWidth={8}
              markerHeight={8}
              orient="auto-start-reverse"
            >
              <path d="M0 0L8 4L0 8z" className="fill-muted-foreground" />
            </marker>
          </defs>

          <Span x1={UE.x} x2={GNODEB.x + GNODEB.width} label="5G Radio Access Network" />
          <Span x1={UPF.x} x2={UPF.x + UPF.width} label="5G Core" />

          <Node {...UE} label="UE" />
          <Node {...GNODEB} label="gNodeB" />
          <Node {...UPF} label="UPF" />
          <Node {...DATA_NETWORK} label="Data Network" />

          <rect
            x={UE.x + 28}
            y={66}
            width={UPF.x + UPF.width - 10 - (UE.x + 28)}
            height={198}
            rx={6}
            className="fill-background/70 stroke-muted-foreground/60"
          />
          <text
            x={GNODEB.x + GNODEB.width / 2}
            y={84}
            textAnchor="middle"
            className="fill-foreground font-medium"
          >
            PDU Session
          </text>

          <Pipe {...RADIO_PIPE} y={96} height={84} label="Data Radio Bearer 1" />
          <Pipe {...RADIO_PIPE} y={192} height={60} label="Data Radio Bearer 2" />
          <Pipe {...N3_PIPE} y={96} height={156} label="GTP-U Tunnel" />

          <QosFlow y={132} label="QoS Flow A (5QI x)" />
          <QosFlow y={162} label="QoS Flow B (5QI y)" />
          <QosFlow y={230} label="QoS Flow C (5QI z)" />

          <Interface x={(UE.x + UE.width + GNODEB.x) / 2} label="Radio" />
          <Interface x={(GNODEB.x + GNODEB.width + UPF.x) / 2} label="N3" />
          <Interface x={(UPF.x + UPF.width + DATA_NETWORK.x) / 2} label="N6" />
        </svg>
      </div>
      <figcaption>
        One PDU Session with three QoS Flows. All three share one N3 tunnel. QoS Flows A and B
        also share a DRB, while QoS Flow C uses its own.
      </figcaption>
    </figure>
  )
}
