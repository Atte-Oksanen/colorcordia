import { getTextColor } from "../utils/colorConverters"

/* eslint-disable react/prop-types */
const VisualiserCalendar = ({ colors }) => {


  if (colors.length < 1) {
    return null
  }
  return (
    <div style={{ background: '#e6e6e6', height: '49rem', padding: '1rem' }}>
      <h2 style={{ padding: '0 1rem' }}>MyCalendar</h2>
      <div style={{ display: 'grid', height: '85%', gridTemplateColumns: '1fr', gridTemplateRows: '2fr repeat(11, 1fr)', padding: '1rem', gridRowGap: '0.5rem' }}>
        <div style={{ color: getTextColor(colors[0]), gridArea: '1/1/2/2', background: colors[0], borderRadius: '3px', padding: '0.5rem' }}>
          <b>8.00 | Standup</b>
          <br />
          Note about faulty pipeline
          <br />
          Update on progress towards new requirement framework
        </div>
        <div style={{ gridArea: '2/1/3/2', borderRadius: '3px', padding: '0.5rem', background: 'white' }}>
          <b>9.00</b>
        </div>
        <div style={{ color: getTextColor(colors[1]), gridArea: '3/1/4/2', borderRadius: '3px', padding: '0.5rem', background: colors[1] }}>
          <b>10.00 | Discuss new certs with Jess</b>
        </div>
        <div style={{ color: getTextColor(colors[2]), gridArea: '4/1/5/2', borderRadius: '3px', padding: '0.5rem', background: colors[2] }}>
          <b>11.00 | Team lunch</b>
        </div>
        <div style={{ gridArea: '5/1/6/2', borderRadius: '3px', padding: '0.5rem', background: 'white' }}>
          <b>12.00</b>
        </div>
        <div style={{ color: getTextColor(colors[3]), gridArea: '6/1/7/2', borderRadius: '3px', padding: '0.5rem', background: colors[3] }}>
          <b>13.00 | Call the vet</b>
        </div>
        <div style={{ color: getTextColor(colors[0]), gridArea: '7/1/8/2', borderRadius: '3px', padding: '0.5rem', background: colors[0] }}>
          <b>14.00 | Unveiling new marketing concepts (Execs present!!)</b>
        </div>
        <div style={{ color: getTextColor(colors[2]), gridArea: '8/1/9/2', borderRadius: '3px', padding: '0.5rem', background: colors[2] }}>
          <b>15.00 | Check up on new hires</b>
        </div>
        <div style={{ color: getTextColor(colors[1]), gridArea: '9/1/10/2', borderRadius: '3px', padding: '0.5rem', background: colors[1] }}>
          <b>16.00 | Prepare the next standup</b>
        </div>
        <div style={{ color: getTextColor(colors[3]), gridArea: '10/1/11/2', borderRadius: '3px', padding: '0.5rem', background: colors[3] }}>
          <b>17.00 | Pick up kids</b>
        </div>
        <div style={{ gridArea: '11/1/12/2', borderRadius: '3px', padding: '0.5rem', background: 'white' }}>
          <b>18.00</b>
        </div>
        <div style={{ gridArea: '12/1/13/2', borderRadius: '3px', padding: '0.5rem', background: 'white' }}>
          <b>19.00</b>
        </div>
      </div>
    </div>
  )
}

export default VisualiserCalendar