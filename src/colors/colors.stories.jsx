import { colors } from "./colors";

export default {
    title: 'Design System/Colors',
  };
  
  const ColorSwatch = ({ colorName, colorValue }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '8px',
      width: '120px',
    }}>
      <div style={{
        width: '30px',
        height: '30px',
        backgroundColor: colorValue,
        marginRight: '12px',
        borderRadius: '4px',
      }} />
      <div style={{
        fontFamily:'Open Sans',
        fontSize:'12px'
      }}>
        <strong>{colorName}</strong>
        <div>{colorValue}</div>
      </div>
    </div>
  );
  
  export const AllColors = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {Object.entries(colors).map(([colorName, hexValue]) => (
        <ColorSwatch
          key={colorName}
          colorName={colorName}
          colorValue={hexValue}
        />
      ))}
    </div>
  );

