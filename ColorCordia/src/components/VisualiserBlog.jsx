/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { getTextColor } from "../utils/colorConverters"
import VisualiserCanvas from "./VisualiserCanvas"

const VisualiserBlog = ({ colors }) => {
  if (colors.length < 1) {
    return null
  }
  return (
    <div style={{ padding: '0.5rem 2rem', background: colors[3] }}>
      <div style={{ padding: '1rem', background: 'white', filter: 'drop-shadow(0 0 0.2rem black)' }}>
        {colors.length > 1 && <VisualiserCanvas colors={colors}></VisualiserCanvas>}
        <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>
          Create Meaning With Color
        </h2>
        <button style={{ color: getTextColor(colors[0]), background: colors[0], padding: '0.3rem', borderRadius: '1rem', border: `1px solid ${getTextColor(colors[0])}` }}>
          Like this post
        </button>
        <br />
        <h3 style={{ display: 'inline-block', marginRight: '1rem' }}>
          Written by John Doe
        </h3>
        <button style={{ color: getTextColor(colors[0]), background: colors[0], padding: '0.3rem', borderRadius: '1rem', border: `1px solid ${getTextColor(colors[0])}` }}>
          Follow
        </button>
        <p>
          Color is a language in UI design. It can express emotions, set the mood, and lead users through a digital experience. To create meaning with color, one must comprehend the psychology of color and its impact on user interaction.
          <br />
          <br />
          Colors have diverse cultural associations, but some universal emotions are tied to certain colors. For instance, red often conveys passion and urgency, blue signifies trust and professionalism, green evokes nature and tranquility, and yellow represents happiness and attention.
          <br />
          <br />
          In UI design, color plays a crucial role in establishing a visual hierarchy. It guides users and draws their attention to important elements. Primary actions, such as "Sign Up" or "Buy Now" buttons, benefit from bold, contrasting colors, encouraging users to engage. Secondary actions like "Cancel" or "Learn More" buttons can use softer, complementary colors to indicate their lower priority. Red is often reserved for error messages, as it naturally grabs attention and conveys urgency.
          <br />
          <br />
          Consistency is key in color usage, especially when it comes to branding. A well-defined color palette that aligns with the brand identity helps users remember and trust a product. Consistent color choices create familiarity and credibility, reinforcing the brand's personality and values.
          <br />
          <br />
          Inclusivity and accessibility are essential in UI design. Colors should not exclude anyone, including those with visual impairments. It's vital to ensure sufficient contrast between text and background colors, following accessibility guidelines. Additionally, alternative text descriptions for images and icons are essential for users who rely on screen readers. Designers must also be aware of color blindness and create interfaces that are distinguishable for users with different forms of color vision deficiencies.
          <br />
          <br />
          Creating meaning with color often involves testing and iteration. User testing provides valuable feedback on how users perceive and interact with color choices. A/B testing can help identify which color variations are more effective. It's important to stay updated with design trends and user preferences, as the meaning of colors can evolve over time.
          <br />
          <br />
          In summary, color is a powerful tool in UI design, capable of conveying emotions, establishing hierarchy, maintaining branding, ensuring accessibility, and enhancing user experience. By effectively harnessing the language of color, designers can engage users, convey messages, and create meaningful digital experiences.
        </p>
      </div>
    </div>
  )
}

export default VisualiserBlog