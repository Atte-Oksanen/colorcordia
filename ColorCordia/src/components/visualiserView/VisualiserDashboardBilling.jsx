/* eslint-disable react/prop-types */
import { getTextColor } from "../../utils/colorConverters"

const VisualiserDashboardBilling = ({ colors }) => {
  return (
    <div className="border border-black rounded-md bg-white h-fit">
      <h3 className="p-2 text-lg">
        Billing
      </h3>
      <div className="grid grid-cols-4 grid-rows-1">
        <ul className="px-2">
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[3]), background: colors[3] }}>
            Novo Grove
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[2] }}>
            Lumina Forge
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[1]), background: colors[1] }}>
            Ember Loom
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[0]), background: colors[0] }}>
            ColorCordia
          </li>
        </ul>
        <ul className="px-2">
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[2] }}>
            LumiGlo
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[3]), background: colors[3] }}>
            ByteWave
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[0]), background: colors[0] }}>
            Voltexa
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[3]), background: colors[3] }}>
            QuantaCore
          </li>
        </ul>
        <ul className="px-2">
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[1]), background: colors[0] }}>
            CodeCraft
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[2] }}>
            DataSphere
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[0]), background: colors[0] }}>
            CodePeak
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[3] }}>
            InfraLock
          </li>
        </ul>
        <ul className="px-2">
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[2] }}>
            TechVista
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[1]), background: colors[1] }}>
            Cybervault
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[2]), background: colors[2] }}>
            Infinitech
          </li>
          <li className="p-4 border border-black m-2 rounded-md" style={{ color: getTextColor(colors[0]), background: colors[0] }}>
            ByteSpace
          </li>
        </ul>
      </div>
    </div>
  )
}

export default VisualiserDashboardBilling