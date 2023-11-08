import { getTextColor } from "../../utils/colorConverters"
import VisualiserDashboardBilling from "./VisualiserDashboardBilling"
import VisualiserDashboardTraffic from "./VisualiserDashboardTraffic"

/* eslint-disable react/prop-types */
const VisualiserDashboard = ({ colors }) => {

  if (colors.length < 1) {
    return null
  }
  return (
    <div className="bg-white pb-4 rounded-lg overflow-hidden">
      <div className="px-4 py-2"
        style={{ background: colors[3] }}>
        <svg className="inline-block align-top" width="60" height="60" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_57_263)">
            <rect x="178" width="33" height="300" fill={colors[1]} />
            <rect x="222" y="93" width="34" height="207" fill={colors[2]} />
            <rect x="267" y="53" width="33" height="247" fill={colors[4]} />
            <rect x="44" y="131" width="34" height="169" fill={colors[0]} />
            <rect x="89" y="178" width="33" height="122" fill={colors[1]} />
            <rect x="133" y="131" width="34" height="169" fill={colors[0]} />
            <rect y="42" width="33" height="258" fill={colors[4]} />
          </g>
          <defs>
            <clipPath id="clip0_57_263">
              <rect width="300" height="300" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h2 className="inline-block p-4 text-2xl font-normal"
          style={{ color: getTextColor(colors[4]) }}>
          InfoVista
        </h2>
      </div>
      <div className="w-11/12 mx-auto my-4">
        <VisualiserDashboardTraffic colors={colors}></VisualiserDashboardTraffic>
      </div >
      <div className="w-11/12 mx-auto">
        <VisualiserDashboardBilling colors={colors}></VisualiserDashboardBilling>
      </div>
    </div>
  )
}

export default VisualiserDashboard