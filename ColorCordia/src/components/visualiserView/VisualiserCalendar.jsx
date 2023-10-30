import { getTextColor } from "../../utils/colorConverters"

/* eslint-disable react/prop-types */
const VisualiserCalendar = ({ colors }) => {
  const calendarElementStyle = {
    borderRadius: '3px',
    padding: '0.5rem',
    border: '1px solid black'
  }
  if (colors.length < 1) {
    return null
  }
  return (
    <div style={{ background: '#e6e6e6', height: '49rem', padding: '1rem' }}>
      <h2 style={{ padding: '0 1rem' }}>MyCalendar</h2>
      <div style={{ display: 'grid', height: '85%', gridTemplateColumns: '1fr', gridTemplateRows: '2fr repeat(11, 1fr)', padding: '1rem', gridRowGap: '0.5rem' }}>
        <div style={{ color: getTextColor(colors[4]), gridArea: '1/1/2/2', background: colors[4], ...calendarElementStyle }}>
          8.00 | Standup
          <br />
          Note about faulty pipeline
          <br />
          Update on progress towards new requirement framework
        </div>
        <div style={{ color: getTextColor(colors[0]), gridArea: '2/1/3/2', background: colors[0], ...calendarElementStyle }}>
          9.00 | Update Voltexa on project timeline
        </div>
        <div style={{ color: getTextColor(colors[1]), gridArea: '3/1/4/2', background: colors[1], ...calendarElementStyle }}>
          10.00 | Discuss new certs with Jess
        </div>
        <div style={{ color: getTextColor(colors[2]), gridArea: '4/1/5/2', background: colors[2], ...calendarElementStyle }}>
          11.00 | Team lunch
        </div>
        <div style={{ gridArea: '5/1/6/2', background: 'white', ...calendarElementStyle }}>
          12.00
        </div>
        <div style={{ color: getTextColor(colors[3]), gridArea: '6/1/7/2', background: colors[3], ...calendarElementStyle }}>
          13.00 | Call the vet
        </div>
        <div style={{ color: getTextColor(colors[4]), gridArea: '7/1/8/2', background: colors[4], ...calendarElementStyle }}>
          14.00 | Unveiling new marketing concepts (Execs present!!)
        </div>
        <div style={{ color: getTextColor(colors[2]), gridArea: '8/1/9/2', background: colors[2], ...calendarElementStyle }}>
          15.00 | Check up on new hires
        </div>
        <div style={{ color: getTextColor(colors[1]), gridArea: '9/1/10/2', background: colors[1], ...calendarElementStyle }}>
          16.00 | Prepare the next standup
        </div>
        <div style={{ color: getTextColor(colors[3]), gridArea: '10/1/11/2', background: colors[3], ...calendarElementStyle }}>
          17.00 | Pick up kids
        </div>
        <div style={{ gridArea: '11/1/12/2', background: 'white', ...calendarElementStyle }}>
          18.00
        </div>
        <div style={{ gridArea: '12/1/13/2', background: 'white', ...calendarElementStyle }}>
          19.00
        </div>
      </div>
    </div>
  )
}

export default VisualiserCalendar