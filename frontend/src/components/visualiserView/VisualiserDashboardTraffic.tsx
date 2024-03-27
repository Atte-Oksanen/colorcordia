const VisualiserDashboardTraffic = ({ colors }: { colors: string[] }) => {
  return (
    <div className="bg-white border border-black rounded-md">
      <h3 className="p-2 text-lg">
        Traffic
      </h3>
      <div className="grid grid-cols-2 p-2">
        <div className="grid m-4 pl-1 grid-cols-[2em_10fr] grid-rows-1">
          <div className="grid grid-rows-6 grid-cols-1">
            <div>130</div>
            <div>120</div>
            <div>110</div>
            <div>100</div>
            <div>90</div>
            <div>80</div>
          </div>
          <div className="grid grid-cols-12 grid-rows-6 border-l border-b border-r border-black px-1">
            <div style={{ gridArea: '2/1/7/2', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '1/2/7/3', background: colors[3] }}>
            </div>
            <div style={{ gridArea: '4/4/7/3', background: colors[1] }}>
            </div>
            <div style={{ gridArea: '1/5/7/4', background: colors[0] }}>
            </div>
            <div style={{ gridArea: '3/6/7/5', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '2/7/7/6', background: colors[3] }}>
            </div>
            <div style={{ gridArea: '3/8/7/7', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '4/9/7/8', background: colors[1] }}>
            </div>
            <div style={{ gridArea: '2/10/7/9', background: colors[3] }}>
            </div>
            <div style={{ gridArea: '1/11/7/10', background: colors[0] }}>
            </div>
            <div style={{ gridArea: '3/12/7/11', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '2/13/7/12', background: colors[3], }}>
            </div>
          </div>
        </div>
        <div className="grid m-4 pl-1 grid-cols-[2em_10fr] grid-rows-1 ">
          <div className="grid grid-rows-6 grid-cols-1">
            <div>60%</div>
            <div>55%</div>
            <div>50%</div>
            <div>45%</div>
            <div>40%</div>
            <div>35%</div>
          </div>
          <div className="grid grid-cols-12 grid-rows-6 border-l border-b border-r border-black px-1">
            <div style={{ gridArea: '1/1/7/2', background: colors[0] }}>
            </div>
            <div style={{ gridArea: '3/2/7/3', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '2/4/7/3', background: colors[1] }}>
            </div>
            <div style={{ gridArea: '3/5/7/4', background: colors[0] }}>
            </div>
            <div style={{ gridArea: '5/6/7/5', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '4/7/7/6', background: colors[3] }}>
            </div>
            <div style={{ gridArea: '2/8/7/7', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '1/9/7/8', background: colors[0] }}>
            </div>
            <div style={{ gridArea: '4/10/7/9', background: colors[3] }}>
            </div>
            <div style={{ gridArea: '3/11/7/10', background: colors[1] }}>
            </div>
            <div style={{ gridArea: '2/12/7/11', background: colors[2] }}>
            </div>
            <div style={{ gridArea: '5/13/7/12', background: colors[3], }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualiserDashboardTraffic