import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const Home = () => {
    const { handleGetSong } = useSong();

    const handleExpression = (expression) => {
        const mood = expression.split(' ')[0].toLowerCase();
        if (['happy', 'sad', 'surprised'].includes(mood)) {
            handleGetSong({ mood });
        }
    };

    return (
        <>
            <FaceExpression onClick={handleExpression} />
            <Player />
        </>
    );
};

export default Home