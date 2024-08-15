import CustomTooltip from "./customTooltip";
import { colors } from "../colors/colors";


export default {
    title:"Tooltip",
    component: CustomTooltip,
    parameters: {
        layout: 'centered',
      },
};

const Template = (args) => (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <CustomTooltip {...args}>
        <span style={{ cursor: 'pointer', padding: '10px', backgroundColor: colors.RoyalBlue, color: colors.White, borderRadius: '4px'}}>
          Hover over me
        </span>
      </CustomTooltip>
    </div>
  );


export const Default = Template.bind({});
Default.args = {
title: 'This is a custom tooltip',
};