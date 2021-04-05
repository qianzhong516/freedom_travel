import React from 'react'
import { SvgXml } from 'react-native-svg'

import SVGXML from '../utils/SvgXml'

const SvgIcon = ({name, size=25 }) => {
    
    const xml = SVGXML[name](size)

    return (
        <SvgXml xml={xml} />
    )
}

export default SvgIcon