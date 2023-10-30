/* eslint-disable react/prop-types */
const VisualiserDashboardTraffic = ({ colors }) => {
  return (
    <div style={{ background: 'white', width: '35rem', border: '1px solid black', borderRadius: '3px' }}>
      <h3 style={{ padding: '0 0.5rem' }}>
        Traffic
      </h3>
      <div style={{ display: 'grid', padding: '1rem', gridTemplateColumns: 'repeat(13, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', height: '10rem', gridColumnGap: '12px' }}>
        <div style={{ gridArea: '3/2/7/3', background: colors[2] }}>
        </div>
        <div style={{ gridArea: '2/3/7/4', background: colors[3] }}>
        </div>
        <div style={{ gridArea: '4/4/7/5', background: colors[1] }}>
        </div>
        <div style={{ gridArea: '1/5/7/6', background: colors[0] }}>
        </div>
        <div style={{ gridArea: '3/6/7/7', background: colors[2] }}>
        </div>
        <div style={{ gridArea: '2/7/7/8', background: colors[3] }}>
        </div>
        <div style={{ gridArea: '3/8/7/9', background: colors[2] }}>
        </div>
        <div style={{ gridArea: '4/9/7/10', background: colors[1] }}>
        </div>
        <div style={{ gridArea: '2/10/7/11', background: colors[3] }}>
        </div>
        <div style={{ gridArea: '1/11/7/12', background: colors[0] }}>
        </div>
        <div style={{ gridArea: '3/12/7/13', background: colors[2] }}>
        </div>
        <div style={{ gridArea: '2/13/7/14', background: colors[3], }}>
        </div>
        <div style={{ gridArea: '1/1/2/2', fontSize: '0.8rem' }}>
          130
        </div>
        <div style={{ gridArea: '2/1/3/2', fontSize: '0.8rem' }}>
          120
        </div>
        <div style={{ gridArea: '3/1/4/2', fontSize: '0.8rem' }}>
          110
        </div>
        <div style={{ gridArea: '4/1/5/2', fontSize: '0.8rem' }}>
          100
        </div>
        <div style={{ gridArea: '5/1/6/2', fontSize: '0.8rem' }}>
          90
        </div>
        <div style={{ gridArea: '6/1/7/2', fontSize: '0.8rem' }}>
          80
        </div>
      </div>
    </div>
  )
}

export default VisualiserDashboardTraffic