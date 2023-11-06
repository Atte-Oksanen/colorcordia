import { getTextColor } from "../../utils/colorConverters"
import VisualiserDashboardBilling from "./VisualiserDashboardBilling"
import VisualiserDashboardTraffic from "./VisualiserDashboardTraffic"

/* eslint-disable react/prop-types */
const VisualiserDashboard = ({ colors }) => {

  if (colors.length < 1) {
    return null
  }
  return (
    <div className="bg-gray-200 pb-4 h-fit">
      <div className="px-4 py-2"
        style={{ background: colors[3] }}>
        <svg className="align-top rounded-full p-[1px] bg-black inline-block" width="60" height="60" viewBox="0 0 305 305" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_39_262)">
            <path d="M303 152C303 234.843 235.843 302 153 302C70.1573 302 3 234.843 3 152C3 69.1573 70.1573 2 153 2C235.843 2 303 69.1573 303 152Z" fill={colors[4]} />
            <mask id="mask0_39_262" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-5" y="-159" width="159" height="629">
              <path d="M153.709 152.429L8.95943 469.542L-4.47274 -158.203L153.709 152.429Z" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_39_262)">
              <path d="M303 152C303 234.843 235.843 302 153 302C70.1573 302 3 234.843 3 152C3 69.1573 70.1573 2 153 2C235.843 2 303 69.1573 303 152Z" fill={colors[1]} />
            </g>
            <mask id="mask1_39_262" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-32" y="-4" width="370" height="157">
              <path d="M153 153L337.463 -3.75H-31.4634L153 153Z" fill="#FF0000" />
            </mask>
            <g mask="url(#mask1_39_262)">
              <path d="M303 152C303 234.843 235.843 302 153 302C70.1573 302 3 234.843 3 152C3 69.1573 70.1573 2 153 2C235.843 2 303 69.1573 303 152Z" fill={colors[2]} />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_39_262">
              <rect width="305" height="305" fill="white" />
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