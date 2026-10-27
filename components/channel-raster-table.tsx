import { CHANNEL_RASTERS, type ArfcnRange, type ChannelRaster } from "nr-arfcn"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function Range({ range }: { range?: ArfcnRange }) {
  if (!range) {
    return (
      <span className="text-muted-foreground">
        —<span className="sr-only">not used</span>
      </span>
    )
  }

  const [first, step, last] = range
  return (
    <>
      {first} <span className="text-muted-foreground">– &lt;{step}&gt; –</span> {last}
    </>
  )
}

function RasterTable({ rasters }: { rasters: readonly ChannelRaster[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">
            Band
          </TableHead>
          <TableHead>
            ΔF<sub>Raster</sub> <span className="font-normal text-muted-foreground">(kHz)</span>
          </TableHead>
          <TableHead>
            Uplink <span className="font-normal text-muted-foreground">(First – &lt;Step&gt; – Last)</span>
          </TableHead>
          <TableHead className="pr-0">
            Downlink <span className="font-normal text-muted-foreground">(First – &lt;Step&gt; – Last)</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rasters.map((raster, index) => (
          <TableRow
            // n263 repeats a channel bandwidth, so the first NR-ARFCN keeps keys unique
            key={`${raster.band}-${raster.rasterKhz ?? raster.channelBandwidthMhz}-${(raster.uplink ?? raster.downlink)?.[0]}`}
          >
            {/* One Band cell per band, as in TS 38.104, spanning all of its rasters */}
            {rasters[index - 1]?.band !== raster.band && (
              <TableCell
                rowSpan={rasters.filter(({ band }) => band === raster.band).length}
                className="pl-0 font-mono font-bold"
              >
                {raster.band}
              </TableCell>
            )}
            <TableCell className="font-mono">
              {raster.rasterKhz ?? (
                <span className="font-sans text-xs text-muted-foreground">
                  {raster.channelBandwidthMhz} MHz BW
                </span>
              )}
            </TableCell>
            <TableCell className="font-mono">
              <Range range={raster.uplink} />
            </TableCell>
            <TableCell className="pr-0 font-mono">
              <Range range={raster.downlink} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Channel rasters of every band from TS 38.104 clause 5.4.2.3, collapsed by default
export function ChannelRasterTable() {
  return (
    <details className="my-8 not-prose group">
      <summary className="py-3 text-sm cursor-pointer select-none text-muted-foreground hover:text-foreground">
        <span className="group-open:hidden">Show</span>
        <span className="hidden group-open:inline">Hide</span> Table 2
      </summary>
      <div className="pt-3">
        <RasterTable rasters={CHANNEL_RASTERS} />
      </div>
    </details>
  )
}
