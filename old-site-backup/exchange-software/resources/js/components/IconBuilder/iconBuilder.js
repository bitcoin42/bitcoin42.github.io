import React from "react";
import {generateIcon} from "utils";
import {isEmpty} from "lodash";
import {Box, SvgIcon} from "@mui/material";

const IconBuilder = ({icon: object, sx, ...otherProps}) => {
    if (isEmpty(object)) {
        return null;
    }

    const IconComponent = generateIcon(object.icon, `svg-${object.name}`, {
        width: "1em",
        height: "1em",
        "aria-hidden": "true",
        "data-icon": object.name,
        fill: "currentColor"
    });

    return (
        <Box
            {...otherProps}
            sx={{
                color: object.color,
                display: "flex",
                alignItems: "center",
                ...sx
            }}>
            <SvgIcon component={() => IconComponent} />
        </Box>
    );
};

export default IconBuilder;
