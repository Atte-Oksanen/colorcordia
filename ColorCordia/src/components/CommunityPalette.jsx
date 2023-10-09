const CommunityPalette = ({ palette }) => {
    const [type, ...colorHarmony] = palette.palette.split('-')
    const colors = colorHarmony.map(color => `#${color}`)

    return (
        <div>
            <h3>{type} from {colorHarmony[2]}</h3>
            {colors.map(color => <div key={Math.random()} style={{ background: color }}>{color}</div>)}
            <div>Created by {palette.user}</div>
            <div>Likes {palette.likes}</div>
        </div>

    )
}

export default CommunityPalette