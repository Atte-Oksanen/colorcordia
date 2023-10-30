/* eslint-disable react/prop-types */
import { getTextColor } from "../utils/colorConverters"

const VisualiserDashboardBilling = ({ colors }) => {
  const listElementStyle = {
    padding: '1rem 1rem 1rem 0.5rem',
    border: '1px solid black',
    borderRadius: '3px',
    margin: '0.5rem 0'
  }
  const spanElementStyle = {
    padding: '0.5rem',
    marginLeft: '0.2rem',
    borderRadius: '3px'
  }
  return (
    <div style={{ border: '1px solid black', width: '35rem', borderRadius: '3px', background: 'white' }}>
      <h3 style={{ padding: '0 0.5rem' }}>
        Billing
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1rf', gridTemplateRows: '1fr' }}>
        <ul style={{ gridArea: '1/1/2/2', listStyleType: 'none', padding: '0 0.5rem', margin: '0' }}>
          <li style={listElementStyle}>
            Novo Grove -
            <span style={{ color: getTextColor(colors[3]), background: colors[3], ...spanElementStyle }}>
              passed
            </span>
          </li>
          <li style={listElementStyle}>
            Lumina Forge -
            <span style={{ color: getTextColor(colors[2]), background: colors[2], ...spanElementStyle }}>
              processing
            </span>
          </li>
          <li style={listElementStyle}>
            Ember Loom -
            <span style={{ color: getTextColor(colors[2]), background: colors[2], ...spanElementStyle }}>
              processing
            </span>
          </li>
          <li style={listElementStyle}>
            ColorCordia -
            <span style={{ color: getTextColor(colors[0]), background: colors[0], ...spanElementStyle }}>
              Requires review
            </span>
          </li>
        </ul>
        <ul style={{ gridArea: '1/2/2/3', listStyleType: 'none', padding: '0 0.5rem', margin: '0' }}>
          <li style={listElementStyle}>
            LumiGlo -
            <span style={{ color: getTextColor(colors[2]), background: colors[2], ...spanElementStyle }}>
              processing
            </span>
          </li>
          <li style={listElementStyle}>
            ByteWave -
            <span style={{ color: getTextColor(colors[3]), background: colors[3], ...spanElementStyle }}>
              passed
            </span>
          </li>
          <li style={listElementStyle}>
            Voltexa -
            <span style={{ color: getTextColor(colors[0]), background: colors[0], ...spanElementStyle }}>
              Requires review
            </span>
          </li>
          <li style={listElementStyle}>
            QuantaCore -
            <span style={{ color: getTextColor(colors[3]), background: colors[3], ...spanElementStyle }}>
              passed
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default VisualiserDashboardBilling