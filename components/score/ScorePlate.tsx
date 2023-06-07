import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

// React useContext
// import { ScoreContext } from '../../store/score-context';

const ScorePlate: React.FC<{ score: number }> = ({ score }) => {

    // const scoreCtx = useContext(ScoreContext);
    const [_score, set_score] = useState<number>(0);

    useEffect(() => {
        set_score(score);
    }, [score]);

    return (
        <View style={styles.container}>
            {/* <Text>{`${scoreCtx.Score}`}</Text> */}
            <Text
                style={{
                    fontSize: 30,
                    color: 'white'
                }}
            >{`分數: ${_score}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
        // width: '100%',
        // height: '100%',
    }
});

export default ScorePlate;
