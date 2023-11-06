import { getTextColor } from "../../utils/colorConverters"

/* eslint-disable react/prop-types */
const VisualiserCalendar = ({ colors }) => {

  if (colors.length < 1) {
    return null
  }
  return (
    <div className="bg-gray-200 p-4 h-full">
      <h2 className="text-xl font-normal px-4">MyCalendar</h2>
      <div className="grid grid-cols-3">
        <div className="grid grid-cols-1 grid-rows-12 p-4 gap-y-2">
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[4]), background: colors[4] }}>
            8.00 | Standup
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[0]), background: colors[0], }}>
            9.00 | Update Voltexa on project timeline
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            10.00 | Discuss new certs with Jess
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[2]), background: colors[2], }}>
            11.00 | Team lunch
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            12.00
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[3]), background: colors[3], }}>
            13.00 | Call the vet
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[4]), background: colors[4], }}>
            14.00 | Unveiling new marketing concepts (Execs present!!)
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[2]), background: colors[2], }}>
            15.00 | Check up on new hires
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            16.00 | Prepare the next standup
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[3]), background: colors[3], }}>
            17.00 | Pick up kids
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            18.00
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            19.00
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-12 p-4 gap-y-2">
          <div className="rounded-md p-2 border border-black bg-white"
            style={{ color: getTextColor(colors[4]), background: colors[4] }}>
            8.00 | Standup
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            9.00 | Debugging session with the development team
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            10.00
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[4]), background: colors[4], }}>
            11.00 | Lunch with head of department
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[2]), background: colors[2], }}>
            12.00 | Security meeting with the IT department
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            13.00
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[0]), background: colors[0], }}>
            14.00 | Consultation call with software vendor
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            15.00 | Video conference for Agile methodology training
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[2]), background: colors[2], }}>
            16.00 | Code review and documentation update
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            17.00 | Prepare the next standup
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            18.00
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            19.00
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-12 p-4 gap-y-2">
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[4]), background: colors[4] }}>
            8.00 | Standup
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            9.00
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            10.00 | Review system backups and recovery procedures
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            11.00
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[2]), background: colors[2], }}>
            12.00 | Team lunch
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[3]), background: colors[3], }}>
            13.00 | Meeting with insurance agent
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[0]), background: colors[0], }}>
            14.00 | Meeting with cloud service provider
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[4]), background: colors[4], }}>
            15.00 | Demonstration of new IT tools (Management presentation)
          </div>
          <div className="rounded-md p-2 border border-black"
            style={{ color: getTextColor(colors[1]), background: colors[1], }}>
            16.00 | Test patch deployment in staging environment
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            17.00
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            18.00
          </div>
          <div className="rounded-md p-2 border border-black bg-white">
            19.00
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualiserCalendar