import { getTextColor } from "../utils/colorConverters"

/* eslint-disable react/prop-types */
const VisualiserDashboard = ({ colors }) => {
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
  if (colors.length < 1) {
    return null
  }
  return (
    <div style={{ background: '#e6e6e6' }}>
      <h3 style={{ background: colors[4], color: getTextColor(colors[4]) }}>
        InfoVista
      </h3>
      <div>
        <h4>Traffic</h4>
      </div>
      <div style={{ border: '1px solid black', width: '80%', borderRadius: '3px', background: 'white' }}>
        <h3 style={{ padding: '0 0.5rem' }}>
          Billing
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1rf', gridTemplateRows: '1fr' }}>
          <ul style={{ gridArea: '1/1/2/2', listStyleType: 'none', padding: '0 0.5rem', margin: '0' }}>
            <li style={listElementStyle}>
              Novo Grove -
              <span style={{ background: colors[3], ...spanElementStyle }}>
                passed
              </span>
            </li>
            <li style={listElementStyle}>
              Lumina Forge -
              <span style={{ background: colors[2], ...spanElementStyle }}>
                processing
              </span>
            </li>
            <li style={listElementStyle}>
              Ember Loom -
              <span style={{ background: colors[2], ...spanElementStyle }}>
                processing
              </span>
            </li>
            <li style={listElementStyle}>
              ColorCordia -
              <span style={{ background: colors[0], ...spanElementStyle }}>
                Requires review
              </span>
            </li>
          </ul>
          <ul style={{ gridArea: '1/2/2/3', listStyleType: 'none', padding: '0 0.5rem', margin: '0' }}>
            <li style={listElementStyle}>
              LumiGlo -
              <span style={{ background: colors[2], ...spanElementStyle }}>
                processing
              </span>
            </li>
            <li style={listElementStyle}>
              ByteWave -
              <span style={{ background: colors[3], ...spanElementStyle }}>
                passed
              </span>
            </li>
            <li style={listElementStyle}>
              Voltexa -
              <span style={{ background: colors[0], ...spanElementStyle }}>
                Requires review
              </span>
            </li>
            <li style={listElementStyle}>
              QuantaCore -
              <span style={{ background: colors[3], ...spanElementStyle }}>
                passed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h4>Trend</h4>
      </div>
      <div>
        <h4>Support</h4>
      </div>
    </div>
  )
}

export default VisualiserDashboard