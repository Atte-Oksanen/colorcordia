/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { getTextColor } from "../../utils/colorConverters"
import VisualiserCanvas from "./VisualiserCanvas"

const VisualiserBlog = ({ colors }) => {
  if (colors.length < 1) {
    return null
  }
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute overflow-hidden">
        {colors.length > 1 && <VisualiserCanvas colors={colors}></VisualiserCanvas>}
      </div>
      <div className="mx-auto my-3 drop-shadow-md w-10/12">
        <div className="bg-white px-2 py-4 rounded-md m-5">
          <h2 className=" text-xl inline-block mr-3 font-normal">
            Create Meaning With Color
          </h2>
          <button className="py-1 px-2 rounded-md border-2 border-black" style={{ color: getTextColor(colors[0]), background: colors[0] }}>
            <b>
              Share
            </b>
          </button>
          <br />
          <h4 className="inline-block mr-3 text-base">
            Written by ChatGPT, an AI language model created by OpenAI.
          </h4>
          <button className="px-2 py-1 rounded-md border-2 border-black"
            style={{ borderColor: colors[0] }}>
            <b>
              Follow
            </b>
          </button>
          <br />
          <a className="link-text" href="https://openai.com" target="_blank" rel="noreferrer">openai.com</a>
        </div>
        <p className="bg-white p-4 rounded-md m-5">
          Color is a language in UI design. It can express emotions, set the mood, and lead users through a digital experience.
          To create meaning with color, one must comprehend the psychology of color and its impact on user interaction.
          <br />
          <br />
          Colors have diverse cultural associations, but some universal emotions are tied to certain colors.
          For instance, red often conveys passion and urgency, blue signifies trust and professionalism,
          green evokes nature and tranquility, and yellow represents happiness and attention.
          <br />
          <br />
        </p >
        <div className="bg-white rounded-md px-2 py-4 m-5">
          <h2 className="text-xl border-l-2 p-4"
            style={{ borderColor: colors[4] }}>
            <i>
              Consistency is key
            </i>
          </h2>
        </div>
        <p className="bg-white p-4 rounded-md m-5">
          Consistency is key in color usage, especially when it comes to branding. A well-defined color palette that aligns with the brand identity helps users remember and trust a product. Consistent color choices create familiarity and credibility, reinforcing the brand's personality and values.
          <br />
          <br />
          Creating meaning with color often involves testing and iteration. User testing provides valuable feedback on how users perceive and interact with color choices. A/B testing can help identify which color variations are more effective. It's important to stay updated with design trends and user preferences, as the meaning of colors can evolve over time.
        </p>
        <p className="bg-white p-4 rounded-md m-5">
          Inclusivity and accessibility are essential in UI design.
          Colors should not exclude anyone, including those with visual impairments.
          It's vital to ensure sufficient contrast between text and background colors, following accessibility guidelines.
          Additionally, alternative text descriptions for images and icons are essential for users who rely on screen readers.
          Designers must also be aware of color blindness and create interfaces that are distinguishable for users with different forms of color vision deficiencies.
        </p>
        <p className="bg-white p-4 rounded-md m-5">
          Creating meaning with color often involves testing and iteration.
          User testing provides valuable feedback on how users perceive and interact with color choices.
          A/B testing can help identify which color variations are more effective.
          It's important to stay updated with design trends and user preferences, as the meaning of colors can evolve over time.
        </p>
      </div>
    </div >
  )
}

export default VisualiserBlog