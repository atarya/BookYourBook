import React from 'react'
import { Image, Text } from '@chakra-ui/react'

const HomePage = () => {
    return (
        <div className="homeTemp">
            <Text fontSize='4xl'>Home</Text>
            <Image
                borderRadius='full'
                boxSize='150px'
                src='https://res.cloudinary.com/nupmry/image/upload/v1648367492/bookyourbook/defaults/Screenshot_2022-03-04_at_5.04.26_AM_ntgdwm.png'
                alt='BookYourBook'
            />
        </div>
    )
}

export default HomePage