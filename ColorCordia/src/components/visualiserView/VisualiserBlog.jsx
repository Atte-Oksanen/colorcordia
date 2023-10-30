/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { getTextColor } from "../../utils/colorConverters"
import VisualiserCanvas from "./VisualiserCanvas"

const VisualiserBlog = ({ colors }) => {
  if (colors.length < 1) {
    return null
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: '1fr', gridTemplateRows: '1fr', height: '51rem' }}>
      <div style={{ gridArea: '1/1/2/2', width: '100%', overflow: 'hidden' }}>
        {colors.length > 1 && <VisualiserCanvas colors={colors}></VisualiserCanvas>}
      </div>
      <div style={{ margin: '3rem', filter: 'drop-shadow(0 0 0.2rem black)', gridArea: '1/1/2/2', width: '85%' }}>
        <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '3px' }}>
          <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>
            Create Meaning With Color
          </h2>
          <button style={{ color: getTextColor(colors[0]), background: colors[0], padding: '0.3rem', borderRadius: '3px', border: `2px solid black` }}>
            <b>
              Share
            </b>
          </button>
          <br />
          <h4 style={{ display: 'inline-block', marginRight: '1rem' }}>
            Written by John Doe
          </h4>
          <button style={{ color: getTextColor(colors[0]), background: colors[0], padding: '0.3rem', borderRadius: '3px', border: `2px solid black` }}>
            <b>
              Follow
            </b>
          </button>
        </div>
        <p style={{ background: 'white', padding: '1rem', borderRadius: '3px' }}>
          Color is a language in UI design. It can express emotions, set the mood, and lead users through a digital experience. To create meaning with color, one must comprehend the psychology of color and its impact on user interaction.
          <br />
          <br />
          Colors have diverse cultural associations, but some universal emotions are tied to certain colors.
          For instance, red often conveys passion and urgency, blue signifies trust and professionalism,
          green evokes nature and tranquility, and yellow represents happiness and attention.

          <br />
          <br />
        </p >
        <div style={{ background: 'white', borderRadius: '3px', padding: '0.5rem 1rem' }}>
          <h2 style={{ borderLeft: `2px solid ${colors[4]}`, padding: '1rem', fontWeight: 'normal' }}>
            <i>
              Consistency is key
            </i>
          </h2>
        </div>
        <p style={{ background: 'white', padding: '1rem', borderRadius: '3px' }}>
          Consistency is key in color usage, especially when it comes to branding. A well-defined color palette that aligns with the brand identity helps users remember and trust a product. Consistent color choices create familiarity and credibility, reinforcing the brand's personality and values.
          <br />
          <br />
          Creating meaning with color often involves testing and iteration. User testing provides valuable feedback on how users perceive and interact with color choices. A/B testing can help identify which color variations are more effective. It's important to stay updated with design trends and user preferences, as the meaning of colors can evolve over time.
        </p>
      </div>
    </div>
  )
}

export default VisualiserBlog