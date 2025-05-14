import {ClipCard} from "./ClipCard.jsx";

const ClipsList = ({clips}) => {


    return (
        clips.map((clip) => (
            <ClipCard clip={clip}/>
        ))
    );
}

export default ClipsList;