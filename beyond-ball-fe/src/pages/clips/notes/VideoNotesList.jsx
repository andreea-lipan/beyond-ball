import VideoNoteItem from "./VideoNoteItem.jsx";

const VideoNotesList = ({videoNotes}) => {

    return(
        videoNotes?.length > 0 ?
        videoNotes.map((note, index) => (
            <VideoNoteItem key={index} note={note} />
        )) :
        <>

        </>
    )
}

export default VideoNotesList;